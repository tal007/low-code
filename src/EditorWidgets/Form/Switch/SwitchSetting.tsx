/*
 * @Date: 2022-12-19 15:27:54
 * @LastEditTime: 2023-05-12 14:49:59
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
import {
  basicRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { styleSettings } from "../../Common/StyleContainer";
import { createSchema } from "@/SettingPanelSchema";
import {
  formItemExtra,
  formItemTooltip,
} from "@/SettingPanelSchema/settingRender/formItemProps";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "SwitchSchema",
      "antdPropDesc.defaultChecked",
      "fieldProps.defaultChecked"
    ),
    createSchema(
      "InputSchema",
      "antdPropDesc.checkedChildren",
      "fieldProps.checkedChildren"
    ),
    createSchema(
      "InputSchema",
      "antdPropDesc.unCheckedChildren",
      "fieldProps.unCheckedChildren"
    ),
    formItemTooltip,
    formItemExtra,
  ]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const SwitchSetting = () => {
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
