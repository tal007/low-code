/*
 * @Date: 2023-05-08 11:22:23
 * @LastEditTime: 2023-05-08 11:22:27
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 数字框组件ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { StyleContainerProps } from "../../Common/StyleContainer";
export interface InputNumberProps extends FormWidgetContainerProps {
  name: string;
  placeholder: string;
  defaultValue: string;
}
export interface InputNumberRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    InputNumberProps {}
