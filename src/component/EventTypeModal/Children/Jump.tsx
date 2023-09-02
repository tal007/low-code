/*
 * @Date: 2022-11-03 10:39:01
 * @LastEditTime: 2023-05-04 10:44:35
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 跳转链接
 */

import { ActionDesc } from "./Common";
import { Button, Form, FormInstance, Input, message, Space } from "antd";
import { useState } from "react";
import update from "immutability-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { urlRegex } from "@/utils/regex";
import { useEffect } from "react";

export interface JumpProperties {
  form: FormInstance;
  defaultFormValue: any;
}

export const Jump = (props: Partial<JumpProperties>) => {
  const { form, defaultFormValue } = props;
  const [params, setParams] = useState<{ key: string; value: string }[]>(
    defaultFormValue?.params || []
  );

  const updateParams = newParams => {
    setParams(newParams);
    form.setFieldValue("params", newParams);
  };

  const handleChange = (key: string, value: string, index: number) => {
    if (params.find(item => item.key.trim() === key)) {
      message.warning("参数名有相同的可能会产生错误");
      return;
    }
    const newParams = update(params, {
      [index]: {
        [key]: {
          $set: value,
        },
      },
    });
    updateParams(newParams);
  };

  const createNewParam = () => {
    if (
      params.find(item => item.key.trim() === "" || item.value.trim() === "")
    ) {
      message.error("请填写完上面的数据再新增");
      return;
    }
    const newParams = update(params, {
      $push: [{ key: "", value: "" }],
    });
    updateParams(newParams);
  };

  const removeItem = (index: number) => {
    const newParams = update(params, {
      $splice: [[index, 1]],
    });

    updateParams(newParams);
  };

  useEffect(() => {
    form.setFieldValue("params", params);
  }, [form, params]);

  useEffect(() => {
    form.setFieldValue("url", defaultFormValue.url);
  }, [defaultFormValue.url, form]);

  const { t } = useTranslation();

  return (
    <ActionDesc desc={t("event.jump")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={defaultFormValue}
      >
        <Form.Item
          label={"跳转链接"}
          name={"url"}
          rules={[
            {
              required: true,
              message: "请输入URL地址",
              pattern: urlRegex,
            },
          ]}
        >
          <Input placeholder={"https://"} style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item label={"页面参数"} name={"params"}>
          <Space direction={"vertical"}>
            {params.map((param, index) => {
              return (
                <Space key={index}>
                  <Input
                    placeholder={"参数名"}
                    value={param.key}
                    onChange={e => handleChange("key", e.target.value, index)}
                  />
                  <Input
                    placeholder={"参数值"}
                    value={param.value}
                    onChange={e => handleChange("value", e.target.value, index)}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={"trash"}
                    onClick={() => removeItem(index)}
                  />
                </Space>
              );
            })}
            <Button onClick={createNewParam}>{t("common.create")}</Button>
          </Space>
        </Form.Item>
      </Form>
    </ActionDesc>
  );
};
