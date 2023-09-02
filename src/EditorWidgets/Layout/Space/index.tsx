/*
 * @Date: 2022-12-29 13:58:46
 * @LastEditTime: 2023-01-05 11:48:29
 * @LastEditors: 刘玉田
 * @Description: 间距 Space
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Element } from "@craftjs/core";
import {
  Divider,
  Space as AntdSpace,
  SpaceProps as AntdSpaceProps,
  Typography,
} from "antd";
import { Button } from "../../Button/Button";
import { CommonButtonTypes } from "../../Common";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { FormWidgetContainer } from "../../Form/FormWidgetContainer";
import { generateWidgetOptions } from "../../helper";
import { SpaceSetting } from "./SpaceSetting";

export interface SpaceProps
  extends Partial<Omit<StyleContainerProps, "children">>,
    Omit<AntdSpaceProps, "is"> {
  common: Record<string, any>;
}

const NAME = "Space";
const widgetName = displayName(NAME);
const defaultProps: Partial<SpaceProps> = {
  ...styleDefault,
  ...setCommonDefaults(),
  size: 8,
  direction: "horizontal",
  wrap: false,
};

export const SpaceRenderView = (props: Partial<SpaceProps>) => {
  const { children, size, direction, wrap } = props;

  return (
    <FormWidgetContainer {...props}>
      <AntdSpace size={size} direction={direction} wrap={wrap}>
        {children}
      </AntdSpace>
    </FormWidgetContainer>
  );
};

SpaceRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => true,
  },
  related: {
    settings: SpaceSetting,
  },
};

export const Space: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "layout"),
  icon: "box",
  tags: ["layout"],
  preview: (
    <AntdSpace split={<Divider type="vertical" />}>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </AntdSpace>
  ),
  render: (
    <Element
      canvas
      is={SpaceRenderView}
      custom={{ displayName: widgetName, tags: ["layout"] }}
    >
      {Button.render}
      {Button.render}
    </Element>
  ),
};
