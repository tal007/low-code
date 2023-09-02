/*
 * @Date: 2023-05-15 16:55:44
 * @LastEditTime: 2023-05-17 12:27:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 流程设计常量
 */
import { Enum } from "@/SettingPanelSchema/Select";
import { colProps } from "./index.d";

export const StartRadioOptions: Enum[] = [
  { label: "基础设置", value: "basic" },
  { label: "表单权限", value: "formAuth" },
];
export const StartBaseSelectOptions: Enum[] = [
  { label: "全员", value: "allUser" },
  { label: "指定人员", value: "assignUser" },
  { label: "均不可提交", value: "null" },
];
export const formAuthTableColumns: colProps[] = [
  {
    title: "表单字段",
    dataIndex: "name",
    editable: false,
  },
  {
    title: "可编辑",
    dataIndex: "editable",
    editable: true,
  },
  {
    title: "只读",
    dataIndex: "readOnly",
    editable: true,
  },
  {
    title: "隐藏",
    dataIndex: "hide",
    editable: true,
  },
];
