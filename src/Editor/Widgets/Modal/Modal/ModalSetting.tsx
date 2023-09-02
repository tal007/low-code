/*
 * @Date: 2023-01-16 15:48:06
 * @LastEditTime: 2023-05-04 11:02:35
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
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "SwitchSchema",
      { label: ["showTitle", { ns: "editorWidget" }] },
      "showTitle"
    ),
    createSchema(
      "InputSchema",
      { label: ["title", { ns: "editorWidget" }] },
      "title",
      {},
      {
        hidden: props => !props.showTitle,
      }
    ),
    createSchema(
      "InputSchema",
      { label: ["title", { ns: "editorWidget" }] },
      "title",
      {},
      {
        hidden: props => !props.showTitle,
      }
    ),
    createSchema(
      "InputSchema",
      { label: ["okText", { ns: "editorWidget" }] },
      "okText"
    ),
    createSchema(
      "InputSchema",
      { label: ["cancelText", { ns: "editorWidget" }] },
      "cancelText"
    ),
    createSchema(
      "SwitchSchema",
      { label: ["showFooter", { ns: "editorWidget" }] },
      "footer"
    ),
  ]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
};

export const ModalSetting = () => {
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
