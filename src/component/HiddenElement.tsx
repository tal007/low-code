/*
 * @Date: 2022-10-19 15:20:03
 * @LastEditTime: 2023-05-15 15:35:32
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 隐藏
 */

import { useEditorAction } from "@/Editor/Widgets/hooks";
import { useNode } from "@craftjs/core";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const HiddenElementContainer = styled.div<{ inline: boolean; tags: string[] }>`
  position: relative;
  margin-bottom: 16px;
  margin-top: 16px;
  display: ${props => (props.inline ? "inline-block" : "block")};
  padding: 10px ${props => (props.tags.includes("container") ? "0px" : "10px")};

  .hiddenMask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SingleLabelContainer = styled.div<{ inline: boolean; tags: string[] }>`
  display: ${props => (props.inline ? "inline-block" : "block")};
  padding: 10px ${props => (props.tags.includes("container") ? "0px" : "10px")};
  margin-bottom: 16px;
  margin-top: 16px;

  @media (max-width: 575px) {
    .ant-form-item .ant-form-item-control,
    .ant-form-item .ant-form-item-label {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;

type HiddenElementProps = {
  hidden: boolean;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  style?: React.CSSProperties;
  enabled?: boolean;
};

export const HiddenElement = forwardRef<HTMLDivElement, HiddenElementProps>(
  ({ hidden, children, className, inline = false, style, enabled }, ref) => {
    const { t } = useTranslation();
    const { query } = useEditorAction();
    const { id } = useNode();

    const tags = query.getNodes()[id].data.custom.tags;

    return enabled ? (
      <HiddenElementContainer
        ref={ref}
        className={className}
        style={style}
        inline={inline}
        tags={tags}
      >
        {children}
        {hidden && (
          <div className="hiddenMask">{`<${t("antdPropDesc.hidden")}>`}</div>
        )}
      </HiddenElementContainer>
    ) : hidden ? null : (
      <SingleLabelContainer
        className={className}
        inline={inline}
        style={style}
        tags={tags}
      >
        {children}
      </SingleLabelContainer>
    );
  }
);
