/*
 * @Date: 2023-04-21 10:50:23
 * @LastEditTime: 2023-04-21 10:50:23
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 金额组件入口文件
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { MoneyInputProps } from "./index.d";
import { MoneyInputSetting } from "./setting";
import Component from "./Component";

const name = "MoneyInput";
const widgetName: string = displayName(name);
export const defaultProps: Partial<MoneyInputProps> = {
  name: widgetName,
  placeholder: "请输入金额",
  vertical: true,
  upperCase: true,
  required: false,
};
export const MoneyInputComponent = Component;
export const MoneyInputRenderView = (props: Partial<MoneyInputProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

MoneyInputRenderView.craft = {
  displayName: name,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: MoneyInputSetting,
  },
};
export const MoneyInput: CommonButtonTypes = {
  ...generateWidgetOptions(name, "form"),
  icon: "terminal",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={MoneyInputRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "MoneyInputComponent",
      }}
    ></Element>
  ),
};
