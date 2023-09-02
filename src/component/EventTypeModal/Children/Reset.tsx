/*
 * @Date: 2022-11-03 17:38:57
 * @LastEditTime: 2022-12-23 11:23:40
 * @LastEditors: 刘玉田
 * @Description: 重置表单
 */

import { ActionDesc } from "./Common";
import { useEditor } from "@craftjs/core";
import { ProFormSelect } from "@ant-design/pro-components";
import { Form, FormInstance } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ProFormText } from "@ant-design/pro-components";

export interface SubmitProperties {
  form: FormInstance;
  defaultFormValue: any;
}

export const Reset = (props: Partial<SubmitProperties>) => {
  const { form, defaultFormValue } = props;
  const { t } = useTranslation();

  const { nodes } = useEditor(state => {
    return {
      nodes: state.nodes,
    };
  });

  const forms = Object.values(nodes)
    .filter(node => {
      return node.data.displayName.toLowerCase() === "form";
    })
    .map(node => ({
      value: node.id,
      label: node.data.custom.displayName || node.data.displayName,
    }));

  return (
    <ActionDesc desc={t("event.formReset")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={defaultFormValue}
      >
        <ProFormSelect
          label={t("event.form")}
          name={"formId"}
          options={forms}
          fieldProps={{
            onChange(value, option) {
              form.setFieldValue(
                "formName",
                (option as DefaultOptionType).label as string
              );
            },
          }}
          rules={[{ required: true, message: t("event.formSelect") }]}
        ></ProFormSelect>
        <ProFormText
          label={t("event.formName")}
          name={"formName"}
          hidden
        ></ProFormText>
      </Form>
    </ActionDesc>
  );
};
