/*
 * @Date: 2022-10-13 16:54:54
 * @LastEditTime: 2023-04-12 15:05:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
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
import { fontStyleEnum } from "@/SettingPanelSchema/settingRender/font";
import { FONT_DATA } from "@/constant";

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "TextAreaSchema",
      { label: ["fontText", { ns: "style" }] },
      "description"
    ),
    createSchema("TextAreaSchema", "antdPropDesc.linkUrl", "href"),
  ]),
};
const styleSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "SelectSchema",
      { label: ["fontFamily", { ns: "style" }] },
      "fontFamily",
      {
        mapData: FONT_DATA,
      }
    ),
    createSchema(
      "InputNumberSchema",
      { label: ["fontSize", { ns: "style" }] },
      "fontSize"
    ),
    createSchema(
      "InputColorSchema",
      { label: ["color", { ns: "style" }] },
      "color"
    ),
    createSchema(
      "CheckboxGroupSchema",
      { label: ["fontStyle", { ns: "style" }] },
      "fontStyle",
      {
        mapData: fontStyleEnum,
      }
    ),
  ]),
};
export const TextLinkSetting = () => {
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
