/*
 * @Date: 2023-01-05 11:25:55
 * @LastEditTime: 2023-04-12 15:02:45
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 表单组件的统一容器
 */

import styled from "styled-components";
import { CraftContainer, CraftContainerProps } from "../Common/CraftContainer";
import { StyleContainer, StyleContainerProps } from "../Common/StyleContainer";

export interface FormWidgetContainerProps<T>
  extends Omit<StyleContainerProps, "children">,
    CraftContainerProps<T> {
  common: Record<string, any>;
  children: React.ReactNode;
}

export const FormWidgetContainer = <T extends Error>(
  props: Partial<FormWidgetContainerProps<T>>
) => {
  const { children, loading, error, ...styleProps } = props;

  return (
    <StyleContainer {...styleProps}>
      <CraftContainer
        loading={loading}
        error={error ? error : null}
        // hidden={common?.hidden}
      >
        {children}
        <CoverNode />
      </CraftContainer>
    </StyleContainer>
  );
};

const CoverNode = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;
