/*
 * @Date: 2022-11-03 17:39:25
 * @LastEditTime: 2023-01-05 16:57:42
 * @LastEditors: 刘玉田
 * @Description: 复制内容
 */

import { ProFormTextArea } from "@ant-design/pro-components";
import { Form, FormInstance } from "antd";
import { ActionDesc } from "./Common";
export interface CopyProperties {
  form: FormInstance;
  defaultFormValue: any;
}

export const Copy = (props: Partial<CopyProperties>) => {
  const { form, defaultFormValue } = props;
  const { t } = useTranslation();

  return (
    <ActionDesc desc={t("event.copy")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={defaultFormValue}
      >
        <ProFormTextArea
          label={t("event.copyTemp")}
          name={"copyTemp"}
          rules={[{ required: true }]}
        ></ProFormTextArea>
      </Form>
    </ActionDesc>
  );
};
