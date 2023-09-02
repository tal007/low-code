/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-12 16:46:46
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-16 13:43:39
 * @Description: 表单组件容器
 */
import { ReactNode } from "react";
import { Form as FormPC, FormRule } from "antd";
import { Form as FormMobile } from "antd-mobile";
import { useTranslation } from "react-i18next";

export interface FormWidgetContainerProps {
  id: string;
  platform: "pc" | "mobile";
  name: string;
  required: boolean;
  vertical: boolean;
  tipMessage: string;
  parentNodeId: string;
  //
  value?: string;
  onChange?: (val: any) => void;
  hiddenLabel?: boolean; // 隐藏label
  enabled: boolean; // 是否是编辑器
  defaultValue?: string; // 默认值
  rules?: FormRule[]; // 验证规则
  checkRequired?: (_: any, val: any) => void;
}

export const FormWidgetContainer = (
  props: Partial<FormWidgetContainerProps> & { children: ReactNode }
) => {
  const { t } = useTranslation();
  const {
    name,
    vertical,
    required,
    children,
    id,
    defaultValue,
    rules = [],
    platform,
    checkRequired,
  } = props;
  const requiredRule = checkRequired
    ? { validator: checkRequired }
    : {
        required: required,
        message: t("i18n.requiredTip", { name: name, ns: "formRules" }),
      };
  const _rules = [requiredRule, ...rules];

  return (
    <>
      {platform === "mobile" ? (
        <FormMobile.Item
          layout={vertical ? "vertical" : "horizontal"}
          required={required}
          rules={_rules}
          label={name}
          name={id}
          initialValue={defaultValue}
        >
          {children}
        </FormMobile.Item>
      ) : (
        <FormPC.Item
          labelCol={vertical ? { span: 24 } : undefined}
          required={required}
          rules={_rules}
          validateTrigger={["onChange", "onBlur"]}
          label={name}
          name={id}
          initialValue={defaultValue}
        >
          {children}
        </FormPC.Item>
      )}
    </>
  );
};

export default FormWidgetContainer;
