/*
 * @Date: 2022-09-27 14:51:50
 * @LastEditTime: 2023-05-15 15:31:57
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 日期范围选择框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { DateRangePickerSetting } from "./setting";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component, { DateRangePickerProps } from "./Component";

const NAME = "DateRangePicker";
const widgetName = displayName(NAME);
const defaultProps = {
  name: widgetName,
  required: false,
  type: "day",
  vertical: true,
};

export const DateRangePickerComponent = Component;
export const DateRangePickerRenderView = (
  props: Partial<DateRangePickerProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
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
  render: (
    <Element
      canvas
      is={DateRangePickerRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "DateRangePickerComponent",
      }}
    ></Element>
  ),
};
