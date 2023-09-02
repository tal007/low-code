/*
 * @Date: 2023-05-04 11:07:50
 * @LastEditTime: 2023-05-09 17:59:19
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 自动计算组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface CalculationFormulaProps extends FormWidgetContainerProps {
  placeholder: string;
  precision: number;
  readOnly: boolean;
  upperCase: boolean;
  formula: string[];
}

export interface UpperCaseProps {
  num?: number;
}
