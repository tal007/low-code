/*
 * @Date: 2022-09-21 17:51:51
 * @LastEditTime: 2023-05-25 13:42:23
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 编辑器区域
 */

import { useEffect, useRef } from "react";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";
import { useEditor, Element, Frame } from "@craftjs/core";
import { Root } from "@/EditorWidgets/Container/Root";
import { Toolbar } from "./Toolbar";
import cx from "classnames";
import { displayName } from "@/i18n/widgetDisplayName";
import { currentUIState } from "@/store/useMobileUI.slice";
import { useSelector } from "react-redux";
import { currentEditorConfig } from "@/store/editor.slice";
import { Scrollbar } from "smooth-scrollbar/scrollbar";

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
  const {
    enabled,
    connectors,
    actions: { deserialize },
  } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const currentUIIsMobile = useSelector(currentUIState);
  const currentState = useSelector(currentEditorConfig);

  useEffect(() => {
    // 初始化数据，回显，用于编辑预览切换
    const widgetLength = Object.keys(currentState.nodes).length;
    if (widgetLength) {
      deserialize(currentState.nodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deserialize]);

  const scrollbar = useRef<{ scrollbar: Scrollbar }>();

  useEffect(() => {
    const scrollbarInstance = scrollbar.current.scrollbar;
    scrollbarInstance.scrollIntoView(document.querySelector(".drag-tip"));
  }, [currentState.addNodeRandom]);

  return (
    <Outside
      className={cx([
        {
          edit: enabled,
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
        ref={scrollbar}
      >
        <EditContent />
      </ScrollContainer>
    </Outside>
  );
};

const Outside = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  flex: 1;
  overflow: hidden;
  /* padding: 0 20px; */

  &.edit {
    contain: paint;
    min-width: 800px;
    /* background-color: #f5f5f5; */
  }

  .mobile {
    width: 360px;
    max-height: 640px;
    margin: 20px auto;
    border: 1px solid rgba(17, 31, 44, 0.08);
    box-shadow: 0 8px 40px 0 rgba(17, 31, 44, 0.12);
    border-radius: 24px;
    padding: 0 10px;
  }
`;
