/*
 * @Date: 2023-05-12 14:26:03
 * @LastEditTime: 2023-05-12 14:27:26
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 验证码组件ts定义
 */
import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { InputProps } from "antd";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { ProFormCaptchaProps } from "@ant-design/pro-components";
import type { FieldProps } from "@ant-design/pro-form/es/typing";
import { Rule } from "antd/es/form";
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface CaptchaRenderViewProps
  extends WidthAndHeight,
    StyleContainerProps,
    FormWidgetContainerProps {
  fieldProps?: FieldProps<any> & InputProps;
  formItemProps?: ProFormCaptchaProps;
  common: Record<string, any>;
  formRules: Rule;
}
