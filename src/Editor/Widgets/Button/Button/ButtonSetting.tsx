/*
 * @Date: 2022-10-24 09:50:33
 * @LastEditTime: 2023-05-04 11:08:03
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
import { disabled, hidden } from "@/SettingPanelSchema/settingRender/common";
import { useTranslation } from "react-i18next";
import { marginAndPaddingRender } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";
import { styleSettings } from "../../Common/StyleContainer";

const shapeMapData: Enum[] = [
  { label: "antdPropDesc.default", value: "default" },
  { label: "antdPropDesc.circle", value: "circle" },
  { label: "antdPropDesc.round", value: "round" },
];

const sizeMapData: Enum[] = [
  { label: "antdPropDesc.small", value: "small" },
  { label: "antdPropDesc.middle", value: "middle" },
  { label: "antdPropDesc.large", value: "large" },
];

const typeMapData: Enum[] = [
  { label: "antdPropDesc.primary", value: "primary", translate: true },
  { label: "antdPropDesc.ghost", value: "ghost", translate: true },
  { label: "antdPropDesc.dashed", value: "dashed", translate: true },
  { label: "antdPropDesc.link", value: "link", translate: true },
  { label: "antdPropDesc.text", value: "text", translate: true },
  { label: "antdPropDesc.default", value: "default", translate: true },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema("InputSchema", "antdButtonProps.name", "name"),
    createSchema("IconSelectSchema", "antdButtonProps.icon", "icon"),
    createSchema(
      "SwitchSchema",
      {
        label: "antdButtonProps.block",
        showQuestionIcon: true,
        questionPopover: () => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { t } = useTranslation();
          return <>{t("antdButtonProps.blockNotWork")}</>;
        },
      },
      "block"
    ),
    createSchema("SwitchSchema", "antdButtonProps.danger", "danger"),
    createSchema("SwitchSchema", "antdButtonProps.ghost", "ghost"),
    createSchema(
      "RadioGroupSchema",
      {
        label: "antdButtonProps.shape",
        direction: "column",
      },
      "shape",
      {
        mapData: shapeMapData,
      }
    ),
    createSchema("RadioGroupSchema", "antdButtonProps.size", "size", {
      mapData: sizeMapData,
    }),
    createSchema("SelectSchema", "antdButtonProps.type", "type", {
      mapData: typeMapData,
    }),
  ]),
  ...statusRender([hidden, disabled]),
};

const styleSetting: SettingProviderProps = {
  ...marginAndPaddingRender(),
  ...styleSettings,
};

export const ButtonSetting = () => {
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
          <EventHandler
            actionTypes={["click" /*, "mouseEnter", "mouseLeave" */]}
          />
        ),
      }}
    />
  );
};
