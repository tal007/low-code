/*
 * @Date: 2022-12-08 14:56:23
 * @LastEditTime: 2023-05-22 10:32:38
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 子元素的容器渲染
 */

import styled from "styled-components";
import { useEditorAction } from "../../hooks";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";

export interface ChildrenRender {
  children: React.ReactNode;
}

export const ChildrenRender = (props: ChildrenRender) => {
  const { children } = props;
  const { enabled } = useEditorAction();
  return (
    <>
      {children} {enabled ? <NullChildren /> : null}
    </>
  );
};

export const NullChildren = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(currentEditorConfigActions.setActiveNodeId("ROOT"));
  };

  return (
    <NullChildrenContainer className="drag-tip" onClick={onClick}>
      + {t("tip.createWidget", { ns: "editor" })}
    </NullChildrenContainer>
  );
};

const NullChildrenContainer = styled.div`
  width: 100%;
  height: 200px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;
