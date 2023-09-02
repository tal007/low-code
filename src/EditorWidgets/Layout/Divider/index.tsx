/*
 * @Date: 2022-12-23 14:05:34
 * @LastEditTime: 2023-01-05 11:47:59
 * @LastEditors: 刘玉田
 * @Description: 分割线
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Element } from "@craftjs/core";
import { Divider as AntdDivider, DividerProps as AntdDividerProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { FormWidgetContainer } from "../../Form/FormWidgetContainer";
import { generateWidgetOptions } from "../../helper";
import { DividerSetting } from "./DividerSetting";

export interface DividerProps
  extends Partial<Omit<StyleContainerProps, "children">>,
    AntdDividerProps {
  common: Record<string, any>;
}

const NAME = "Divider";
const widgetName = displayName(NAME);
const defaultProps: DividerProps = {
  ...styleDefault,
  ...setCommonDefaults(),
};

export const DividerRenderView = (props: Partial<DividerProps>) => {
  const { children, dashed, plain, type, orientation, orientationMargin } =
    props;

  return (
    <FormWidgetContainer {...props}>
      <AntdDivider
        dashed={dashed}
        plain={plain}
        type={type}
        orientation={orientation}
        orientationMargin={orientationMargin}
      >
        {children}
      </AntdDivider>
    </FormWidgetContainer>
  );
};

DividerRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: DividerSetting,
  },
};

export const Divider: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "layout"),
  icon: "divide",
  tags: ["layout"],
  preview: <AntdDivider>{widgetName}</AntdDivider>,
  render: (
    <Element
      canvas
      is={DividerRenderView}
      custom={{ displayName: widgetName, tags: ["layout"] }}
    ></Element>
  ),
};
