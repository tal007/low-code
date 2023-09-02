/*
 * @Date: 2022-10-14 09:43:48
 * @LastEditTime: 2023-05-22 16:02:09
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import { Segmented } from "@/component/Segmented";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { useTranslation } from "react-i18next";
import { styleSettings } from "../../Common/StyleContainer";
import { createSchema } from "@/SettingPanelSchema";
import {
  basePlaceholderSetting,
  flat,
  required,
  vertical,
} from "@/SettingPanelSchema/settingRender/common";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    required,
    vertical,
    flat,
    createSchema(
      "SwitchSchema",
      { label: ["rightPanel.i18n.itemVertical", { ns: "editor" }] },
      "itemVertical",
      {},
      {
        hidden: (props: any) => !props["flat"],
      }
    ),
    createSchema(
      "DataSourceSchema",
      {
        label: "",
        direction: "column",
      },
      "dataSource"
    ),
  ]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const RadioSetting = () => {
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
          <EventHandler actionTypes={["change"]} />
        ),
      }}
    />
  );
};
