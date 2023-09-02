/*
 * @Date: 2022-11-03 17:34:28
 * @LastEditTime: 2023-01-30 10:58:01
 * @LastEditors: 刘玉田
 * @Description: 打开弹窗
 */

import { ActionDesc } from "./Common";
import { FormInstance, Form } from "antd";
import { useEditor } from "@craftjs/core";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { DefaultOptionType } from "antd/es/select";

export interface OpenModalProps {
  defaultFormValue: any;
  form: FormInstance;
}
export const OpenModal = (props: Partial<OpenModalProps>) => {
  const { t } = useTranslation();
  const { defaultFormValue, form } = props;

  const { nodes } = useEditor(state => {
    return {
      nodes: state.nodes,
    };
  });

  const forms = Object.values(nodes)
    .filter(node => {
      return node.data.displayName.toLowerCase() === "modal";
    })
    .map(node => ({
      value: node.id,
      label: node.data.custom.displayName || node.data.displayName,
    }));

  return (
    <ActionDesc desc={t("event.openModal")}>
      <Form
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        form={form}
        initialValues={defaultFormValue}
      >
        <ProFormSelect
          label={t("event.modalName")}
          name={"modalId"}
          options={forms}
          fieldProps={{
            onChange(value, option) {
              form.setFieldValue(
                "modalName",
                (option as DefaultOptionType).label as string
              );
            },
          }}
          rules={[{ required: true, message: t("event.formSelect") }]}
        ></ProFormSelect>
        <ProFormText
          label={t("event.modalName")}
          name={"modalName"}
          hidden
        ></ProFormText>
      </Form>
    </ActionDesc>
  );
};
