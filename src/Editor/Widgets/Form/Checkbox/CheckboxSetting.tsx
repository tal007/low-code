/*
 * @Date: 2022-10-14 10:38:01
 * @LastEditTime: 2023-05-22 13:33:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
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
import { hidden, layout } from "@/SettingPanelSchema/settingRender/common";
import { dataSourceRender } from "@/SettingPanelSchema/settingRender/dataSource";
import { styleSettings } from "../../Common/StyleContainer";
import {
  formItemExtra,
  formItemName,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import {
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([formItemName, layout, formItemTooltip, formItemExtra]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
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
