/*
 * @Date: 2023-05-15 09:24:49
 * @LastEditTime: 2023-05-15 09:25:26
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 栅格组件ts定义
 */
import { MarginAndPadding } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { Background } from "@/SettingPanelSchema/settingRender/background";

export interface GridRenderViewProps extends MarginAndPadding, Background {
  children: React.ReactElement | React.ReactElement[];
  horizontalGutter: number;
  verticalGutter: number;
  colCount: number;
  justify: string;
  align: string;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
