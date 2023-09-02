/*
 * @Date: 2023-05-12 15:31:19
 * @LastEditTime: 2023-05-12 15:49:36
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 图片组件ts定义
 */
import { MarginAndPadding } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { ImageProps as AntdImageProps } from "antd";

type ImagePickProps = Pick<
  AntdImageProps,
  "width" | "height" | "alt" | "preview" | "src"
>;

export interface ImageProps extends ImagePickProps, MarginAndPadding {
  name: string;
  uploadSrc: string;
  enabled: boolean;
}
