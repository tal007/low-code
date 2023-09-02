/*
 * @Date: 2022-09-21 17:51:51
 * @LastEditTime: 2023-03-20 17:52:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 编辑器区域
 */

import { useMountedRef } from "@/hooks/useMountedRef";
import { useEffect } from "react";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";
import { useEditor, Element, Frame } from "@craftjs/core";
import { Root } from "../Widgets/Container/Root";
import { Toolbar } from "./Toolbar";
import cx from "classnames";
import { displayName } from "@/i18n/widgetDisplayName";
import { currentUIState } from "@/store/useMobileUI.slice";
import { useSelector } from "react-redux";

const EditContent = () => {
  return (
    <Frame>
      <Element
        canvas
        is={Root}
        custom={{ displayName: displayName("Root") }}
      ></Element>
    </Frame>
  );
};

export const Container = () => {
  useEffect(() => {
    // 初始化数据，回显
    // actions.deserialize({})
  }, []);
  const isMounted = useMountedRef();

  if (!isMounted.current) null;

  const { enabled, connectors } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const currentUIIsMobile = useSelector(currentUIState);

  return (
    <Outside
      className={cx([
        {
          "bg-renderer-gray": enabled,
        },
      ])}
      ref={ref => connectors.select(connectors.hover(ref, null), null)}
    >
      <Toolbar />
      <ScrollContainer
        className={cx([
          {
            "editor-render-page": true,
            mobile: currentUIIsMobile,
          },
        ])}
      >
        {currentUIIsMobile ? (
          <iframe src="/mobile.html" width={"100%"} frameBorder={"0"} />
        ) : (
          <EditContent />
        )}
      </ScrollContainer>
    </Outside>
  );
};

const Outside = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  flex: 1;
  overflow: hidden;

  &.bg-renderer-gray {
    contain: paint;
    background-color: #f5f5f5;
  }

  .mobile {
    width: 375px;
    margin: 0 auto;
    background-color: #fff;
  }
`;
