/*
 * @Date: 2022-09-21 09:47:53
 * @LastEditTime: 2023-05-15 14:30:48
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 低代码编辑平台
 */
import "../EditorDingTalk/index.less";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { useMountedRef } from "@/hooks/useMountedRef";
import { useState, useMemo } from "react";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";
import cx from "classnames";
import { currentUIState } from "@/store/useMobileUI.slice";
import { useSelector } from "react-redux";
import { currentEditorConfig } from "@/store/editor.slice";
import { CloseOutlined } from "@ant-design/icons";
import { Form as FormPC, Button as ButtonPC } from "antd";
import { Form as FormMobile, Button as ButtonMobile } from "antd-mobile";
import { components } from "@/EditorWidgets";
import { usePlatform } from "@/hooks/usePlatform";

const Outside = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  flex: 1;
  /* overflow: hidden; */
  .mobile {
    width: 360px;
    max-height: 640px;
    margin: 20px auto;
    border: 1px solid rgba(17, 31, 44, 0.08);
    box-shadow: 0 8px 40px 0 rgba(17, 31, 44, 0.12);
    border-radius: 24px;
    padding: 0 10px;
  }
  .form-content {
    margin-top: 30px;
  }
  .close-preview {
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fafafb;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
  }
`;
export const LowCodeEditor = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("documentTitle.editor"));

  const isMounted = useMountedRef();
  if (!isMounted.current) null;
  const enabled = false;
  const platform = usePlatform();
  const currentUIIsMobile = useSelector(currentUIState);
  const currentState = useSelector(currentEditorConfig);
  const [nodes] = useState<string>(currentState.nodes);
  const formComponentsRender: any = useMemo(() => {
    if(!Object.keys(nodes).length){
      return;
    }
    const formComponents = Object.values(
      JSON.parse(nodes, (key, value) => {
        if (key === "ROOT") return undefined;
        return value;
      })
    );
    return formComponents
      .map((item: any) => {
        const Component = components[item.custom.componentName];
        return (
          Component && (
            <Component
              {...item.props}
              enabled={enabled}
              key={item.props.id}
              platform={platform}
            />
          )
        );
      })
      .filter(item => item);
  }, [nodes, enabled, platform]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Outside>
      <ScrollContainer
        className={cx([
          {
            "editor-render-page": true,
            mobile: currentUIIsMobile,
          },
        ])}
        style={{ padding: "20px" }}
      >
        {platform === "mobile" ? (
          <FormMobile
            className="form-content"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {formComponentsRender}
            <FormMobile.Item key="submitBtn">
              <ButtonMobile type="submit" color="primary" size="large">
                Submit
              </ButtonMobile>
            </FormMobile.Item>
          </FormMobile>
        ) : (
          <FormPC
            className="form-content"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {formComponentsRender}
            <FormPC.Item key="submitBtn">
              <ButtonPC type="primary" htmlType="submit">
                Submit
              </ButtonPC>
            </FormPC.Item>
          </FormPC>
        )}

        <CloseOutlined
          className="close-preview"
          onClick={() => window.history.back()}
        />
        <div id="popup-container"></div>
      </ScrollContainer>
    </Outside>
  );
};

export default LowCodeEditor;
