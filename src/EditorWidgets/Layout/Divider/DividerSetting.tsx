/*
 * @Date: 2022-12-23 14:12:57
 * @LastEditTime: 2023-05-19 13:57:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { basicRender, statusRender } from "@/SettingPanelSchema/settingRender";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import { useTranslation } from "react-i18next";
import { styleSettings } from "../../Common/StyleContainer";

const orientationMapData: Enum[] = [
  { label: "direction.left", value: "left" },
  { label: "direction.center", value: "center" },
  { label: "direction.right", value: "right" },
];
const typeMapData: Enum[] = [
  { label: "direction.horizontal", value: "horizontal" },
  { label: "direction.vertical", value: "vertical" },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "RadioGroupSchema",
      { label: ["type", { ns: "editorWidget" }] },
      "type",
      {
        mapData: typeMapData,
      }
    ),
    createSchema(
      "InputSchema",
      "common.title",
      "children",
      {},
      {
        hidden: props => props["type"] === "vertical",
      }
    ),
    createSchema(
      "SwitchSchema",
      { label: ["plain", { ns: "editorWidget" }] },
      "plain",
      {},
      {
        hidden: props => props["type"] === "vertical" || !props["children"],
      }
    ),
    createSchema(
      "SwitchSchema",
      { label: ["dashed", { ns: "editorWidget" }] },
      "dashed"
    ),
    createSchema(
      "RadioGroupSchema",
      "divider.orientation",
      "orientation",
      {
        mapData: orientationMapData,
      },
      {
        hidden: props => props["type"] === "vertical",
      }
    ),
  ]),
  ...statusRender([hidden]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const DividerSetting = () => {
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
