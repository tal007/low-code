/*
 * @Date: 2022-11-03 17:36:19
 * @LastEditTime: 2023-05-04 10:46:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 下载文件
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

export interface DownloadProps {
  form: FormInstance;
  defaultFormValue: any;
}

export const Download = (props: Partial<DownloadProps>) => {
  const { form, defaultFormValue } = props;
  const { t } = useTranslation();

  const [formState, setFormState] = useState<Partial<Query>>(
    setQueryConfig({
      ...defaultFormValue?.downloadApi,
    })
  );

  const customHandler = values => {
    setFormState(values);
    if (values.url === "") {
      form.setFieldValue("downloadApi", "");
      message.error(`${t("common.pleaseInput")}${t("event.ajaxUrl")}`);
    } else {
      form.setFieldValue("downloadApi", values);
    }
  };

  return (
    <ActionDesc desc={t("event.download")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={
          defaultFormValue ? defaultFormValue : { downloadApi: "" }
        }
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
          name="downloadApi"
          label={t("event.ajaxUrl")}
          hidden
          rules={[{ required: true }]}
        ></ProFormText>
      </Form>
    </ActionDesc>
  );
};
