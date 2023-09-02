/*
 * @Date: 2022-09-27 10:37:56
 * @LastEditTime: 2023-05-16 09:38:35
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 复选按钮
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { CheckboxSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component from "./Component";
import { CheckboxRenderViewProps } from "./index.d";

const NAME = "Checkbox";
const widgetName = displayName(NAME);

const defaultProps = {
  ...styleDefault,
  name: widgetName,
  placeholder: "请选择",
  itemVertical: false,
  flat: false,
  dataSource: {
    dataSourceType: "static",
    staticData: [
      {
        label: "选项1",
        value: "选项1",
      },
      {
        label: "选项2",
        value: "选项2",
      },
      {
        label: "选项3",
        value: "选项3",
      },
    ],
  },
  onEvent: {},
  vertical: true,
};
export const CheckboxComponent = Component;
export const CheckboxRenderView = (props: Partial<CheckboxRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

CheckboxRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: CheckboxSetting,
  },
};

export const Checkbox: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "square-check",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={CheckboxRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "CheckboxComponent",
      }}
    ></Element>
  ),
};
