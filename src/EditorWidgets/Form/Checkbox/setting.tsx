/*
 * @Date: 2022-10-14 10:38:01
 * @LastEditTime: 2023-05-23 16:02:59
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
import {
  basePlaceholderSetting,
  flat,
  required,
  vertical,
} from "@/SettingPanelSchema/settingRender/common";
import { dataSourceRender } from "@/SettingPanelSchema/settingRender/dataSource";
import { styleSettings } from "../../Common/StyleContainer";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { createSchema } from "@/SettingPanelSchema";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    vertical,
    required,
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
  ...dataSourceRender(),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const CheckboxSetting = () => {
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
