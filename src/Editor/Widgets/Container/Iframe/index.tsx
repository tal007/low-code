/*
 * @Date: 2022-10-19 14:40:10
 * @LastEditTime: 2023-05-04 11:04:25
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: iframe
 */

import { Element, useNode } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { IframeSetting } from "./IframeSetting";
import { BackgroundColor, Color } from "../../types";
import React from "react";
import {
  WidthAndHeight,
  widthAndHeightDefault,
} from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { useEditorAction } from "../../hooks";
import styled from "styled-components";
import { HiddenElement } from "@/component/HiddenElement";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/component/Loading";
import {
  MarginAndPadding,
  marginAndPaddingDefault,
} from "@/SettingPanelSchema/settingRender/marginAndPadding";

export interface IframeRenderViewProps
  extends MarginAndPadding,
    WidthAndHeight,
    BackgroundColor,
    Color {
  pageURL: string;
  hidden: boolean;
  frameBorder: number;
}

const defaultProps = {
  ...widthAndHeightDefault,
  ...marginAndPaddingDefault,
  pageURL: "http://www.maiyuesoft.com/",
  hidden: false,
  frameBorder: 0,
};

const EditShowContainer = styled.div`
  min-height: 40px;
  line-height: 40px;
  background-color: #f5f5f5;
  padding: 0 20px;
`;

const EditShow = (props: Partial<IframeRenderViewProps>) => {
  const { pageURL, width, height } = props;
  return (
    <>
      Iframe（{pageURL}）（{width} * {height}）
    </>
  );
};

const PreviewShow = (props: Partial<IframeRenderViewProps>) => {
  const { pageURL, width, height, frameBorder } = props;

  const fetchSrc = async () => {
    const res = await fetch(pageURL);
    return res.json();
  };

  const { isLoading, isError, error } = useQuery<null, Error>(
    ["irfame", pageURL],
    fetchSrc
  );

  if (isError) {
    return <>{error.message}</>;
    // throw new Error(error.message);
  }

  return (
    <div style={{ width, height }}>
      {isLoading ? (
        <Loading />
      ) : (
        <iframe
          src={pageURL}
          frameBorder={frameBorder}
          width={"100%"}
          height={"100%"}
        ></iframe>
      )}
    </div>
  );
};

export const IframeRenderView = (props: Partial<IframeRenderViewProps>) => {
  const { hidden } = props;
  const {
    connectors: { connect, drag },
  } = useNode();
  const { enabled } = useEditorAction();

  return (
    <HiddenElement hidden={hidden} ref={ref => connect(drag(ref))}>
      {enabled ? (
        <EditShowContainer>
          <EditShow {...props} />
        </EditShowContainer>
      ) : (
        <PreviewShow {...props} />
      )}
    </HiddenElement>
  );
};

IframeRenderView.craft = {
  displayName: "Iframe",
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: IframeSetting,
  },
};

export const Iframe: CommonButtonTypes = {
  ...generateWidgetOptions("Iframe", "container"),
  icon: "table-cells",
  tags: ["container"],
  preview: <div>内容</div>,
  render: (
    <Element
      canvas
      is={IframeRenderView}
      custom={{ displayName: "Iframe", tags: ["container"] }}
    ></Element>
  ),
};
