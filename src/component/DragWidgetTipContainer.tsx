/*
 * @Date: 2022-10-27 11:08:25
 * @LastEditTime: 2022-10-27 11:19:19
 * @LastEditors: 刘玉田
 * @Description: 拖拽提示容器 没有子元素的时候显示这个组件
 */

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background: #f1f1f1;
  border: 1px solid #e0e0e0;
`;

export const DragWidgetTipContainer = () => {
  return <Container>拖拽组件或模板到这里</Container>;
};
