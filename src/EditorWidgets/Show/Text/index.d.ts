/*
 * @Date: 2023-05-12 16:34:52
 * @LastEditTime: 2023-05-12 16:34:54
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本组件ts定义
 */
import { BackgroundColor } from "../../types";
import { Font } from "@/SettingPanelSchema/settingRender/font";
import { MarginAndPadding } from "@/SettingPanelSchema/settingRender/marginAndPadding";

export interface TextProps extends BackgroundColor, Font, MarginAndPadding {
  shadow: number;
  text: string;
  tagName: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  enabled: boolean;
}
