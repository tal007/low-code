/*
 * @Date: 2023-05-08 11:09:58
 * @LastEditTime: 2023-05-08 11:10:08
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本组件ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Events } from "../../types";
export interface InputProps extends FormWidgetContainerProps {
  name: string;
  placeholder: string;
  defaultValue: string[];
}
export interface InputTextRenderViewProps
  extends WidthAndHeight,
    Events,
    InputProps {}
