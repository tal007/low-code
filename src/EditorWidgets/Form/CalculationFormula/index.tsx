/*
 * @Date: 2023-05-04 11:07:50
 * @LastEditTime: 2023-05-05 15:56:47
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 自动计算组件入口文件
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { CalculationFormulaProps } from "./index.d";
import { SettingComponent } from "./setting";
import Component from "./Component";

const name = "CalculationFormula";
const widgetName: string = displayName(name);
export const defaultProps: Partial<CalculationFormulaProps> = {
  name: widgetName,
  placeholder: "自动计算数值",
  readOnly: false,
  vertical: true,
  upperCase: true,
  required: false,
  formula: ["formula", ""],
};
export const CalculationFormulaComponent = Component;
export const CalculationFormulaRenderView = (
  props: Partial<CalculationFormulaProps>
) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

CalculationFormulaRenderView.craft = {
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
export const CalculationFormula: CommonButtonTypes = {
  ...generateWidgetOptions(name, "form"),
  icon: "terminal",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={CalculationFormulaRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "CalculationFormulaComponent",
      }}
    ></Element>
  ),
};
