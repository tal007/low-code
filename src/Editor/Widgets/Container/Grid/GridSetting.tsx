/*
 * @Date: 2022-10-18 09:13:10
 * @LastEditTime: 2023-05-22 11:38:21
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { Segmented } from "@/component/Segmented";
import { createSchema } from "@/SettingPanelSchema";
import { flexAlignRender } from "@/SettingPanelSchema/settingRender/flexAlign";

const gutters: Record<string, number> = {};
const vgutters: Record<string, number> = {};
const colCounts: Record<string, number> = {};

[0, 8, 16, 24, 32, 40, 48].forEach((value, i) => {
  gutters[i] = value;
});
[0, 8, 16, 24, 32, 40, 48].forEach((value, i) => {
  vgutters[i] = value;
});
[1, 2, 3, 4, 6, 8, 12].forEach((value, i) => {
  colCounts[i] = value;
});

const createColCount = (label: string, propName: string) =>
  createSchema(
    "SliderSchema",
    {
      label: [label, { ns: "style" }],
      direction: "column",
    },
    propName,
    {
      marks: colCounts,
      step: null,
      max: Object.keys(colCounts).length - 1,
      min: 0,
      tooltip: { formatter: (value: number) => colCounts[value] },
    }
  );

const basicSetting: SettingProviderProps = {
  row: {
    header: "propSettingHeader.rowSetting",
    children: [
      createSchema(
        "SliderSchema",
        {
          label: ["rowSpace", { ns: "style" }],
          direction: "column",
        },
        "horizontalGutter",
        {
          marks: gutters,
          step: null,
          max: Object.keys(gutters).length - 1,
          min: 0,
          tooltip: { formatter: (value: number) => gutters[value] },
        }
      ),
      createSchema(
        "SliderSchema",
        {
          label: ["columnSpace", { ns: "style" }],
          direction: "column",
        },
        "verticalGutter",
        {
          marks: vgutters,
          step: null,
          max: Object.keys(vgutters).length - 1,
          min: 0,
          tooltip: { formatter: (value: number) => vgutters[value] },
        }
      ),
      ...flexAlignRender("", "rowAlign", "columnAlign").flexAlign.children,
    ],
  },
  col: {
    header: "propSettingHeader.columnSetting",
    children: [],
  },
  colCount: {
    header: "propSettingHeader.rowCount",
    children: [
      createColCount("xs", "xs"),
      createColCount("sm", "sm"),
      createColCount("md", "md"),
      createColCount("lg", "lg"),
      createColCount("xl", "xl"),
      createColCount("xxl", "xxl"),
    ],
  },
};

const styleSetting: SettingProviderProps = {};

export const GridSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(basicSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
      }}
    />
  );
};
