/*
 * @Date: 2022-10-11 17:27:49
 * @LastEditTime: 2022-12-23 09:46:20
 * @LastEditors: 刘玉田
 * @Description: 按钮
 */

import { Button } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const CheckboxButtonContainer = styled.div`
  .ant-btn {
    margin-left: 2px;
    border-radius: 0;

    :hover,
    :focus,
    :active {
      border-color: #d9d9d9;
    }

    &.checked {
      border-color: var(--colorPrimary);
      color: var(--colorPrimary);

      :active {
        border-color: var(--colorPrimary);
      }
    }
  }
`;

export interface CheckboxButtonProps {
  onChange: (value: boolean) => void;
  label?: string | React.ReactNode;
  defaultValue: boolean;
  style?: React.CSSProperties;
  icon?: IconProp;
}

export const CheckboxButton = (props: CheckboxButtonProps) => {
  const { onChange, label, defaultValue, style, icon } = props;

  const [checked, setChecked] = useState(defaultValue);

  return (
    <CheckboxButtonContainer>
      <Button
        className={checked ? "checked" : ""}
        style={style}
        onClick={() => {
          setChecked(!checked);
          onChange(!checked);
        }}
        icon={<FontAwesomeIcon icon={icon} />}
      >
        {label && label}
      </Button>
    </CheckboxButtonContainer>
  );
};
