/*
 * @Date: 2022-10-19 14:40:59
 * @LastEditTime: 2022-10-19 16:28:32
 * @LastEditors: 刘玉田
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import { useTranslation } from "react-i18next";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { createSchema } from "@/SettingPanelSchema";
import { widthAndHeightRender } from "@/SettingPanelSchema/settingRender/widthAndHeight";

const basicSetting: SettingProviderProps = {
  basic: {
    header: "propSettingHeader.basic",
    children: [createSchema("InputSchema", "antdPropDesc.pageURL", "pageURL")],
  },
  // status: {
  //   header: "propSettingHeader.status",
  //   children: [createSchema("SwitchSchema", "antdPropDesc.hidden", "hidden")],
  // },
};

const styleSetting: SettingProviderProps = {
  ...widthAndHeightRender(),
};

export const IframeSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "style"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(basicSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
      }}
    />
  );
};
