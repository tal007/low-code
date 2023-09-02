/*
 * @Date: 2022-10-21 16:58:18
 * @LastEditTime: 2023-01-06 15:48:46
 * @LastEditors: 刘玉田
 * @Description: 按钮
 */

import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { Button as AntdButton, ButtonProps } from "antd";
import { displayName } from "@/i18n/widgetDisplayName";
import { ButtonSetting } from "./ButtonSetting";
import { useEvents } from "../../hooks";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { setBackground } from "@/SettingPanelSchema/settingRender/background";
import * as icons from "@ant-design/icons";
import React from "react";
import { Events } from "../../types";
import { FormWidgetContainer } from "../../Form/FormWidgetContainer";

type ButtonPickProps = Pick<
  ButtonProps,
  | "block"
  | "danger"
  | "disabled"
  | "ghost"
  | "htmlType"
  | "shape"
  | "size"
  | "type"
  | "onClick"
>;

export interface ButtonRenderViewProps
  extends ButtonPickProps,
    Events,
    StyleContainerProps {
  name: string;
  common: Record<string, any>;
  icon?: string;
}

const NAME = "Button";
const widgetName = displayName(NAME);
const defaultProps: Omit<ButtonRenderViewProps, "children" | "style"> = {
  ...styleDefault,
  name: widgetName,
  block: false,
  danger: false,
  ghost: false,
  htmlType: "button",
  icon: null,
  shape: "default",
  size: "middle",
  type: "default",
  onClick: null,
  onEvent: { click: [] },
  ...setCommonDefaults(),
};

export const ButtonRenderView = (props: Partial<ButtonRenderViewProps>) => {
  props = { ...defaultProps, ...props };

  const {
    name,
    block,
    onEvent,
    onClick,
    common,
    background,
    icon,
    // marginAndPadding borderRadius 提出来没用是因为 rest 中包含这两个属性 会添加到 button 的html中会警告
    ...rest
  } = props;

  const handleClick = useEvents("click", onEvent, onClick, common.disabled);

  return (
    <FormWidgetContainer
      {...props}
      style={{ display: block ? "block" : "inline-block" }}
    >
      <AntdButton
        block={block}
        disabled={common.disabled}
        icon={icon ? React.createElement(icons[icon]) : null}
        {...rest}
        onClick={handleClick}
        style={{
          ...setBackground({ background }),
        }}
      >
        {name}
      </AntdButton>
    </FormWidgetContainer>
  );
};

ButtonRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: ButtonSetting,
  },
};

export const Button: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "button"),
  icon: "square",
  tags: ["button"],
  preview: <AntdButton>{widgetName}</AntdButton>,
  render: (
    <Element
      canvas
      is={ButtonRenderView}
      custom={{ displayName: widgetName, tags: ["button"] }}
    ></Element>
  ),
};
