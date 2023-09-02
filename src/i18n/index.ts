/*
 * @Date: 2022-09-26 11:10:01
 * @LastEditTime: 2023-05-18 16:04:46
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 多语言处理
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "./resources";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // 其他语言加载失败采用的默认方案
    // fallbackLng: "zh-CN",
    lng: "zh-CN",
    debug: true,
    ns: Object.keys(resources["zh-CN"]),
    defaultNS: Object.keys(resources["zh-CN"]),
    resources: resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
