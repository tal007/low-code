/*
 * @Date: 2022-10-19 10:04:49
 * @LastEditTime: 2023-05-12 15:18:42
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: Select
 */

import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { SelectSetting } from "./SelectSetting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { SelectRenderViewProps } from "./index.d";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";

const NAME = "Select";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
  onEvent: {},
  dataSource: {
    dataSourceType: "static",
    staticData: [
      {
        label: "选项A",
        value: "A",
      },
      {
        label: "选项B",
        value: "B",
      },
    ],
  },
};
export const SelectComponent = Component;
export const SelectRenderView = (props: Partial<SelectRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

SelectRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: SelectSetting,
  },
};

export const Select: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "th-list",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={SelectRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "SelectComponent",
      }}
    ></Element>
  ),
};
