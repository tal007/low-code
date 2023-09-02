/*
 * @Date: 2022-09-27 14:51:50
 * @LastEditTime: 2023-01-05 11:47:21
 * @LastEditors: 刘玉田
 * @Description: 时间范围选择框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { TimeRangePickerSetting } from "./TimeRangePickerSetting";
import { useEditorAction, useEvents } from "../../hooks";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormTimePicker } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { RangePickerProps } from "antd/es/date-picker/generatePicker";
import { Dayjs } from "dayjs";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export type TimePickerProps = StyleContainerProps &
  Events & {
    fieldProps?: FieldProps<any> & RangePickerProps<Dayjs>;
    formItemProps?: ProFormFieldItemProps<RangePickerProps<Dayjs>>;
    common: Record<string, any>;
  };

const NAME = "TimeRangePicker";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
  onEvent: {},
};

export const TimeRangePickerRenderView = (props: Partial<TimePickerProps>) => {
  const { enabled } = useEditorAction();
  const { formItemProps, fieldProps, onEvent } = props;

  const changeHandler = useEvents("change", onEvent);
  return (
    <FormWidgetContainer {...props}>
      <ProFormTimePicker.RangePicker
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
    </FormWidgetContainer>
  );
};

TimeRangePickerRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TimeRangePickerSetting,
  },
};

export const TimeRangePicker: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "clock",
  tags: ["form"],
  preview: <ProFormTimePicker.RangePicker />,
  render: (
    <Element
      canvas
      is={TimeRangePickerRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
