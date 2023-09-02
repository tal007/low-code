/*
 * @Date: 2022-10-08 16:01:12
 * @LastEditTime: 2023-05-15 14:03:29
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文字
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { TextSettings } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { TextProps } from "./index.d";
import { Component, EditorComponent } from "./Component";
import defaultProps from "./defaultProps";
import { useEditorAction } from "@/Editor/Widgets/hooks";

const widgetName = displayName("Text");
export const TextComponent = Component;
export const TextRenderView = (props: Partial<TextProps>) => {
  const { enabled } = useEditorAction();
  return <EditorComponent {...props} enabled={enabled} />;
};

TextRenderView.craft = {
  displayName: widgetName,
  props: defaultProps,
  related: {
    settings: TextSettings,
  },
};

export const Text: CommonButtonTypes = {
  ...generateWidgetOptions("Text", "show"),
  icon: "terminal",
  tags: ["show"],
  render: (
    <Element
      canvas
      is={TextRenderView}
      custom={{
        displayName: widgetName,
        tags: ["show"],
        componentName: "TextComponent",
      }}
    ></Element>
  ),
};
