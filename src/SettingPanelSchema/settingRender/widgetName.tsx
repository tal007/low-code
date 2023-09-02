/*
 * @Date: 2022-10-18 15:12:33
 * @LastEditTime: 2022-10-18 17:38:49
 * @LastEditors: 刘玉田
 * @Description: 组件名字修改
 */

import { createSchema } from "..";

export interface WidgetName {
  displayName: string;
}

export const createWidgetName = () =>
  createSchema(
    "InputSchema",
    {
      label: "组件名",
      isRequired: true,
    },
    "custom.displayName"
  );
