/*
 * @Date: 2023-05-04 11:07:50
 * @LastEditTime: 2023-05-16 10:15:36
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 自动计算组件设置
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { basePlaceholderSetting } from "@/SettingPanelSchema/settingRender/common";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    createSchema("InputNumberSchema", "antdPropDesc.precision", "precision"),
    createSchema("FormulaButtonSchema", "", "formula"),
    createSchema("SwitchSchema", "antdPropDesc.readOnly", "readOnly"),
    createSchema("SwitchSchema", "antdPropDesc.upperCase", "upperCase"),
    createSchema("SwitchSchema", "antdPropDesc.required", "required"),
  ]),
};
export const SettingComponent = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
      }}
    />
  );
};
