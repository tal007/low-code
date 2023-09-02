/*
 * @Date: 2022-09-27 15:06:04
 * @LastEditTime: 2023-05-15 13:36:27
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 容器
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { ContainerSettings } from "./ContainerSetting";
import { flexAlignDefault } from "@/SettingPanelSchema/settingRender/flexAlign";
import { styleDefault } from "../../Common/StyleContainer";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { DropTip } from "@/EditorWidgets/Common/DropTip";
import React from "react";
import { ContainerRenderViewProps } from "./index.d";
import Component from "./Component";

export const defaultProps = {
  ...flexAlignDefault,
  ...styleDefault,
  ...setCommonDefaults(),
  flexDirection: "column" as const,
  fillSpace: "no",
  width: "100%",
  height: "auto",
  openFlex: true,
};
export const ContainerComponent = Component;
export const ContainerRenderView = (
  props: Partial<ContainerRenderViewProps>
) => {
  props = { ...defaultProps, ...props };
  const { justify, align, height, flexDirection } = props;

  const style: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: justify,
    alignItems: align,
    flexDirection: flexDirection,
    height,
  };

  return (
    <BaseContainer style={style}>
      <Component {...props} />
    </BaseContainer>
  );
};

ContainerRenderView.craft = {
  // displayName: generateWidgetOptions("Container", "container").name,
  displayName: "Container",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};

export const Container: CommonButtonTypes = {
  ...generateWidgetOptions("Container", "container"),
  icon: "square",
  tags: ["container"],
  render: (
    <Element
      canvas
      is={ContainerRenderView}
      custom={{
        displayName: "容器",
        tags: ["common-container"],
        componentName: "ContainerComponent",
      }}
    >
      <Element is={DropTip} />
    </Element>
  ),
};
