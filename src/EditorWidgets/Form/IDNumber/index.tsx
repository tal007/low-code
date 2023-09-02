/*
 * @Date: 2022-09-27 14:43:25
 * @LastEditTime: 2023-04-21 14:04:21
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 数字输入框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { IDNumberSetting } from "./IDNumberSetting";
import { StyleContainerProps } from "../../Common/StyleContainer";
import Component, { IDNumberComponentProps } from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";

export interface IDNumberRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    IDNumberComponentProps {}

const NAME = "IDNumber";
const widgetName = displayName(NAME);
const defaultProps = {
  onEvent: {},
  name: widgetName,
  placeholder: "请输入数字",
};
export const IDNumberComponent = Component;
export const IDNumberRenderView = (props: Partial<IDNumberRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

IDNumberRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: IDNumberSetting,
  },
};

export const IDNumber: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "1",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={IDNumberRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "IDNumberComponent",
      }}
    ></Element>
  ),
};
