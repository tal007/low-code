/*
 * @Date: 2022-10-17 13:37:15
 * @LastEditTime: 2023-05-16 11:12:26
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
import {
  basePlaceholderSetting,
  required,
  vertical,
} from "@/SettingPanelSchema/settingRender/common";

const propsSetting: SettingProviderProps = {
  ...basicRender([basePlaceholderSetting, required, vertical]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const IDNumberSetting = () => {
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
