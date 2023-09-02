/*
 * @Date: 2023-04-24 10:14:26
 * @LastEditTime: 2023-04-28 11:17:00
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 省市区
 */
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { ComponentProps } from "./index.d";
import { SettingComponent } from "./setting";
import Component from "./Component";

const name = "WordIdentify";
const widgetName: string = displayName(name);
export const defaultProps: Partial<ComponentProps> = {
  name: widgetName,
  vertical: true,
  placeholder: "请输入",
};
export const WordIdentifyComponent = Component;
export const WordIdentifyRenderView = (props: Partial<ComponentProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

WordIdentifyRenderView.craft = {
  displayName: name,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: SettingComponent,
  },
};
export const WordIdentify: CommonButtonTypes = {
  ...generateWidgetOptions(name, "form"),
  icon: "terminal",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={WordIdentifyRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "WordIdentifyComponent",
      }}
    ></Element>
  ),
};
