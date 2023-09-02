/*
 * @Date: 2022-10-27 10:37:58
 * @LastEditTime: 2023-05-22 11:29:22
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { createSchema } from "..";
import { SettingProviderProps } from "../SettingProvider";

export interface MarginAndPadding {
  marginAndPadding: {
    margin: string[];
    padding: string[];
  };
}

export const marginAndPaddingDefault = {
  marginAndPadding: {
    margin: ["", "", "", ""],
    padding: ["", "", "", ""],
  },
};

export const marginAndPaddingRender = (): SettingProviderProps => {
  return {
    marginAndPadding: {
      header: ["marginAndPadding", { ns: "style" }],
      children: [
        createSchema("MarginAndPaddingSchema", "", "marginAndPadding"),
      ],
    },
  };
};
