/*
 * @Date: 2023-05-17 14:53:00
 * @LastEditTime: 2023-05-19 17:04:48
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 常量
 */
import { Enum } from "@/SettingPanelSchema/Select";
import { CheckboxOptionType } from "antd";

export const memberTypeOptions: CheckboxOptionType[] = [
  { label: "start.gatt", value: "gatt" },
  { label: "start.role", value: "role" },
  { label: "start.post", value: "post" },
];
export const roleTreeData: Partial<Enum>[] = [
  {
    name: "后勤处审批人",
    id: "role-child-1",
    type: "role",
    checked: false,
  },
  {
    name: "团委工作人员",
    id: "role-child-2",
    type: "role",
    checked: false,
  },
];
export const postTreeData: Partial<Enum>[] = [
  {
    name: "学院副书记",
    id: "post-child-1",
    type: "post",
    checked: false,
  },
  {
    name: "教学秘书",
    id: "post-child-2",
    type: "post",
    checked: false,
  },
];
