/*
 * @Date: 2022-12-29 14:42:42
 * @LastEditTime: 2023-05-19 13:51:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import { createSchema } from "@/SettingPanelSchema";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { basicRender, statusRender } from "@/SettingPanelSchema/settingRender";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import { useTranslation } from "react-i18next";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { styleSettings } from "../../Common/StyleContainer";
import { fontRender } from "@/SettingPanelSchema/settingRender/font";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "InputNumberSchema",
      { label: ["value", { ns: "editorWidget" }] },
      "value"
    ),
    createSchema(
      "InputSchema",
      { label: ["title", { ns: "editorWidget" }] },
      "title"
    ),
    createSchema(
      "IconSelectSchema",
      {
        label: ["prefix", { ns: "editorWidget" }],
        direction: "column",
      },
      "prefix"
    ),
    createSchema(
      "InputSchema",
      { label: ["suffix", { ns: "editorWidget" }] },
      "suffix"
    ),
  ]),
  ...statusRender([hidden]),
};

const styleSetting: SettingProviderProps = {
  ...fontRender(
    ["color", "fontFamily", "fontSize", "fontStyle", "textAlign"],
    "font"
  ),
  ...styleSettings,
};

export const StatisticSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style", "events"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]: SettingProvider(
          propsSetting,
          false
        ),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: () => (
          <EventHandler actionTypes={["click", "mouseEnter", "mouseLeave"]} />
        ),
      }}
    />
  );
};
