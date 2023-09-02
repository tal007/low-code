/*
 * @Date: 2022-10-19 13:43:59
 * @LastEditTime: 2023-05-18 16:18:54
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 */

import i18n from "@/i18n";

import zhCN from "./zh-CN/editorWidget.json";

// const keys = Object.values(zhCN.editor.widget).map((item) => {
//   return Object.keys(item).map(key => key)
// }).flat(1)

// console.log(keys)

const widgetDisplayNames = {};
const fillMatchLanguageName = (language, data) => {
  Object.values(data).forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      widgetDisplayNames[key] = {};
      widgetDisplayNames[key][language] = value.name;
      widgetDisplayNames[key]["en"] = "";
    });
  });
};

fillMatchLanguageName("zh-CN", zhCN);

export const displayName = (name: string) =>
  widgetDisplayNames[name][i18n.language];
