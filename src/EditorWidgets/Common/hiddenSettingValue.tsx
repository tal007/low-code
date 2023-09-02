/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-17 15:20:14
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-17 15:24:23
 * @Description: 在右侧面板中隐藏的属性
 */
import { nanoid } from "@/utils/helper";
import { merge } from "lodash";

export const hiddenSettingValue = (custom?: { [key: string]: any }) => {
  return merge(
    {
      id: nanoid(10),
      value: "",
    },
    custom
  );
};
