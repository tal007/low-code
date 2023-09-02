/*
 * @Date: 2023-05-08 11:46:29
 * @LastEditTime: 2023-05-08 11:46:49
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 电话组件ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { Events } from "../../types";

export interface PhoneNumberProps extends FormWidgetContainerProps {
  placeholder: string;
  defaultValue: string;
}
export interface PhoneNumberRenderViewProps
  extends WidthAndHeight,
    Events,
    StyleContainerProps,
    PhoneNumberProps {}
export interface FiledValue {
  preValue: string;
  realValue: string;
}
export interface FieldProps {
  value?: FiledValue;
  onChange?: (value: FiledValue) => void;
}
