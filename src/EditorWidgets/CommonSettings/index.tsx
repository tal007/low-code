/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-08 09:27:59
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-16 11:16:09
 * @Description:
 */
/**
 * @author 梁强
 * @date 2023-05-06 星期六
 * @function common settings
 * @param {}
 * @return {}
 */
import { createSchema } from "@/SettingPanelSchema";
import { RadioGroupChildProps } from "@/SettingPanelSchema/RadioGroup";
import { SettingProviderProps } from "@/SettingPanelSchema/SettingProvider";

export const ColSpan: RadioGroupChildProps[] = [
  {
    label: "1/4",
    value: (24 * 1) / 4,
    translate: false,
  },
  {
    label: "1/3",
    value: (24 * 1) / 3,
    translate: false,
  },
  {
    label: "1/2",
    value: (24 * 1) / 2,
    translate: false,
  },
  {
    label: "2/3",
    value: (24 * 2) / 3,
    translate: false,
  },
  {
    label: "3/4",
    value: (24 * 3) / 4,
    translate: false,
  },
  {
    label: "1",
    value: 24,
    translate: false,
  },
];

export const commonWidthRadioGroupSchema = createSchema(
  "RadioGroupSchema",
  {
    label: ["ColSpan", { ns: "style" }],
    direction: "column",
  },
  "colSpan",
  {
    defaultValue: 24,
    mapData: ColSpan,
  }
);

export const rewriteSettingProviderField = (settings: SettingProviderProps) => {
  if (!settings?.basic) {
    return settings;
  }

  const {
    basic: { header = "", children = [] },
  } = settings;

  if (children.some(item => item.childProps.propName === "colSpan")) {
    return settings;
  }

  return {
    basic: {
      header,
      children: [...children, commonWidthRadioGroupSchema],
    },
  };
};

export const hasGridContainer = (tags: string[], key: string) =>
  (tags || [])?.includes(key);
