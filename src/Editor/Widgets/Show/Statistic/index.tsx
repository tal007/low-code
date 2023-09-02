/*
 * @Date: 2022-12-29 14:42:46
 * @LastEditTime: 2023-05-04 11:00:53
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 统计
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import * as icons from "@ant-design/icons";
import { Element } from "@craftjs/core";
import {
  Statistic as AntdStatistic,
  StatisticProps as AntdStatisticProps,
} from "antd";
import { CommonButtonTypes } from "../../Common";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { generateWidgetOptions } from "../../helper";
import { StatisticSetting } from "./StatisticSetting";
import {
  Font,
  fontDefault,
  generateFontStyle,
} from "@/SettingPanelSchema/settingRender/font";
import React from "react";
import { FormWidgetContainer } from "../../Form/FormWidgetContainer";

export interface StatisticProps
  extends Partial<Omit<StyleContainerProps, "children">>,
    AntdStatisticProps {
  common: Record<string, any>;
  prefix?: string;
  font: Font;
}

const NAME = "Statistic";
const widgetName = displayName(NAME);
const defaultProps: StatisticProps = {
  ...styleDefault,
  ...setCommonDefaults(),
  font: fontDefault,
};

export const StatisticRenderView = (props: Partial<StatisticProps>) => {
  const { prefix, suffix, value, title, font } = props;

  return (
    <FormWidgetContainer {...props}>
      <AntdStatistic
        prefix={prefix ? React.createElement(icons[prefix]) : null}
        suffix={suffix}
        value={value}
        title={title}
        valueStyle={generateFontStyle(font)}
      />
    </FormWidgetContainer>
  );
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
  preview: <AntdStatistic title={widgetName} value={112893} />,
  render: (
    <Element
      canvas
      is={StatisticRenderView}
      custom={{ displayName: widgetName, tags: ["show"] }}
    ></Element>
  ),
};
