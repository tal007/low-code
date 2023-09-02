/*
 * @Date: 2022-09-27 14:30:44
 * @LastEditTime: 2022-12-29 16:40:49
 * @LastEditors: 刘玉田
 * @Description: 工具函数
 */

import { RGBColor } from "react-color";

export const generateWidgetOptions = (
  widgetName: string,
  widgetGroup: string
) => {
  return {
    renderName: widgetName,
    name: `editor.widget.${widgetGroup}.${widgetName}.name`,
    description: `editor.widget.${widgetGroup}.${widgetName}.description`,
    docLink: "",
  };
};

export const widgetIsContainer = (tags: string[]): boolean => {
  return tags.includes("container");
};

/*******
 * @description: 将color选择器选择出来的color转换为 rgba string
 * @param {RGBColor} color RGBColor
 * @return {*} rgba color
 */
export const toColorString = (color: RGBColor): string => {
  return `rgba(${Object.values(color)})` as string;
};
