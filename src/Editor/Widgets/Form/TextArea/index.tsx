/*
 * @Date: 2022-09-27 10:24:08
 * @LastEditTime: 2023-01-05 12:10:14
 * @LastEditors: 刘玉田
 * @Description: 多行文本框
 */

import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { Input } from "antd";
import { TextAreaSetting } from "./TextAreaSetting";
import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useEditorAction, useEvents } from "../../hooks";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormTextArea } from "@ant-design/pro-components";
import { TextRenderView } from "../../Show/Text";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import type { TextAreaProps } from "antd/lib/input";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface TextAreaRenderViewProps<T>
  extends WidthAndHeight,
    Events,
    StyleContainerProps {
  fieldProps?: FieldProps<T> & TextAreaProps;
  formItemProps?: ProFormFieldItemProps<TextAreaProps>;
}

const NAME = "TextArea";
const widgetName = displayName(NAME);

const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({ showCount: false, maxLength: 0 }),
  ...setCommonDefaults(),
  onEvent: {},
};

export const TextAreaRenderView = (
  props: Partial<TextAreaRenderViewProps<any>>
) => {
  const { enabled } = useEditorAction();

  const { formItemProps, fieldProps, onEvent } = props;
  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      <ProFormTextArea
        // 文本框去除首位空格  有name属性生效
        getValueFromEvent={e => {
          return e.target.value.toString().replace(/(^\s*)|(\s*$)/g, "");
        }}
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
          disabled: enabled || fieldProps.disabled,
          maxLength: fieldProps.maxLength || undefined,
          onChange: changeHandler,
        }}
      ></ProFormTextArea>
    </FormWidgetContainer>
  );
};

TextAreaRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TextAreaSetting,
  },
};

export const TextArea: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "paragraph",
  tags: ["form"],
  preview: <Input.TextArea />,
  render: (
    <Element
      canvas
      is={TextAreaRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
