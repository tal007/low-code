/*
 * @Date: 2023-04-24 10:18:20
 * @LastEditTime: 2023-05-08 13:51:41
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 省市区组件设置
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { formatOptions } from "./constant";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema("RadioGroupSchema", "antdPropDesc.format", "format", {
      mapData: formatOptions,
    }),
    createSchema("SwitchSchema", "必填", "required"),
  ]),
};

export const SettingComponent = () => {
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
