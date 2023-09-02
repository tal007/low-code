/*
 * @Date: 2022-12-21 09:12:54
 * @LastEditTime: 2023-01-04 16:22:29
 * @LastEditors: 刘玉田
 * @Description: 验证码设置
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
} from "@/SettingPanelSchema/settingRender/fieldProps";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    formItemName,
    createSchema(
      "InputSchema",
      {
        label: "captcha.phoneName",
        isRequired: true,
      },
      "formItemProps.phoneName"
    ),
    placeholder,
    formItemTooltip,
    formItemExtra,
  ]),
  ...formItemRulesRender([]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const CaptchaSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
      }}
    />
  );
};
