/*
 * @Date: 2022-12-08 14:56:23
 * @LastEditTime: 2023-01-05 15:23:04
 * @LastEditors: 刘玉田
 * @Description: 子元素的容器渲染
 */

import styled from "styled-components";
import { useEditorAction } from "../../hooks";

export interface ChildrenRender {
  children: React.ReactNode;
}

export const ChildrenRender = (props: ChildrenRender) => {
  const { children } = props;
  const { enabled } = useEditorAction();
  return children ? <>{children}</> : enabled ? <NullChildren /> : null;
};

export const NullChildren = () => {
  const { t } = useTranslation();

  return (
    <NullChildrenContainer>
      {t("tip.createWidget", { ns: "editor" })}
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
