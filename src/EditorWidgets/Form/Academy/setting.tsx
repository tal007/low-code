/**
 * @author 梁强
 * @filename setting.tsx
 * @date 2023-05-11 星期四
 * @description 学院-settings
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";
import { basePlaceholderSetting } from "@/SettingPanelSchema/settingRender/common";

const optionalNumber: Enum[] = [
  {
    label: ["form.Academy.optionalNumberOne", { ns: "editorWidget" }],
    value: 1,
    colSpan: 12,
  },
  {
    label: ["form.Academy.optionalNumberMutile", { ns: "editorWidget" }],
    value: 2,
    colSpan: 12,
  },
];

const academyOptions: Enum[] = [
  {
    label: ["form.Academy.submittedDepartment", { ns: "editorWidget" }],
    value: 1,
    colSpan: 12,
  },
  {
    label: ["form.Academy.designatedDepartment", { ns: "editorWidget" }],
    value: 2,
    colSpan: 12,
  },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    basePlaceholderSetting,
    createSchema(
      "TabsRadioSchema",
      {
        label: ["form.Academy.optionalNumber", { ns: "editorWidget" }],
        direction: "column",
      },
      "optionalNumber",
      {
        mapData: optionalNumber,
        nativeRadio: true,
      }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["form.Academy.academyOptions", { ns: "editorWidget" }],
        direction: "column",
      },
      "mainGate"
    ),
    createSchema(
      "TabsRadioSchema",
      {
        label: "",
        direction: "column",
      },
      "academyOptionsMode",
      {
        mapData: academyOptions,
      }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: "antdPropDesc.required",
        direction: "column",
      },
      "required"
    ),
  ]),
};

export const AcademyComponentSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
      }}
    />
  );
};
