/*
 * @Date: 2022-10-25 09:12:34
 * @LastEditTime: 2023-05-08 13:53:37
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { styleSettings } from "../../Common/StyleContainer";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { required, vertical } from "@/SettingPanelSchema/settingRender/common";
import { pickerTypeMapData } from "../DatePicker/hooks";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    required,
    vertical,
    createSchema(
      "SelectSchema",
      {
        label: ["rightPanel.i18n.dateType", { ns: "editor" }],
        direction: "column",
      },
      "type",
      {
        mapData: pickerTypeMapData,
      }
    ),
  ]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const DateRangePickerSetting = () => {
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
