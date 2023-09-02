/*
 * @Date: 2022-10-26 15:19:09
 * @LastEditTime: 2023-05-04 10:49:57
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 圆角
 */

import { createSchema } from "..";
import { SettingProviderProps } from "../SettingProvider";

export interface BorderRadius {
  borderRadius: {
    all: {
      open: boolean;
      value: number;
    };
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
}

export const borderRadiusDefault = {
  borderRadius: {
    all: {
      open: true,
      value: 0,
    },
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  },
};

export const setBorderRadiusStyle = (borderRadius: BorderRadius) => {
  const { all, topLeft, topRight, bottomLeft, bottomRight } =
    borderRadius.borderRadius;

  const borderRadiusStyle: React.CSSProperties = {};

  if (all.open) {
    borderRadiusStyle.borderRadius = all.value;
  } else {
    borderRadiusStyle.borderTopLeftRadius = topLeft;
    borderRadiusStyle.borderTopRightRadius = topRight;
    borderRadiusStyle.borderBottomLeftRadius = bottomLeft;
    borderRadiusStyle.borderBottomRightRadius = bottomRight;
  }

  return borderRadiusStyle;
};

export const BorderRadiusRender = (): SettingProviderProps => {
  return {
    BorderRadius: {
      header: "propSettingHeader.borderRadius",
      children: [createSchema("BorderRadiusSchema", "", "borderRadius")],
    },
  };
};
