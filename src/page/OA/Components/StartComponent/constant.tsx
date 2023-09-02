/*
 * @Date: 2023-05-15 16:55:44
 * @LastEditTime: 2023-05-19 12:28:02
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 流程设计常量
 */
import { Enum } from "@/SettingPanelSchema/Select";

export const StartRadioOptions: Partial<Enum>[] = [
  { label: "start.basicSettings", value: "basic" },
  { label: "common.formPermission", value: "formAuth" },
];
export const StartBaseSelectOptions: Partial<Enum>[] = [
  { label: "start.allMember", value: "allUser" },
  { label: "start.someMember", value: "assignUser" },
  { label: "start.notSubmit", value: "null" },
];
