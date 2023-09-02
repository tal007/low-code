/*
 * @Date: 2022-10-13 16:54:54
 * @LastEditTime: 2023-01-05 11:04:26
 * @LastEditors: 刘玉田
 * @Description: 设置
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";
import {
  basicRender,
  formItemRulesRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { styleSettings } from "../../Common/StyleContainer";
import { createSchema } from "@/SettingPanelSchema";
import {
  formItemName,
  formItemExtra,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  placeholder,
  disabled,
  readOnly,
  showCount,
  maxLength,
  allowClear,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import {
  ruleMax,
  ruleType,
} from "@/SettingPanelSchema/settingRender/formRules";
import { ruleMin } from "./../../../../SettingPanelSchema/settingRender/formRules";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    formItemName,
    createSchema("SwitchSchema", "common.passwordInput", "password"),
    showCount,
    maxLength,
    allowClear,
    placeholder,
    formItemTooltip,
    formItemExtra,
  ]),
  ...formItemRulesRender([ruleType, ruleMax, ruleMin]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const InputTextSetting = () => {
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
