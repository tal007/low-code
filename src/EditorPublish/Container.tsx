import { useMountedRef } from "@/hooks/useMountedRef";
import { useEffect } from "react";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";
import { useEditor, Element, Frame } from "@craftjs/core";
import { Root } from "@/EditorWidgets/Container/Root";
import cx from "classnames";
import { displayName } from "@/i18n/widgetDisplayName";
import { currentUIState } from "@/store/useMobileUI.slice";
import { useSelector } from "react-redux";
import { currentEditorConfig } from "@/store/editor.slice";
import { CloseOutlined } from "@ant-design/icons";

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
  const isMounted = useMountedRef();

  if (!isMounted.current) null;

  const { enabled, connectors, actions } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const currentUIIsMobile = useSelector(currentUIState);
  const currentState = useSelector(currentEditorConfig);

  useEffect(() => {
    // 初始化数据，回显
    actions.deserialize(currentState.nodes);
  }, [actions, currentState.nodes]);

  return (
    <Outside
      className={cx([
        {
          edit: enabled,
        },
      ])}
      ref={ref => connectors.select(connectors.hover(ref, null), null)}
    >
      <ScrollContainer
        className={cx([
          {
            "editor-render-page": true,
            mobile: currentUIIsMobile,
          },
        ])}
      >
        <EditContent />
        <CloseOutlined
          className="close-preview"
          onClick={() => window.history.back()}
        />
      </ScrollContainer>
    </Outside>
  );
};

const Outside = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  flex: 1;
  overflow: hidden;

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

  .close-preview {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    background-color: #fafafb;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
  }
`;
