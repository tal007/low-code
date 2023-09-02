/*
 * @Date: 2022-10-25 15:27:51
 * @LastEditTime: 2023-05-12 09:17:48
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 级联选择 https://ant.design/components/cascader-cn/#components-cascader-demo-laz
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { CascaderSelectSetting } from "./setting";

import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component from "./Component";
import { CascaderComponentProps } from "./index.d";
import { styleDefault } from "@/EditorWidgets/Common/StyleContainer";

const NAME = "CascaderSelect";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  name: widgetName,
  placeholder: "请选择",
};
export const CascaderComponent = Component;
export const CascaderSelectRenderView = (
  props: Partial<CascaderComponentProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props}></Component>
    </BaseContainer>
  );
};

CascaderSelectRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: CascaderSelectSetting,
  },
};

export const CascaderSelect: CommonButtonTypes = {
  ...generateWidgetOptions("CascaderSelect", "form"),
  icon: "th-list",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={CascaderSelectRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "CascaderComponent",
      }}
    />
  ),
};
