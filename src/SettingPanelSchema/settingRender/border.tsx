/*
 * @Date: 2022-10-26 15:18:59
 * @LastEditTime: 2023-05-04 10:50:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 边框
 */

import { createSchema } from "..";
import { BorderConfig } from "../Border";
import { SettingProviderProps } from "../SettingProvider";

export interface Border {
  border: {
    [key: string]: BorderConfig;
  };
}

export const borderDefault = {
  border: {},
};

export const setBorderStyle = (border: Border) => {
  const { top, left, right, bottom, all } = border.border;
  const borderStyle: React.CSSProperties = {};

  const setStyle = (value: BorderConfig, key: string) => {
    const defaultColor =
      key === "border"
        ? { r: 0, g: 0, b: 0, a: 1 }
        : all?.color
        ? all?.color
        : { r: 0, g: 0, b: 0, a: 1 };
    const defaultWidth = key === "border" ? 0 : all?.width ? all?.width : 0;
    const defaultType =
      key === "border" ? "solid" : all?.type ? all?.type : "solid";
    if (value) {
      const {
        color = defaultColor,
        width = defaultWidth,
        type = defaultType,
      } = value;

      borderStyle[key] = `${width}px rgba(${Object.values(color)}) ${type}`;
    }
  };

  setStyle(all, "border");
  setStyle(top, "borderTop");
  setStyle(left, "borderLeft");
  setStyle(right, "borderRight");
  setStyle(bottom, "borderBottom");

  return borderStyle;
};

export const borderRender = (): SettingProviderProps => {
  return {
    border: {
      header: "propSettingHeader.border",
      children: [createSchema("BorderSchema", "", "border")],
    },
  };
};
