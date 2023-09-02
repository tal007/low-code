/**
 * @author 梁强
 * @filename index.tsx
 * @date 2023-05-22 星期一
 * @description 时间组件
 */

import { CommonButtonTypes } from "@/EditorWidgets/Common";
import { generateWidgetOptions } from "@/EditorWidgets/helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import TimeRenderViewSettings from "./settings";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface TimeComponentViewProps extends FormWidgetContainerProps {
  format: string;
  defaultValueType: number;
  defaultValue: string;
  intervalMinutes: number;
  initialTime: number;
}

const TimeNAME = "Time";
const widgetName = displayName(TimeNAME);
export const TimeComponent = Component;

export const TimeRenderView = (props: Partial<TimeComponentViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

TimeRenderView.craft = {
  displayName: TimeNAME,
  props: {
    onEvent: {},
    name: widgetName,
    placeholder: "请选择时间",
    vertical: true,
    format: "HH:mm",
    defaultValueType: 2,
    defaultValue: undefined,
    intervalMinutes: 1,
    initialTime: false,
    required: true,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TimeRenderViewSettings,
  },
};

export const Time: CommonButtonTypes = {
  ...generateWidgetOptions(TimeNAME, "form"),
  icon: "clock",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={TimeRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "TimeComponent",
      }}
    ></Element>
  ),
};
