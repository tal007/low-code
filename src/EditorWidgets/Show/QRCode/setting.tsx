/*
 * @Date: 2022-12-23 15:29:59
 * @LastEditTime: 2023-05-19 13:55:56
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import { createSchema } from "@/SettingPanelSchema";
import { RadioGroupChildProps } from "@/SettingPanelSchema/RadioGroup";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { basicRender, statusRender } from "@/SettingPanelSchema/settingRender";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import { QuestionProviderContainer } from "@/style";
import { Trans, useTranslation } from "react-i18next";
import { styleSettings } from "../../Common/StyleContainer";

const errorLevelMapData: RadioGroupChildProps[] = [
  { translate: false, label: "L", value: "L" },
  { translate: false, label: "M", value: "M" },
  { translate: false, label: "Q", value: "Q" },
  { translate: false, label: "H", value: "H" },
];

const StaticValueProvider = () => {
  const { t } = useTranslation();

  return (
    <QuestionProviderContainer>
      <Trans
        i18nKey="formatTip" // optional -> fallbacks to defaults if not provided
        defaults={t("staticValueProvider", { ns: "editorWidget" })} // optional defaultValue
        components={{
          1: <div />,
        }}
      />
    </QuestionProviderContainer>
  );
};

const QueryUrlProvider = () => {
  const { t } = useTranslation();

  return (
    <QuestionProviderContainer>
      <Trans
        i18nKey="formatTip" // optional -> fallbacks to defaults if not provided
        defaults={t("queryUrlProvider", { ns: "editorWidget" })} // optional defaultValue
        components={{
          1: <div />,
        }}
      />
    </QuestionProviderContainer>
  );
};

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "QueryModalSchema",
      {
        label: ["queryUrl", { ns: "editorWidget" }],
        showQuestionIcon: true,
        questionPopover: QueryUrlProvider,
        direction: "column",
      },
      "queryConfig"
    ),
    createSchema(
      "InputSchema",
      {
        label: ["value", { ns: "editorWidget" }],
        showQuestionIcon: true,
        questionPopover: StaticValueProvider,
      },
      "value"
    ),
    createSchema(
      "InputNumberSchema",
      { label: ["size", { ns: "editorWidget" }] },
      "size",
      { min: 40 }
    ),
    createSchema(
      "InputSchema",
      { label: ["icon", { ns: "editorWidget" }] },
      "icon"
    ),
    createSchema(
      "InputNumberSchema",
      { label: ["iconSize", { ns: "editorWidget" }] },
      "iconSize",
      { min: 0, max: 120 },
      { hidden: props => !props["icon"] }
    ),
    createSchema(
      "InputColorSchema",
      {
        label: ["color", { ns: "editorWidget" }],
      },
      "color"
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["bordered", { ns: "editorWidget" }],
      },
      "bordered"
    ),
    createSchema(
      "RadioGroupSchema",
      {
        label: ["errorLevel", { ns: "editorWidget" }],
      },
      "errorLevel",
      {
        mapData: errorLevelMapData,
      }
    ),
  ]),
  ...statusRender([hidden]),
};

const styleSetting: SettingProviderProps = {
  ...styleSettings,
};

export const QRCodeSetting = () => {
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
