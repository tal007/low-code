/*
 * @Date: 2022-09-23 10:03:29
 * @LastEditTime: 2023-05-23 17:42:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 工具类函数
 */

import { customAlphabet } from "nanoid";

// 自定义的规则
const urlAlphabet =
  "useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict";
export const nanoid = (size = 10) => customAlphabet(urlAlphabet, size)();

// 判断是否是对象
export const isObject = (obj: any): boolean => {
  return typeof obj === "object";
};

// 获取数组中的不同项
export const getArrDifference = <T>(arr1: T[], arr2: T[] | undefined): T[] => {
  return arr1.filter(e => !arr2?.some(v => e === v));
};

// 设置 antd table pro body 高度
export const getTableProBodyHeight = (element: HTMLElement) => {
  const antdBody = element.querySelector(".ant-table-body");
  const { top } = antdBody.getBoundingClientRect();
  // 底部分页按钮 56px 346 = 436 - 90
  return `calc(100vh - ${top + 80}px)`;
};

export const getVersion = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return __Admin_VERSION__ as string;
};

export const fillDate = date => {
  return Number(date) < 10 ? `0${date}` : date;
};
