/*
 * @Date: 2022-09-27 14:43:25
 * @LastEditTime: 2023-05-11 16:53:20
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 数字输入框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { InputNumberSetting } from "./setting";
import { styleDefault } from "../../Common/StyleContainer";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { InputNumberRenderViewProps } from "./index.d";

const NAME = "InputNumber";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  onEvent: {},
  name: widgetName,
  placeholder: "请输入数字",
  vertical: true,
};
export const InputNumberComponent = Component;
export const InputNumberRenderView = (
  props: Partial<InputNumberRenderViewProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

InputNumberRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: InputNumberSetting,
  },
};

export const InputNumber: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "1",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={InputNumberRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "InputNumberComponent",
      }}
    ></Element>
  ),
};
