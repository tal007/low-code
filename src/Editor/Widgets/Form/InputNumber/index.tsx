/*
 * @Date: 2022-09-27 14:43:25
 * @LastEditTime: 2023-05-11 16:11:17
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 数字输入框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { useEditorAction, useEvents } from "../../hooks";
import { InputNumberSetting } from "./InputNumberSetting";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormDigit, ProFormDigitProps } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { InputNumberProps } from "antd";
import { Children, Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface InputNumberRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children {
  fieldProps?: FieldProps<any> & InputNumberProps;
  formItemProps?: ProFormFieldItemProps<ProFormDigitProps>;
  common: Record<string, any>;
}

const NAME = "InputNumber";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({ max: 9999, min: -9999, step: 1 }),
  ...setCommonDefaults(),
  onEvent: {},
};

export const InputNumberRenderView = (
  props: Partial<InputNumberRenderViewProps>
) => {
  const { enabled } = useEditorAction();

  const { fieldProps, formItemProps, onEvent } = props;

  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      {/* <ProFormDigit
        {...formItemProps}
        label={
          <Element
            id="label"
            is={TextRenderView}
            text={(formItemProps.label as string) || widgetName}
          />
        }
        fieldProps={{
          ...fieldProps,
          defaultValue: 0,
          onChange: changeHandler,
          disabled: enabled || fieldProps.disabled,
        }}
        hidden={false}
      ></ProFormDigit> */}
    </FormWidgetContainer>
  );
};

InputNumberRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: InputNumberSetting,
  },
};

export const InputNumber: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "1",
  tags: ["form"],
  preview: <ProFormDigit />,
  render: (
    <Element
      canvas
      is={InputNumberRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
