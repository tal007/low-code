/*
 * @Date: 2022-10-14 10:24:29
 * @LastEditTime: 2023-01-05 11:12:15
 * @LastEditors: 刘玉田
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import {
  basicRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { styleSettings } from "../../Common/StyleContainer";
import {
  formItemName,
  formItemTooltip,
  formItemExtra,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import {
  maxLength,
  showCount,
  allowClear,
  placeholder,
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    formItemName,
    showCount,
    maxLength,
    allowClear,
    placeholder,
    formItemTooltip,
    formItemExtra,
  ]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const TextAreaSetting = () => {
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
