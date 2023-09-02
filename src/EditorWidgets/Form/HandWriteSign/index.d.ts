/*
 * @Date: 2023-04-24 10:16:11
 * @LastEditTime: 2023-05-04 11:31:18
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 省市区组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export type ComponentProps = FormWidgetContainerProps;

export interface SignComponentProps {
  width?: number;
  height?: number;
  bgColor?: string;
  penColor?: string;
}
