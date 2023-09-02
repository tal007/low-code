/*
 * @Date: 2022-10-11 11:07:52
 * @LastEditTime: 2023-05-11 16:05:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 类型与默认值公共文件
 */

import { STORAGE_KEYS } from "@/constant";
import { EventItemProps } from "@/SettingPanelSchema/EventHandler/EventItem";
import storage from "@/utils/storage";
import { RGBColor } from "react-color";
export interface Children {
  children: React.ReactNode;
}

export interface Color {
  color: RGBColor;
}
export const colorDefault: Color = {
  color: (function () {
    const isDarkModal = storage.getSession(STORAGE_KEYS.isDark) === "true";
    const value = isDarkModal ? 255 : 0;
    return { r: value, g: value, b: value, a: 1 };
  })(),
};

export interface BackgroundColor {
  backgroundColor: RGBColor;
}
export const backgroundColorDefault: BackgroundColor = {
  backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
};

export interface Events {
  onEvent: {
    [key: string]: EventItemProps[];
  };
}
