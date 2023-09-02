/*
 * @Date: 2022-10-13 16:54:54
 * @LastEditTime: 2023-05-08 13:41:50
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 设置
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { countMapData } from "./constant";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema("RadioGroupSchema", "antdPropDesc.rate", "count", {
      mapData: countMapData,
    }),
    createSchema("SwitchSchema", "antdPropDesc.allowHalf", "allowHalf"),
    createSchema("SwitchSchema", "antdPropDesc.required", "required"),
  ]),
};

export const RateSetting = () => {
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
