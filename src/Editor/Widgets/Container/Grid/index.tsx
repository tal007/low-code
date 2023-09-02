/*
 * @Date: 2022-10-18 09:12:21
 * @LastEditTime: 2022-10-28 12:42:41
 * @LastEditors: 刘玉田
 * @Description: grid 布局容器 兼容移动 与 PC
 */
import { Element, useNode } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { GridSetting } from "./GridSetting";
import { Row, Col } from "antd";
import {
  MarginAndPadding,
  marginAndPaddingDefault,
} from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { useMarginAndPadding } from "../../hooks";
import { Container } from "../Container";
import React from "react";
import { merge } from "lodash";
import {
  Background,
  backgroundDefault,
  setBackground,
} from "@/SettingPanelSchema/settingRender/background";

export interface GridRenderViewProps extends MarginAndPadding, Background {
  children: React.ReactElement | React.ReactElement[];
  horizontalGutter: number;
  verticalGutter: number;
  colCount: number;
  justify: string;
  align: string;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

const defaultProps = merge({
  ...marginAndPaddingDefault,
  ...backgroundDefault,
  horizontalGutter: 16,
  verticalGutter: 16,
  justify: "flex-start",
  align: "flex-start",
  xs: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 2,
  xxl: 2,
});

const alignMap = new Map();
alignMap.set("flex-start", "top");
alignMap.set("center", "middle");
alignMap.set("flex-end", "bottom");

const justifyMap = new Map();
justifyMap.set("flex-start", "start");
justifyMap.set("center", "center");
justifyMap.set("flex-end", "end");
justifyMap.set("space-between", "space-between");
justifyMap.set("space-around", "space-around");

export const GridRenderView = (props: Partial<GridRenderViewProps>) => {
  const {
    children,
    horizontalGutter,
    verticalGutter,
    justify,
    align,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    marginAndPadding,
    background,
  } = props;
  const { padding } = useMarginAndPadding(marginAndPadding);

  const backgroundStyle = setBackground({ background });

  const style: React.CSSProperties = {
    padding: children ? padding : 20,
    marginTop: marginAndPadding.margin[0] + "px",
    marginRight: marginAndPadding.margin[1] + "px",
    marginBottom: marginAndPadding.margin[2] + "px",
    marginLeft: marginAndPadding.margin[3] + "px",
    ...backgroundStyle,
  };

  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Row
      ref={ref => connect(drag(ref))}
      style={style}
      gutter={[horizontalGutter, verticalGutter]}
      align={alignMap.get(align)}
      justify={justifyMap.get(justify)}
    >
      {React.Children.map(
        (children as React.ReactElement)?.props?.children,
        child => {
          return (
            <Col
              xs={24 / xs}
              sm={24 / sm}
              md={24 / md}
              lg={24 / lg}
              xl={24 / xl}
              xxl={24 / xxl}
            >
              {child}
            </Col>
          );
        }
      )}
    </Row>
  );
};

GridRenderView.craft = {
  displayName: "Grid",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: GridSetting,
  },
};

export const Grid: CommonButtonTypes = {
  ...generateWidgetOptions("Grid", "container"),
  icon: "table-cells",
  tags: ["container"],
  preview: <div>内容</div>,
  render: (
    <Element
      canvas
      is={GridRenderView}
      custom={{ displayName: "栅格", tags: ["container"] }}
    >
      {Container.render}
      {Container.render}
    </Element>
  ),
};
