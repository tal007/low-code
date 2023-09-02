/*
 * @Date: 2022-09-26 16:30:40
 * @LastEditTime: 2023-05-11 17:59:46
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本框
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { InputTextSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { InputTextRenderViewProps } from "./index.d";

const NAME = "InputText";
const widgetName = displayName(NAME);

export const defaultProps = {
  onEvent: {},
  name: widgetName,
  placeholder: "请输入",
  defaultValue: ["custom", ""],
  vertical: true,
};
export const InputTextComponent = Component;
export const InputTextRenderView = (
  props: Partial<InputTextRenderViewProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

InputTextRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: InputTextSetting,
  },
};

export const InputText: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "t",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={InputTextRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "InputTextComponent",
      }}
    ></Element>
  ),
};
