/*
 * @Date: 2023-05-15 16:14:53
 * @LastEditTime: 2023-05-22 13:49:35
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 发起人设置
 */
import { Form, RadioChangeEvent } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { StartRadioOptions, StartBaseSelectOptions } from "./constant";
import OperateAuth from "../OperateAuth";
import { FormAuthSettingProps } from "./index.d";
import { useTranslation } from "react-i18next";
import DepartmentMember from "../DepartmentMember";
import { Enum } from "@/SettingPanelSchema/Select";
import RadioGroup from "@/component/RadioGroup";
import SelectGroup from "@/component/SelectGroup";

const StartSettingContainer = styled.div`
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
const BasicSetting = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<string>("allUser");
  const [show, setShow] = useState<boolean>(false);
  const onSelect = (value: string) => {
    if (value === "assignUser") {
      setShow(true);
    }
    setSelectedValue(value);
  };
  const onCancel = () => {
    setShow(false);
  };
  const onConfirm = (selectNodes: Partial<Enum>[]) => {
    console.log("确定", selectNodes);
  };

  return (
    <Form.Item
      labelCol={{ span: 24 }}
      name="approvalUser"
      label={t("start.approverMemberTips", { ns: "flowPath" })}
    >
      {/* <Select
        value={selectedValue}
        onSelect={onSelect}
        style={{ width: "100%" }}
        options={StartBaseSelectOptions}
      /> */}
      <SelectGroup
        ns="flowPath"
        value={selectedValue}
        onSelect={onSelect}
        style={{ width: "100%" }}
        options={StartBaseSelectOptions}
      />
      <DepartmentMember show={show} onCancel={onCancel} onConfirm={onConfirm} />
    </Form.Item>
  );
};

const StartComponent = (props: Partial<FormAuthSettingProps>) => {
  console.log(props);
  const [selectValue, setSelectValue] = useState<string>("basic");

  // 单选框切换
  const onChange = (e: RadioChangeEvent) => {
    const selectValue = e.target.value;
    setSelectValue(selectValue);
  };

  return (
    <StartSettingContainer>
      <RadioGroup
        className="radioGroup"
        ns="flowPath"
        options={StartRadioOptions}
        value={selectValue}
        onChange={onChange}
      />
      {selectValue === "basic" ? (
        <BasicSetting />
      ) : (
        <OperateAuth id="start-event" />
      )}
    </StartSettingContainer>
  );
};
export default StartComponent;
