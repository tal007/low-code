/*
 * @Date: 2022-12-26 14:13:14
 * @LastEditTime: 2023-05-04 10:55:18
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 数据请求配置
 */

import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import { Space, Modal, Input, Button, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { ProForm, ProFormInstance } from "@ant-design/pro-components";
import { InterfaceSetting } from "./InterfaceSetting";
import { HTTPSetting } from "./HTTPSetting";
import { PromptInformation } from "./PromptInformation";
import { setValue } from "./../helper";
import { Query } from "../settingRender/querySetting";

export interface QueryModalProps extends PanelSchemaProps {
  defaultValue: Partial<Query>;
  customHandler?: (formValue: Partial<Query>) => void;
}

export const QueryModal = (props: QueryModalProps) => {
  const { setProp, defaultValue, propName, customHandler } = props;
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState(defaultValue.url);
  const formRef = useRef<ProFormInstance>();

  const saveFormData = () => {
    formRef.current.submit();
  };

  const onFinish = async values => {
    await formRef.current.validateFields();
    if (!values.requestHeader) {
      values.requestHeader = defaultValue.requestHeader;
    }
    customHandler
      ? customHandler(values)
      : setProp(props => setValue(props, propName, values), 500);
    setUrl(values.url);
    setModalOpen(false);
  };

  return (
    <>
      <Space size={10}>
        <Input
          placeholder="http(s)://"
          onChange={e => {
            const { value } = e.target;
            setUrl(value);
            customHandler
              ? customHandler({ ...defaultValue, url: value })
              : setProp(
                  props => setValue(props, `${propName}.url`, value),
                  500
                );
          }}
          value={url}
        />
        <Button onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon icon={"gears"} />
        </Button>
      </Space>
      <Modal
        open={modalOpen}
        width={800}
        title={t("querySetting.title")}
        onCancel={() => setModalOpen(false)}
        onOk={saveFormData}
        destroyOnClose
      >
        <ProForm
          formRef={formRef}
          labelCol={{ span: 4 }}
          layout={"horizontal"}
          submitter={false}
          onFinish={onFinish}
          initialValues={defaultValue}
        >
          <Tabs
            defaultActiveKey="interfaceSetting"
            items={[
              {
                label: t("querySetting.interfaceSetting"),
                key: "interfaceSetting",
                children: <InterfaceSetting formData={defaultValue} />,
              },
              {
                label: t("querySetting.HTTPSetting"),
                key: "HTTPSetting",
                children: <HTTPSetting formRef={formRef} />,
              },
              {
                label: t("querySetting.promptInformation"),
                key: "promptInformation",
                children: <PromptInformation />,
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: QueryModalProps;
}
export const QueryModalSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <QueryModal {...childProps} />
    </SchemaItem>
  );
};
