/*
 * @Date: 2023-05-08 11:15:35
 * @LastEditTime: 2023-05-10 15:58:01
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 多行文本ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Events } from "../../types";
import { StyleContainerProps } from "../../Common/StyleContainer";
export interface TextAreaProps extends FormWidgetContainerProps {
  placeholder: string;
  defaultValue: string[];
  totalWordNumber: number;
  id: string;
}
export interface TextAreaRenderViewProps
  extends WidthAndHeight,
    Events,
    StyleContainerProps,
    TextAreaProps {}
