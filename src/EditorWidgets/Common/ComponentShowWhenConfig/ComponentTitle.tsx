/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-21 16:23:31
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-21 16:40:08
 * @Description:
 */
import { useEditorAction } from "@/EditorWidgets/hooks";
import styled from "styled-components";

const ComponentTitleContainer = styled.div`
  padding: 14px 10px;
  color: rgba(25, 31, 37, 0.56);
`;

export const ComponentTitle = ({ title }: { title: string }) => {
  const { enabled } = useEditorAction();

  return enabled ? (
    <ComponentTitleContainer>{title}</ComponentTitleContainer>
  ) : null;
};
