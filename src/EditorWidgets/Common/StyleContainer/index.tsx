/*
 * @Date: 2022-12-07 15:51:08
 * @LastEditTime: 2022-12-08 17:05:35
 * @LastEditors: 刘玉田
 * @Description: 样式通用容器
 */

import React, { useMemo } from "react";
import { useMarginAndPadding } from "../../hooks";
import {
  Border,
  borderDefault,
  borderRender,
  setBorderStyle,
} from "@/SettingPanelSchema/settingRender/border";
import {
  BorderRadius,
  borderRadiusDefault,
  BorderRadiusRender,
  setBorderRadiusStyle,
} from "@/SettingPanelSchema/settingRender/borderRadius";
import {
  Background,
  backgroundDefault,
  backgroundRenderer,
  setBackground,
} from "@/SettingPanelSchema/settingRender/background";

import {
  MarginAndPadding,
  marginAndPaddingDefault,
  marginAndPaddingRender,
} from "@/SettingPanelSchema/settingRender/marginAndPadding";
export interface StyleContainerProps
  extends Border,
    BorderRadius,
    Background,
    MarginAndPadding {
  children: React.ReactElement;
  style: React.CSSProperties;
}

export const StyleContainer = (props: Partial<StyleContainerProps>) => {
  const {
    children,
    style,
    background,
    border,
    borderRadius,
    marginAndPadding,
  } = props;

  const marginAndPaddingStyle = useMarginAndPadding(marginAndPadding);
  const borderStyle = useMemo(() => setBorderStyle({ border }), [border]);
  const backgroundStyle = useMemo(
    () => setBackground({ background }),
    [background]
  );
  const borderRadiusStyle = useMemo(
    () => setBorderRadiusStyle({ borderRadius }),
    [borderRadius]
  );

  const newStyle: React.CSSProperties = {
    ...style,
    ...marginAndPaddingStyle,
    ...backgroundStyle,
    ...borderStyle,
    ...borderRadiusStyle,
  };

  return React.cloneElement(children, { style: newStyle });
};

export const styleDefault = {
  ...marginAndPaddingDefault,
  ...backgroundDefault,
  ...borderDefault,
  ...borderRadiusDefault,
};

export const styleSettings = {
  ...marginAndPaddingRender(),
  ...backgroundRenderer(),
  ...borderRender(),
  ...BorderRadiusRender(),
};
