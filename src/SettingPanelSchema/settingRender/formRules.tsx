/*
 * @Date: 2022-12-20 15:22:47
 * @LastEditTime: 2023-05-23 11:21:54
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: form校验规则
 */

import { Rule } from "antd/es/form";
import { merge } from "lodash";
import { createSchema } from "..";
import { Enum } from "../Select";

// TODO 这里 设置 type 浏览器控制台好报警告，无从解决
export const setRulesDefault = (rules?: Rule): { formRules: Rule } => {
  return { formRules: merge({ required: false }, rules) };
};

const types: Enum[] = [
  {
    translate: true,
    label: ["typeNames.string", { ns: "formRules" }],
    value: "string",
  },
  {
    translate: true,
    label: ["typeNames.method", { ns: "formRules" }],
    value: "method",
  },
  {
    translate: true,
    label: ["typeNames.array", { ns: "formRules" }],
    value: "array",
  },
  {
    translate: true,
    label: ["typeNames.object", { ns: "formRules" }],
    value: "object",
  },
  {
    translate: true,
    label: ["typeNames.number", { ns: "formRules" }],
    value: "number",
  },
  {
    translate: true,
    label: ["typeNames.date", { ns: "formRules" }],
    value: "date",
  },
  {
    translate: true,
    label: ["typeNames.boolean", { ns: "formRules" }],
    value: "boolean",
  },
  {
    translate: true,
    label: ["typeNames.integer", { ns: "formRules" }],
    value: "integer",
  },
  {
    translate: true,
    label: ["typeNames.float", { ns: "formRules" }],
    value: "float",
  },
  {
    translate: true,
    label: ["typeNames.regexp", { ns: "formRules" }],
    value: "regexp",
  },
  {
    translate: true,
    label: ["typeNames.email", { ns: "formRules" }],
    value: "email",
  },
  {
    translate: true,
    label: ["typeNames.url", { ns: "formRules" }],
    value: "url",
  },
  {
    translate: true,
    label: ["typeNames.hex", { ns: "formRules" }],
    value: "hex",
  },
];
export const ruleRequired = createSchema(
  "SwitchSchema",
  { label: ["required", { ns: "formRules" }] },
  "formRules.required"
);

export const ruleType = createSchema(
  "SelectSchema",
  { label: ["type", { ns: "formRules" }] },
  "formRules.type",
  {
    mapData: types,
  }
);

export const ruleMax = createSchema(
  "InputNumberSchema",
  { label: ["max", { ns: "formRules" }] },
  "formRules.max"
);

export const ruleMin = createSchema(
  "InputNumberSchema",
  { label: ["min", { ns: "formRules" }] },
  "formRules.min"
);
