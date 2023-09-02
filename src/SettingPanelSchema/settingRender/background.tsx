/*
 * @Date: 2022-10-24 11:26:24
 * @LastEditTime: 2022-12-29 16:49:03
 * @LastEditors: 刘玉田
 * @Description:
 */

import { toColorString } from "@/Editor/Widgets/helper";
import { RGBColor } from "react-color";
import { createSchema } from "..";
import { BackgroundType } from "../Background";
import { SettingProviderProps } from "../SettingProvider";

export interface Background {
  background: {
    bgType: BackgroundType;
    color: RGBColor;
    linear: {
      start: RGBColor;
      end: RGBColor;
      angle: number;
      custom: string;
    };
    image: string;
  };
}

export const backgroundDefault = {
  background: {
    bgType: "notSet" as BackgroundType,
    color: { r: 255, g: 255, b: 255, a: 1 },
    linear: {
      start: { r: 0, g: 0, b: 0, a: 1 },
      end: { r: 255, g: 255, b: 255, a: 1 },
      angle: 180,
      custom: "",
    },
    image: "",
  },
};

export const setBackground = (background: Background) => {
  const { bgType, color, linear, image } = background.background;

  const style: React.CSSProperties = {};
  let backgroundValue: boolean | string = false;

  switch (bgType) {
    case "notSet":
      backgroundValue = false;
      break;
    case "color":
      backgroundValue = toColorString(color);
      break;
    case "linear": {
      if (linear.custom) {
        backgroundValue = linear.custom;
      } else {
        backgroundValue = `linear-gradient(${
          linear.angle
        }deg, rgba(${Object.values(linear.start)}), rgba(${Object.values(
          linear.end
        )}))`;
      }
      break;
    }
    case "image":
      backgroundValue = `url(${image})`;
      break;
    default:
      backgroundValue = false;
      break;
  }

  if (backgroundValue) style["background"] = backgroundValue;

  return style;
};

export const backgroundRenderer = (): SettingProviderProps => {
  return {
    background: {
      header: "propSettingHeader.background",
      children: [createSchema("BackgroundSchema", "", "background")],
    },
  };
};
