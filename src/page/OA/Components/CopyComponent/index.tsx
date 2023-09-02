/*
 * @Date: 2023-05-15 16:14:53
 * @LastEditTime: 2023-05-22 11:12:20
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 发起人设置
 */
import { RadioChangeEvent } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { CopyRadioOptions } from "./constant";
import OperateAuth from "../OperateAuth";
import { SendComponentProps } from "./index.d";
import CopyPersonSetting from "./CopyPersonSetting";
import RadioGroup from "@/component/RadioGroup";

const CopyComponentContainer = styled.div`
  .radioGroup {
    width: 100%;
    margin-bottom: 10px;
    white-space: nowrap;
    display: flex;
    label {
      flex: 1;
      text-align: center;
    }
  }
`;

const CopyComponent = (props: Partial<SendComponentProps>) => {
  const { id } = props;
  const [selectValue, setSelectValue] = useState<string>("basic");

  // 单选框切换
  const onChange = (e: RadioChangeEvent) => {
    const selectValue = e.target.value;
    setSelectValue(selectValue);
  };

  return (
    <CopyComponentContainer>
      <RadioGroup
        className="radioGroup"
        ns="flowPath"
        options={CopyRadioOptions}
        value={selectValue}
        onChange={onChange}
      />
      {selectValue === "basic" ? (
        <CopyPersonSetting />
      ) : (
        <OperateAuth id={id} />
      )}
    </CopyComponentContainer>
  );
};
export default CopyComponent;
