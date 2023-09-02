/*
 * @Date: 2022-09-27 14:51:50
 * @LastEditTime: 2023-01-05 11:57:16
 * @LastEditors: 刘玉田
 * @Description: 日期范围选择框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { DateRangePickerSetting } from "./DateRangePickerSetting";
import { useEditorAction, useEvents } from "../../hooks";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";

import {
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
} from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker/generatePicker";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export type DatePickerProps = StyleContainerProps &
  Events & {
    fieldProps?: FieldProps<any> & RangePickerProps<Dayjs>;
    formItemProps?: ProFormFieldItemProps<RangePickerProps<Dayjs>>;
    common: Record<string, any>;
    showTime: boolean;
  };

const NAME = "DateRangePicker";
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

export const DateRangePickerRenderView = (props: Partial<DatePickerProps>) => {
  const { enabled } = useEditorAction();
  const { formItemProps, fieldProps, showTime, onEvent } = props;

  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      {showTime ? (
        <ProFormDateTimeRangePicker
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
        <ProFormDateRangePicker
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

DateRangePickerRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: DateRangePickerSetting,
  },
};

export const DateRangePicker: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "calendar-days",
  tags: ["form"],
  preview: <ProFormDateRangePicker />,
  render: (
    <Element
      canvas
      is={DateRangePickerRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
