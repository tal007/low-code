/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-08 14:11:21
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-09-02 14:52:21
 * @Description: 登录页面
 */

import styled from "styled-components";
import { Form, Input, Button, Typography } from "antd";
import { FlexBox } from "@/style";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "@/api/login";
import { useNavigate } from "react-router-dom";
import storage from "@/utils/storage";
import { ACCESS_TOKEN, USER_INFO } from "@/constant";
import { useEffect } from "react";

const { Item } = Form;

const LoginContainer = styled(FlexBox)`
  background-color: #d1e2d1;

  .inner-form {
    width: 400px;
  }
`;

interface Response {
  sub: string;
  clientid: string;
  iss: string;
  active: boolean;
  token_type: string;
  userid: string;
  access_token: string;
  refresh_token: string;
  aud: string[];
  nbf: number;
  scope: string[];
  exp: number;
  expires_in: number;
  iat: number;
  jti: string;
  username: string;
}
export const Login = () => {
  const [form] = Form.useForm<{ username: string; password: string }>();
  const loginClient = useLogin();
  const params = new URLSearchParams();
  const navigate = useNavigate();

  const { refetch, isFetching } = useQuery<Response>(
    ["login"],
    () => loginClient(params),
    {
      enabled: false,
      onSuccess(response) {
        storage.setSession(
          ACCESS_TOKEN,
          `${response.token_type} ${response.access_token}`
        );
        storage.setSession(USER_INFO, response);
        navigate("/");
      },
    }
  );

  const handleLoginClick = async () => {
    params.delete("grant_type");
    params.delete("scope");
    params.delete("username");
    params.delete("password");
    try {
      const values = await form.validateFields();
      params.append("grant_type", "password");
      params.append("scope", "server");
      params.append("username", values.username);
      params.append("password", values.password);
      // refetch();
      if (values.username === "admin" && values.password === "111111") {
        navigate("/");
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    const keydownFn = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        handleLoginClick();
      }
    };

    window.addEventListener("keydown", keydownFn, false);

    return () => {
      window.removeEventListener("keydown", keydownFn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  return (
    <LoginContainer direction={"column"}>
      <Typography.Title level={1}>{t("common.appName")}</Typography.Title>
      <Form
        form={form}
        className="inner-form"
        labelCol={{ span: 4 }}
        layout={"vertical"}
      >
        <Item
          label={t("common.username")}
          name={"username"}
          required
          rules={[
            {
              required: true,
              message: `${t("common.pleaseInput")}${t("common.username")}`,
            },
          ]}
        >
          <Input
            placeholder={t("common.username")}
            allowClear
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Item>
        <Item
          label={t("common.password")}
          name="password"
          required
          rules={[
            {
              required: true,
              message: `${t("common.pleaseInput")}${t("common.password")}`,
            },
          ]}
        >
          <Input.Password
            placeholder={t("common.password")}
            allowClear
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Item>
        <Item>
          <Button
            block
            type={"primary"}
            disabled={isFetching}
            onClick={handleLoginClick}
          >
            {t("common.login")}
          </Button>
        </Item>
      </Form>
    </LoginContainer>
  );
};

export default Login;
