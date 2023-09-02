/*
 * @Date: 2023-05-12 17:41:13
 * @LastEditTime: 2023-05-12 17:41:16
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 统计组件ts定义
 */
import { StyleContainerProps } from "../../Common/StyleContainer";
import { StatisticProps as AntdStatisticProps } from "antd";
import { Font } from "@/SettingPanelSchema/settingRender/font";

export interface StatisticProps
  extends Partial<Omit<StyleContainerProps, "children">>,
    AntdStatisticProps {
  common: Record<string, any>;
  prefix?: string;
  font: Font;
}
