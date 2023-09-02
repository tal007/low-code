/*
 * @Date: 2022-09-27 15:06:04
 * @LastEditTime: 2022-12-21 17:50:33
 * @LastEditors: 刘玉田
 * @Description: 容器
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Resizer } from "../../Resizer";
import { ContainerSettings } from "./ContainerSetting";
import {
  flexAlignDefault,
  FlexAlignProps,
} from "@/SettingPanelSchema/settingRender/flexAlign";
import { Text } from "../../Show/Text";
import { Image } from "../../Show/Image";
import type { Property } from "csstype";
import {
  StyleContainer,
  StyleContainerProps,
  styleDefault,
} from "../../Common/StyleContainer";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { CraftContainer } from "../../Common/CraftContainer";
import { Children } from "../../types";

export interface ContainerRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    FlexAlignProps,
    Children {
  flexDirection: Property.FlexDirection;
  fillSpace: string;
  width: string;
  height: string;
  openFlex: boolean;
  common: Record<string, any>;
}

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

export const ContainerRenderView = (
  props: Partial<ContainerRenderViewProps>
) => {
  props = { ...defaultProps, ...props };
  const { children, openFlex, justify, align, height, flexDirection, common } =
    props;

  const style: React.CSSProperties = {
    display: openFlex ? "flex" : "inherit",
    flexWrap: "wrap",
    justifyContent: justify,
    alignItems: align,
    flexDirection: flexDirection,
    height,
  };

  return (
    <Resizer propKey={{ width: "width", height: "height" }}>
      <StyleContainer {...props} style={style}>
        <CraftContainer hidden={common.hidden}>{children}</CraftContainer>
      </StyleContainer>
    </Resizer>
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
  preview: <div>内容</div>,
  render: (
    <Element
      canvas
      is={ContainerRenderView}
      custom={{ displayName: "容器", tags: ["container"] }}
    >
      {Text.render}
      {Image.render}
    </Element>
  ),
};
