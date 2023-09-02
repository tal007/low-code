/*
 * @Date: 2022-10-10 11:25:56
 * @LastEditTime: 2023-05-04 11:00:42
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 配置
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { fontRender } from "@/SettingPanelSchema/settingRender/font";
import { marginAndPaddingRender } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { useTranslation } from "react-i18next";

const styleSetting: SettingProviderProps = {
  ...fontRender(),
  ...marginAndPaddingRender(),
  color: {
    header: "propSettingHeader.color",
    children: [
      {
        component: "InputColorSchema",
        parentProps: {
          label: "antdPropDesc.backgroundColor",
        },
        childProps: {
          propName: "backgroundColor",
        },
      },
    ],
  },
};

export const TextSettings = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["style", "events"]}
      renderMap={{
        // [t("rightPanel.segmented.props", {ns: "editor"})]: SettingProvider(propsSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: SettingProvider(
          {}
        ),
      }}
    />
  );
};
