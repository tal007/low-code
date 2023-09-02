/*
 * @Date: 2023-05-12 17:52:56
 * @LastEditTime: 2023-05-12 18:01:56
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 容器组件ts定义
 */
import { FlexAlignProps } from "@/SettingPanelSchema/settingRender/flexAlign";
import type { Property } from "csstype";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { Children } from "../../types";

export interface ContainerRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    FlexAlignProps,
    Children {
  flexDirection: Property.FlexDirection;
  fillSpace: string;
  width: string;
  height: string;
  openFlex: boolean;
  common: Record<string, any>;
  enabled: boolean;
}
