/*
 * @Date: 2023-01-05 11:25:55
 * @LastEditTime: 2023-01-05 11:54:56
 * @LastEditors: 刘玉田
 * @Description: 表单组件的统一容器
 */

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
  const { common, children, loading, error, ...styleProps } = props;

  return (
    <StyleContainer {...styleProps}>
      <CraftContainer
        loading={loading}
        error={error ? error : null}
        hidden={common.hidden}
      >
        {children}
      </CraftContainer>
    </StyleContainer>
  );
};
