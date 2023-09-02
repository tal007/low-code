/*
 * @Date: 2023-05-09 15:22:10
 * @LastEditTime: 2023-05-22 10:38:30
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 默认值单选框枚举常量
 */
import { Enum } from "../Select";
export const radioOptions: Enum[] = [
  {
    label: ["rightPanel.i18n.custom", { ns: "editor" }],
    value: "custom",
  },
  {
    label: ["rightPanel.i18n.dataLinkage", { ns: "editor" }],
    value: "dataLink",
  },
  {
    label: ["rightPanel.i18n.formulaEditing", { ns: "editor" }],
    value: "formula",
  },
];
