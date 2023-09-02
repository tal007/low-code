/*
 * @Date: 2022-09-27 14:51:50
 * @LastEditTime: 2023-01-05 11:57:13
 * @LastEditors: 刘玉田
 * @Description: 日期选择框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { DatePickerProps as AntdDatePickerProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { DatePickerSetting } from "./DatePickerSetting";
import { useEditorAction, useEvents } from "../../hooks";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import {
  ProFormDatePicker,
  ProFormDateTimePicker,
} from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export type DatePickerProps = StyleContainerProps &
  Events & {
    fieldProps?: FieldProps<any> & AntdDatePickerProps;
    formItemProps?: ProFormFieldItemProps<AntdDatePickerProps>;
    common: Record<string, any>;
    showTime: boolean;
  };

const NAME = "DatePicker";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({
    picker: "date",
  }),
  showTime: false,
  ...setCommonDefaults(),
  onEvent: {},
};

export const DatePickerRenderView = (props: Partial<DatePickerProps>) => {
  const { enabled } = useEditorAction();
  const { formItemProps, fieldProps, showTime, onEvent } = props;

  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      {showTime ? (
        <ProFormDateTimePicker
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
            onChange: changeHandler,
          }}
        />
      ) : (
        <ProFormDatePicker
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
          }}
        />
      )}
    </FormWidgetContainer>
  );
};

DatePickerRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: DatePickerSetting,
  },
};

export const DatePicker: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "calendar-days",
  tags: ["form"],
  preview: <ProFormDatePicker />,
  render: (
    <Element
      canvas
      is={DatePickerRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
