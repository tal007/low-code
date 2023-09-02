/*
 * @Date: 2022-10-25 14:33:57
 * @LastEditTime: 2023-05-12 14:48:49
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
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
import { QuestionProviderContainer } from "@/style";
import { styleSettings } from "../../Common/StyleContainer";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import {
  disabled,
  readOnly,
} from "@/SettingPanelSchema/settingRender/fieldProps";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

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
    createSchema(
      "InputSchema",
      {
        label: "datePicker.format",
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

export const TimeRangePickerSetting = () => {
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
