/*
 * @Date: 2022-10-19 10:05:02
 * @LastEditTime: 2023-01-05 11:08:12
 * @LastEditors: 刘玉田
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import {
  basicRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { dataSourceRender } from "@/SettingPanelSchema/settingRender/dataSource";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";
import { styleSettings } from "../../Common/StyleContainer";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  formItemExtra,
  formItemName,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import {
  disabled,
  readOnly,
  placeholder,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([formItemName, placeholder, formItemTooltip, formItemExtra]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
  ...dataSourceRender(),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const SelectSetting = () => {
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
