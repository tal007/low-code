/**
 * @author 梁强
 * @filename setting.tsx
 * @date 2023-05-11 星期四
 * @description 用户-settings
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

const optionalRange: Enum[] = [
  {
    label: ["form.User.optionalMy", { ns: "editorWidget" }],
    value: 1,
    colSpan: 12,
  },
  {
    label: ["form.User.optionalMutileUser", { ns: "editorWidget" }],
    value: 2,
    colSpan: 12,
  },
];

const userOptions: Enum[] = [
  {
    label: ["form.User.submittedUser", { ns: "editorWidget" }],
    value: 1,
    colSpan: 12,
  },
  {
    label: ["form.User.designatedUser", { ns: "editorWidget" }],
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
        label: ["form.User.optionalRange", { ns: "editorWidget" }],
        direction: "column",
      },
      "optionalRange",
      {
        mapData: optionalRange,
        nativeRadio: true,
      }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["form.User.userOptions", { ns: "editorWidget" }],
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
      "userOptionsMode",
      {
        mapData: userOptions,
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

export const UserComponentSetting = () => {
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
