/*
 * @Date: 2023-04-18 13:38:05
 * @LastEditTime: 2023-05-11 17:59:03
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 多行文本组件入口
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { TextAreaSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { TextAreaRenderViewProps } from "./index.d";

const NAME = "TextArea";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  onEvent: {},
  name: widgetName,
  placeholder: "请输入",
  vertical: true,
  totalWordNumber: 8000,
  defaultValue: ["custom", ""],
  required: false,
};
export const TextAreaComponent = Component;
export const TextAreaRenderView = (props: Partial<TextAreaRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

TextAreaRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: TextAreaSetting,
  },
};

export const TextArea: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "t",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={TextAreaRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "TextAreaComponent",
      }}
    ></Element>
  ),
};
