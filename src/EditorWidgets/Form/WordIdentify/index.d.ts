/*
 * @Date: 2023-04-24 10:16:11
 * @LastEditTime: 2023-04-28 11:16:54
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 省市区组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface ComponentProps extends FormWidgetContainerProps {
  placeholder: string;
}

export interface UploadComponentProps {
  accept: string;
  maxCount: number;
  size: number;
  placeholder: string;
}
