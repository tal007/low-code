/*
 * @Date: 2022-10-14 10:24:29
 * @LastEditTime: 2023-05-16 11:14:46
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { styleSettings } from "../../Common/StyleContainer";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { createSchema } from "@/SettingPanelSchema";
import {
  basePlaceholderSetting,
  required,
  vertical,
} from "@/SettingPanelSchema/settingRender/common";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    createSchema(
      "DefaultValueInputSchema",
      {
        label: "antdPropDesc.defaultValue",
        direction: "column",
      },
      "defaultValue"
    ),
    required,
    vertical,
  ]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const TextAreaSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: () => (
          <EventHandler actionTypes={["change"]} />
        ),
      }}
    />
  );
};
