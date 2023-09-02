/*
 * @Date: 2023-04-24 10:46:10
 * @LastEditTime: 2023-05-19 11:07:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 省市区组件内部常量
 */
import { Enum } from "@/SettingPanelSchema/Select";
export const formatOptions: Enum[] = [
  {
    label: ["form.ProvinceCity.formatCity", { ns: "editorWidget" }],
    value: "City",
  },
  {
    label: ["form.ProvinceCity.formatArea", { ns: "editorWidget" }],
    value: "Area",
  },
  {
    label: ["form.ProvinceCity.formatTown", { ns: "editorWidget" }],
    value: "Town",
  },
];
