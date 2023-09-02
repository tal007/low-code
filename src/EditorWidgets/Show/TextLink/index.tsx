/*
 * @Date: 2023-04-20 10:23:52
 * @LastEditTime: 2023-05-12 15:20:54
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本说明
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
// import { useEditorAction, useEvents } from "../../hooks";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { colorDefault } from "@/Editor/Widgets/types";
import { TextLinkProps } from "./index.d";
import { TextLinkSetting } from "./setting";
import Component from "./Component";

const name = "TextLink";
const widgetName = displayName(name);

export const defaultProps: TextLinkProps = {
  description: widgetName,
  href: "",
  fontFamily: "微软雅黑",
  fontSize: 16,
  fontStyle: [false, false, false, false],
  color: colorDefault.color,
};
export const TextLinkComponent = Component;
export const TextLinkRenderView = (props: Partial<TextLinkProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

TextLinkRenderView.craft = {
  displayName: name,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TextLinkSetting,
  },
};
export const TextLink: CommonButtonTypes = {
  ...generateWidgetOptions(name, "show"),
  icon: "terminal",
  tags: ["show"],
  render: (
    <Element
      canvas
      is={TextLinkRenderView}
      custom={{
        displayName: widgetName,
        tags: ["show"],
        componentName: "TextLinkComponent",
      }}
    ></Element>
  ),
};
