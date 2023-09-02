/*
 * @Date: 2022-10-10 14:10:13
 * @LastEditTime: 2023-05-22 11:19:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { Segmented } from "@/component/Segmented";
import { useTranslation } from "react-i18next";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { styleSettings } from "../../Common/StyleContainer";

const propsSetting: SettingProviderProps = {};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const RootSettings = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style", "events"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: () => (
          <EventHandler actionTypes={["load"]} />
        ),
      }}
    />
  );
};
