/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-26 18:08:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-19 11:01:15
 * @Description:
 */
/**
 * @author 梁强
 * @filename constant.ts
 * @date 2023-04-26 星期三
 * @description 明细/表格-配置
 */
import { styleDefault } from "@/EditorWidgets/Common/StyleContainer";
import { Enum } from "@/SettingPanelSchema/Select";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { flexAlignDefault } from "@/SettingPanelSchema/settingRender/flexAlign";
import { displayName } from "@/i18n/widgetDisplayName";

export const fillingMethodMapData: Enum[] = [
  {
    label: ["form.DetailedTableContainer.list", { ns: "editorWidget" }],
    value: "list",
    url: "https://gw.alicdn.com/tfs/TB1iK9leTM11u4jSZPxXXahcXXa-894-390.png",
  },
  {
    label: ["form.DetailedTableContainer.table", { ns: "editorWidget" }],
    value: "table",
    url: "https://gw.alicdn.com/tfs/TB1S.tqOAY2gK0jSZFgXXc5OFXa-894-390.png",
  },
];

export const printFormatMapData: Enum[] = [
  {
    label: [
      "form.DetailedTableContainer.horizontalPrint",
      { ns: "editorWidget" },
    ],
    value: "horizontal",
    url: "https://gw.alicdn.com/tfs/TB1ok_1OpT7gK0jSZFpXXaTkpXa-894-300.png",
  },
  {
    label: [
      "form.DetailedTableContainer.verticalPrint",
      { ns: "editorWidget" },
    ],
    value: "vertical",
    url: "https://gw.alicdn.com/tfs/TB17u1KefzO3e4jSZFxXXaP_FXa-894-402.png",
  },
];

export const DetailedTableContainerNAME = "DetailedTableContainer";
export const widgetName = displayName(DetailedTableContainerNAME);

export const fillingMethodMap = {
  列表: "list",
  表格: "table",
};

export const platformMap = {
  移动端: "mobile",
  pc: "pc",
};

export const defaultProps = {
  ...flexAlignDefault,
  ...styleDefault,
  ...setCommonDefaults(),
  //
  name: widgetName,
  actionName: "添加",
  fillingMethod: "table",
  printFormat: "horizontal",
};

export const fromEntries = pairs => {
  if (Object.fromEntries) {
    return Object.fromEntries(pairs);
  }
  return pairs.reduce(
    (accum, [id, value]) => ({
      ...accum,
      [id]: value,
    }),
    {}
  );
};
