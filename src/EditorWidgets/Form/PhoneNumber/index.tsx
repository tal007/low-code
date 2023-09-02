/*
 * @Date: 2022-09-26 16:30:40
 * @LastEditTime: 2023-05-12 09:11:38
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本框
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { PhoneNumberSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { PhoneNumberRenderViewProps } from "./index.d";

const NAME = "PhoneNumber";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  onEvent: {},
  name: widgetName,
  placeholder: "请输入",
  vertical: true,
};
export const PhoneNumberComponent = Component;
export const PhoneNumberRenderView = (
  props: Partial<PhoneNumberRenderViewProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

PhoneNumberRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: PhoneNumberSetting,
  },
};

export const PhoneNumber: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "mobile",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={PhoneNumberRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "PhoneNumberComponent",
      }}
    ></Element>
  ),
};
