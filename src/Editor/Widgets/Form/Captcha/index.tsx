/*
 * @Date: 2022-12-21 09:12:38
 * @LastEditTime: 2023-01-05 11:42:11
 * @LastEditors: 刘玉田
 * @Description: 验证码
 */

import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Element } from "@craftjs/core";
import { Input, InputProps, message } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { useEditorAction } from "../../hooks";
import { CaptchaSetting } from "./CaptchaSetting";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import {
  CaptFieldRef,
  ProFormCaptcha,
  ProFormCaptchaProps,
} from "@ant-design/pro-components";
import type { FieldProps } from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { Rule } from "antd/es/form";
import { setRulesDefault } from "@/SettingPanelSchema/settingRender/formRules";
import { useRef } from "react";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface CaptchaRenderViewProps
  extends WidthAndHeight,
    StyleContainerProps {
  fieldProps?: FieldProps<any> & InputProps;
  formItemProps?: ProFormCaptchaProps;
  common: Record<string, any>;
  formRules: Rule;
}

const NAME = "Captcha";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME, phoneName: "" }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
  ...setRulesDefault(),
};

export const CaptchaRenderView = (props: Partial<CaptchaRenderViewProps>) => {
  const { enabled } = useEditorAction();
  const { fieldProps, formItemProps, formRules } = props;
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const inputRef = useRef();

  return (
    <FormWidgetContainer {...props}>
      <ProFormCaptcha
        {...formItemProps}
        onGetCaptcha={mobile => {
          return new Promise((resolve, reject) => {
            if (mobile) {
              resolve();
            } else {
              message.info("请输入手机号");
              reject("请输入手机号");
            }
          });
        }}
        fieldRef={captchaRef}
        fieldProps={{
          ref: inputRef,
          placeholder: fieldProps.placeholder,
          disabled: enabled || fieldProps.disabled,
        }}
        rules={[formRules]}
        label={
          <Element
            id="label"
            is={TextRenderView}
            text={(formItemProps.label as string) || widgetName}
          />
        }
        hidden={false}
      />
    </FormWidgetContainer>
  );
};

CaptchaRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: CaptchaSetting,
  },
};

export const Captcha: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "key",
  tags: ["form"],
  preview: <Input />,
  render: (
    <Element
      canvas
      is={CaptchaRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
