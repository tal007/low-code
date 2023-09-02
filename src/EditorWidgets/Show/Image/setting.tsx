/*
 * @Date: 2022-10-26 13:55:48
 * @LastEditTime: 2023-05-19 13:59:06
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import { createSchema } from "@/SettingPanelSchema";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { marginAndPaddingRender } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "InputSchema",
      {
        label: ["src", { ns: "editorWidget" }],
        isRequired: true,
      },
      "src"
    ),
    createSchema(
      "UploadSchema",
      { label: ["src", { ns: "editorWidget" }] },
      "uploadSrc"
    ),
    createSchema(
      "InputSchema",
      { label: ["alt", { ns: "editorWidget" }] },
      "alt"
    ),
    createSchema(
      "SwitchSchema",
      { label: ["preview", { ns: "editorWidget" }] },
      "preview"
    ),
  ]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...marginAndPaddingRender(),
};

export const ImageSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style", "events"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: SettingProvider(
          {}
        ),
      }}
    />
  );
};
