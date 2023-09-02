/*
 * @Date: 2023-05-12 15:31:19
 * @LastEditTime: 2023-05-12 16:03:48
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 二维码组件ts定义
 */
import { Query } from "@/SettingPanelSchema/settingRender/querySetting";
import { QRCodeProps as AntdQRCodeProps } from "antd";
import { RGBColor } from "react-color";
import { StyleContainerProps } from "../../Common/StyleContainer";

export interface QRCodeProps
  extends Omit<StyleContainerProps, "style">,
    Omit<AntdQRCodeProps, "color"> {
  common: Record<string, any>;
  name: string;
  uploadSrc: string;
  color: RGBColor;
  queryConfig: Partial<Query>;
  enabled: boolean;
}

export interface QRCodeComponentProps extends QRCodeProps {
  url: string;
  isLoading: boolean;
  queryConfigUrl: string;
}
