/*
 * @Date: 2022-11-03 17:35:58
 * @LastEditTime: 2023-05-04 10:46:18
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 发送请求
 */

import { QueryModalSchema } from "@/SettingPanelSchema/QueryModal";
import { ProFormText } from "@ant-design/pro-components";
import { Form, FormInstance, message } from "antd";
import { ActionDesc } from "./Common";
import { useState } from "react";
import {
  Query,
  setQueryConfig,
} from "@/SettingPanelSchema/settingRender/querySetting";
export interface CopyProperties {
  form: FormInstance;
  defaultFormValue: any;
}

export const Ajax = (props: Partial<CopyProperties>) => {
  const { form, defaultFormValue } = props;
  const { t } = useTranslation();

  const [formState, setFormState] = useState<Partial<Query>>(
    setQueryConfig({
      ...defaultFormValue?.queryApi,
    })
  );

  const customHandler = values => {
    setFormState(values);
    if (values.url === "") {
      form.setFieldValue("queryApi", "");
      message.error(`${t("common.pleaseInput")}${t("event.ajaxUrl")}`);
    } else {
      form.setFieldValue("queryApi", values);
    }
  };

  return (
    <ActionDesc desc={t("event.ajax")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={defaultFormValue ? defaultFormValue : { queryApi: "" }}
      >
        <QueryModalSchema
          parentProps={{
            label: "querySetting.title",
            isRequired: true,
            justify: "flex-start",
          }}
          childProps={{
            setProp: () => {
              //
            },
            customHandler,
            propName: "ajax",
            defaultValue: formState,
          }}
        ></QueryModalSchema>
        <ProFormText
          name="queryApi"
          label={t("event.ajaxUrl")}
          hidden
          rules={[{ required: true }]}
        ></ProFormText>
      </Form>
    </ActionDesc>
  );
};
