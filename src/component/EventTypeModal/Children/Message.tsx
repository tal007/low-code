/*
 * @Date: 2022-11-03 17:35:34
 * @LastEditTime: 2023-05-04 10:44:23
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 消息提醒
 */

import { ActionDesc } from "./Common";
import { Form, FormInstance, Input, InputNumber, Radio } from "antd";
import { useState } from "react";

export interface MessageProps {
  form: FormInstance;
  defaultFormValue: any;
}

export const Message = (props: Partial<MessageProps>) => {
  const { defaultFormValue, form } = props;
  const { t } = useTranslation();

  const [, setMessageType] = useState(defaultFormValue.type || "info");

  return (
    <ActionDesc desc={t("event.message")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={{
          type: defaultFormValue?.type || "info",
          content: defaultFormValue?.content || "",
          duration: defaultFormValue?.duration || 3,
        }}
      >
        <Form.Item
          label={t("event.messageDetail.type")}
          name={"type"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group onChange={e => setMessageType(e.target.value)}>
            <Radio.Button value="info">
              {t("event.messageDetail.info")}
            </Radio.Button>
            <Radio.Button value="success">
              {t("event.messageDetail.success")}
            </Radio.Button>
            <Radio.Button value="warning">
              {t("event.messageDetail.warning")}
            </Radio.Button>
            <Radio.Button value="error">
              {t("event.messageDetail.error")}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={t("event.messageDetail.content")}
          name={"content"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item label={t("event.messageDetail.duration")} name={"duration"}>
          <InputNumber placeholder={"3"} style={{ width: "60%" }} />
        </Form.Item>
      </Form>
    </ActionDesc>
  );
};
