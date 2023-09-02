/*
 * @Date: 2022-10-11 14:41:26
 * @LastEditTime: 2023-01-04 16:10:22
 * @LastEditors: 刘玉田
 * @Description:
 */

import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { Enum } from "@/SettingPanelSchema/Select";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useTranslation } from "react-i18next";
import { Segmented } from "@/component/Segmented";
import { statusRender } from "@/SettingPanelSchema/settingRender";
import { hidden } from "@/SettingPanelSchema/settingRender/common";
import { flexAlignRender } from "@/SettingPanelSchema/settingRender/flexAlign";
import { styleSettings } from "../../Common/StyleContainer";

const direction: Enum[] = [
  { label: "direction.horizontal", value: "row" },
  { label: "direction.vertical", value: "column" },
];
const propsSetting: SettingProviderProps = {
  ...statusRender([hidden]),
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
  ...styleSettings,
  flex: {
    header: "propSettingHeader.flexSetting",
    children: [
      {
        component: "SwitchSchema",
        parentProps: {
          label: ["openFlex", { ns: "style" }],
        },
        childProps: {
          propName: "openFlex",
        },
      },
      {
        component: "RadioGroupSchema",
        parentProps: {
          label: ["direction", { ns: "style" }],
        },
        childProps: {
          propName: "flexDirection",
          mapData: direction,
        },
        hidden: (props: any) => !props["openFlex"],
      },

      ...flexAlignRender("", "rowAlign", "columnAlign", {
        hidden: (props: any) => !props["openFlex"],
      }).flexAlign.children,
    ],
  },
};

export const ContainerSettings = () => {
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
