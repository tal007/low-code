/*
 * @Date: 2022-12-29 13:59:55
 * @LastEditTime: 2023-01-04 14:57:11
 * @LastEditors: 刘玉田
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

const directionMapData: Enum[] = [
  { label: "direction.horizontal", value: "horizontal" },
  { label: "direction.vertical", value: "vertical" },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "RadioGroupSchema",
      {
        label: ["direction", { ns: "editorWidget" }],
      },
      "direction",
      {
        mapData: directionMapData,
      }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["wrap", { ns: "editorWidget" }],
      },
      "wrap",
      {},
      {
        hidden: props => props["direction"] === "vertical",
      }
    ),
    createSchema(
      "InputNumberSchema",
      {
        label: ["size", { ns: "editorWidget" }],
      },
      "size",
      { min: 0 }
    ),
  ]),
  ...statusRender([hidden]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const SpaceSetting = () => {
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
