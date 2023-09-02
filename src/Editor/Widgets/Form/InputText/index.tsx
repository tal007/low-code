/*
 * @Date: 2022-09-26 16:30:40
 * @LastEditTime: 2023-01-05 11:45:28
 * @LastEditors: 刘玉田
 * @Description: 文本框
 */

import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Element } from "@craftjs/core";
import { Input, InputProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { useEditorAction, useEvents } from "../../hooks";
import { InputTextSetting } from "./InputTextSetting";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormText } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import type { PasswordProps } from "antd/lib/input";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { Rule } from "antd/es/form";
import { setRulesDefault } from "@/SettingPanelSchema/settingRender/formRules";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface InputTextRenderViewProps
  extends WidthAndHeight,
    Events,
    StyleContainerProps {
  fieldProps?: FieldProps<any> & InputProps & PasswordProps;
  password: boolean;
  formItemProps?: ProFormFieldItemProps<InputProps>;
  common: Record<string, any>;
  formRules: Rule;
}

const NAME = "InputText";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  password: false,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({ showCount: false, maxLength: 0 }),
  ...setCommonDefaults(),
  ...setRulesDefault(),
  onEvent: {},
};

export const InputTextRenderView = (
  props: Partial<InputTextRenderViewProps>
) => {
  const { enabled } = useEditorAction();
  const { fieldProps, password, formItemProps, formRules, onEvent } = props;
  const { t } = useTranslation();

  const changeHandler = useEvents("change", onEvent);
  return (
    <FormWidgetContainer {...props}>
      {!password ? (
        <ProFormText
          // // 文本框去除首位空格  有name属性生效
          getValueFromEvent={e => {
            return e.target.value.toString().replace(/(^\s*)|(\s*$)/g, "");
          }}
          {...formItemProps}
          fieldProps={{
            ...fieldProps,
            disabled: enabled || fieldProps.disabled,
            maxLength: fieldProps.maxLength || undefined,
            onChange: changeHandler,
          }}
          rules={[formRules]}
          hidden={false}
          label={
            <Element
              id="label"
              is={TextRenderView}
              text={(formItemProps.label as string) || widgetName}
            />
          }
        />
      ) : (
        <ProFormText.Password
          // 文本框去除首位空格  有name属性生效
          getValueFromEvent={e => {
            return e.target.value.toString().replace(/(^\s*)|(\s*$)/g, "");
          }}
          {...formItemProps}
          fieldProps={{
            ...fieldProps,
            disabled: enabled || fieldProps.disabled,
            maxLength: fieldProps.maxLength || undefined,
            onChange: changeHandler,
          }}
          rules={[formRules]}
          label={
            <Element
              id="label-password"
              is={TextRenderView}
              text={(formItemProps.label as string) || t("common.password")}
            />
          }
          hidden={false}
        />
      )}
    </FormWidgetContainer>
  );
};

InputTextRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: InputTextSetting,
  },
};

export const InputText: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "t",
  tags: ["form"],
  preview: <Input />,
  render: (
    <Element
      canvas
      is={InputTextRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
