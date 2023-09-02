/*
 * @Date: 2022-10-13 16:54:54
 * @LastEditTime: 2023-05-16 10:22:31
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 设置
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import {
  basePlaceholderSetting,
  required,
  vertical,
} from "@/SettingPanelSchema/settingRender/common";
const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    createSchema(
      "DefaultValueInputSchema",
      {
        label: "antdPropDesc.defaultValue",
        direction: "column",
      },
      "defaultValue"
    ),
    vertical,
    required,
  ]),
};

export const InputTextSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        // [t("rightPanel.segmented.style", {ns: "editor"})]: SettingProvider(styleSetting),
        // [t("rightPanel.segmented.events", {ns: "editor"})]: () => (
        //   <EventHandler actionTypes={["change"]} />
        // ),
      }}
    />
  );
};
