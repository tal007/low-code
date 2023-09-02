/* eslint-disable prefer-const */
/*
 * @Date: 2022-10-09 10:45:40
 * @LastEditTime: 2023-05-19 10:47:46
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: label + item 格式的项
 */

import { Popover } from "antd";
import { FlexBox, FlexBoxType } from "@/style";
import styled from "styled-components";
import { QuestionCircleOutlined } from "@ant-design/icons";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import React, { ReactNode } from "react";

interface LabelType {
  label: string | [string, object];
  subLabel?: ReactNode;
  labelWidth?: number | string;
  marginBottom?: number;
  showQuestionIcon?: boolean;
  questionPopover?: React.ReactElement | (() => React.ReactElement);
  isRequired?: boolean;
  requireTip?: ReactNode;
}
export interface SchemaItemType extends FlexBoxType, LabelType {
  children: React.ReactElement;
}

export const SchemaItem = (props: SchemaItemType) => {
  let {
    direction,
    justify = "space-between",
    alignItems,
    padding = "5px 2px",
    height,
    label,
    subLabel,
    children,
    showQuestionIcon = false,
    questionPopover,
    labelWidth,
    isRequired,
    requireTip,
  } = props;

  let marginBottom = 0;

  if (direction === "column") {
    alignItems = "flex-start";
    labelWidth = "100%";
    marginBottom = 10;
  }

  return (
    <FlexBox
      direction={direction}
      justify={justify}
      alignItems={alignItems}
      height={height}
      padding={padding}
      className="schema-item"
    >
      {label && (
        <Label
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label={label}
          subLabel={subLabel}
          showQuestionIcon={showQuestionIcon}
          questionPopover={questionPopover}
          isRequired={isRequired}
          requireTip={requireTip}
        />
      )}
      {React.cloneElement(children, { style: { width: "100%" } })}
    </FlexBox>
  );
};

const Label = (props: LabelType) => {
  const { t } = useTranslation();
  const {
    label,
    subLabel,
    showQuestionIcon,
    questionPopover,
    labelWidth,
    marginBottom,
    isRequired,
    requireTip,
  } = props;
  return (
    <LabelContainer
      className="schema-item-label"
      labelWidth={labelWidth}
      marginBottom={marginBottom}
    >
      <span
        className={cx([
          {
            required: isRequired,
          },
        ])}
      >
        {t.apply(null, [...[label].flat(999)])}
      </span>
      {subLabel && <span className="subLabel">{subLabel}</span>}
      {requireTip && <span className="required-tip">{requireTip}</span>}
      {showQuestionIcon && (
        <Popover content={questionPopover}>
          <QuestionCircleOutlined className="question" />
        </Popover>
      )}
    </LabelContainer>
  );
};
const LabelContainer = styled.div<{
  labelWidth?: number | string;
  marginBottom: number;
}>`
  width: ${props => props.labelWidth || "100px"};
  margin-right: 10px;
  margin-bottom: ${props => props.marginBottom}px;
  .question {
    margin-left: 5px;
  }

  .required {
    position: relative;

    &::before {
      content: "*";
      position: absolute;
      top: 0;
      left: -8px;
      z-index: 999;
      color: red;
    }
  }
  .subLabel {
    margin-left: 16px;
    color: #888;
  }
  .required-tip {
    margin-left: 10px;
    color: #ff4d4f;
  }
`;
