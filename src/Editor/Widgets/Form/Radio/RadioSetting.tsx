/*
 * @Date: 2022-10-14 09:43:48
 * @LastEditTime: 2023-01-05 11:06:59
 * @LastEditors: 刘玉田
 * @Description:
 */
import { Segmented } from "@/component/Segmented";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import {
  basicRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { hidden, layout } from "@/SettingPanelSchema/settingRender/common";
import { dataSourceRender } from "@/SettingPanelSchema/settingRender/dataSource";
import {
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import {
  formItemExtra,
  formItemName,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import { useTranslation } from "react-i18next";
import { styleSettings } from "../../Common/StyleContainer";

const propsSetting: SettingProviderProps = {
  ...basicRender([formItemName, layout, formItemTooltip, formItemExtra]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
  ...dataSourceRender(),
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
