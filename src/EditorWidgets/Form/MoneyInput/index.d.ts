/*
 * @Date: 2023-04-21 10:32:52
 * @LastEditTime: 2023-04-21 10:32:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 金额组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface MoneyInputProps extends FormWidgetContainerProps {
  placeholder: string;
  precision: number;
  upperCase: boolean;
}

export interface UpperCaseProps {
  num?: number | undefined;
}
