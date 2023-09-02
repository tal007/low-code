/*
 * @Date: 2022-10-25 09:12:34
 * @LastEditTime: 2023-01-05 10:43:48
 * @LastEditors: 刘玉田
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Trans, useTranslation } from "react-i18next";
import {
  basicRender,
  formLabelSettingRender,
  statusRender,
} from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";
import { QuestionProviderContainer } from "@/style";
import { styleSettings } from "../../Common/StyleContainer";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { formItemName } from "@/SettingPanelSchema/settingRender/formItemProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const pickerTypeMapData: Enum[] = [
  { label: ["date", { ns: "editorWidget" }], value: "date" },
  { label: ["week", { ns: "editorWidget" }], value: "week" },
  { label: ["month", { ns: "editorWidget" }], value: "month" },
  { label: ["quarter", { ns: "editorWidget" }], value: "quarter" },
  { label: ["year", { ns: "editorWidget" }], value: "year" },
];

const FormatProvider = () => {
  const { t } = useTranslation();

  return (
    <QuestionProviderContainer>
      <Trans
        i18nKey="formatTip" // optional -> fallbacks to defaults if not provided
        defaults={t("datePicker.formatTip")} // optional defaultValue
        values={{ what: "world" }}
        components={{
          1: <div />,
        }}
      />
    </QuestionProviderContainer>
  );
};

const propsSetting: SettingProviderProps = {
  ...basicRender([
    formItemName,
    createSchema(
      "RadioGroupSchema",
      {
        label: ["range", { ns: "editorWidget" }],
        direction: "column",
      },
      "fieldProps.picker",
      {
        mapData: pickerTypeMapData,
      }
    ),
    createSchema(
      "SwitchSchema",
      { label: ["showTime", { ns: "editorWidget" }] },
      "showTime",
      {},
      {
        hidden: props => props["fieldProps.picker"] !== "date",
      }
    ),
    createSchema(
      "InputSchema",
      {
        label: ["format", { ns: "editorWidget" }],
        showQuestionIcon: true,
        questionPopover: FormatProvider,
      },
      "fieldProps.format"
    ),
  ]),
  ...formLabelSettingRender([]),
  ...statusRender([hidden, disabled, readOnly]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
};

export const DatePickerSetting = () => {
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
          <EventHandler actionTypes={["change"]} />
        ),
      }}
    />
  );
};
