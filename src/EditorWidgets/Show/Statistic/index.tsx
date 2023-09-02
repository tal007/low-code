/*
 * @Date: 2022-12-29 14:42:46
 * @LastEditTime: 2023-05-12 17:40:56
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 统计
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { styleDefault } from "../../Common/StyleContainer";
import { generateWidgetOptions } from "../../helper";
import { StatisticSetting } from "./setting";
import { fontDefault } from "@/SettingPanelSchema/settingRender/font";
import { StatisticProps } from "./index.d";
import Component from "./Component";

const NAME = "Statistic";
const widgetName = displayName(NAME);
const defaultProps: StatisticProps = {
  ...styleDefault,
  ...setCommonDefaults(),
  font: fontDefault,
};
export const StatisticComponent = Component;
export const StatisticRenderView = (props: Partial<StatisticProps>) => {
  return <Component {...props} />;
};

StatisticRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: StatisticSetting,
  },
};

export const Statistic: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "show"),
  icon: "arrow-up-9-1",
  tags: ["show"],
  render: (
    <Element
      canvas
      is={StatisticRenderView}
      custom={{
        displayName: widgetName,
        tags: ["show"],
        componentName: "StatisticComponent",
      }}
    ></Element>
  ),
};
