/*
 * @Date: 2022-09-27 14:51:50
 * @LastEditTime: 2023-05-11 17:45:06
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 日期选择框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { DatePickerSetting } from "./setting";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component, { DatePickerProps } from "./Component";

const NAME = "DatePicker";
const widgetName = displayName(NAME);
const defaultProps = {
  name: widgetName,
  required: false,
  vertical: true,
  //
  format: "YYYY",
  defaultValueType: 2,
  defaultExtraValue: '',
  optionalTimeRange: 4,
  noRangeStart: "",
  noRangeEnd: "",
};

export const DatePickerComponent = Component;
export const DatePickerRenderView = (props: Partial<DatePickerProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
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
  render: (
    <Element
      canvas
      is={DatePickerRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "DatePickerComponent",
      }}
    ></Element>
  ),
};
