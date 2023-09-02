/*
 * @Date: 2022-10-17 13:37:15
 * @LastEditTime: 2023-01-05 11:04:14
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
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  formItemExtra,
  formItemName,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import {
  disabled,
  max,
  min,
  readOnly,
  step,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    formItemName,
    max,
    min,
    step,
    formItemTooltip,
    formItemExtra,
  ]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const InputNumberSetting = () => {
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
