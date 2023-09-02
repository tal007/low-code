/*
 * @Date: 2023-04-20 10:23:52
 * @LastEditTime: 2023-04-20 10:23:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本说明
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { RateProps } from "./index.d";
import { RateSetting } from "./setting";
import Component from "./Component";

const name = "Rate";
const widgetName: string = displayName(name);
export const defaultProps: Partial<RateProps> = {
  name: widgetName,
  vertical: true,
  count: 5,
  allowHalf: false,
};
export const RateComponent = Component;
export const RateRenderView = (props: Partial<RateProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

RateRenderView.craft = {
  displayName: name,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: RateSetting,
  },
};
export const Rate: CommonButtonTypes = {
  ...generateWidgetOptions(name, "form"),
  icon: "terminal",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={RateRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "RateComponent",
      }}
    ></Element>
  ),
};
