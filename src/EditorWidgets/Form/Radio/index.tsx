/*
 * @Date: 2022-09-27 10:37:56
 * @LastEditTime: 2023-05-23 16:04:18
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 复选按钮
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";

import { Element } from "@craftjs/core";
import { RadioSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component from "./Component";
import { RadioRenderViewProps } from "./index.d";

const NAME = "Radio";
const widgetName = displayName(NAME);

const defaultProps = {
  ...styleDefault,
  onEvent: {},
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
  vertical: true,
};
export const RadioComponent = Component;
export const RadioRenderView = (props: Partial<RadioRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

RadioRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: RadioSetting,
  },
};

export const Radio: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "square-check",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={RadioRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "RadioComponent",
      }}
    ></Element>
  ),
};
