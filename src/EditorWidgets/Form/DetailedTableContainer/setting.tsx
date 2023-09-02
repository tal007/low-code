/*
 * @Date: 2023-04-27 11:59:49
 * @LastEditTime: 2023-05-16 10:16:42
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
/**
 * @author 梁强
 * @filename setting.tsx
 * @date 2023-04-26 星期三
 * @description 明细/表格-setting
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { fillingMethodMapData, printFormatMapData } from "./constant";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "InputSchema",
      { label: "antdPropDesc.actionName", direction: "column" },
      "actionName"
    ),
    createSchema(
      "TabsRadioSchema",
      { label: "antdPropDesc.fillingMethod", direction: "column" },
      "fillingMethod",
      {
        mapData: fillingMethodMapData,
        defaultValue: "table",
        render: item => (
          <img
            src={item.url}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ),
      }
    ),
    createSchema(
      "TabsRadioSchema",
      { direction: "column", label: "antdPropDesc.printFormat" },
      "printFormat",
      {
        mapData: printFormatMapData,
        defaultValue: "horizontal",
        render: item => (
          <img
            src={item.url}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ),
      }
    ),
  ]),
};

const DetailedTableContainerSetting = () => {
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

export default DetailedTableContainerSetting;
