/*
 * @Date: 2022-11-21 15:52:48
 * @LastEditTime: 2023-05-04 10:43:43
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTranslation } from "react-i18next";

// 扩展全局变量 类型 等等
declare global {
  const React: typeof React;
  const useTranslation: typeof useTranslation;
  type KeyValueObject = { [key: string]: any };
}

// 声明全局类型
declare type KeyValueObject = { [key: string]: any };
