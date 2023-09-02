/*
 * @Date: 2022-09-21 10:40:12
 * @LastEditTime: 2023-05-17 16:56:14
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: styled components
 */

import styled from "styled-components";

export type FlexBoxType = {
  width?: string;
  height?: string;
  justify?: JustifyContent;
  alignItems?: AlignItems;
  padding?: number | string;
  direction?: "row" | "column";
  border?: string;
};

export const FlexBox = styled.div<FlexBoxType>`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justify || "center"};
  align-items: ${props => props.alignItems || "center"};
  padding: ${props =>
    typeof props.padding === "string"
      ? props.padding
      : `${props.padding || 0}px`};
  border: ${props => props.border || "none"};
`;

export interface MPContainerProps {
  margin: number | string;
  padding: number | string;
}
export const MPContainer = styled.div<MPContainerProps>`
  margin: ${props =>
    typeof props.margin === "string" ? props.margin : `${props.margin}px` || 0};
  padding: ${props =>
    typeof props.padding === "string"
      ? props.padding
      : `${props.padding || 0}px`};
`;

export const QuestionProviderContainer = styled.div`
  width: 300;
`;

export const PrimaryColorSpan = styled.span`
  color: ${props => props.theme.token.colorPrimary};
`;
