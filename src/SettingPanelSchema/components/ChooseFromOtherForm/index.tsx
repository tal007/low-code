/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-23 15:11:59
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-23 15:26:43
 * @Description: 从其他表单选择数据配置面板
 */
import { MPContainer } from "@/style";
import { Select, Space } from "antd";
import { useState } from "react";

const optionsForm = [
  { label: "表单1", value: "form-1" },
  { label: "表单2", value: "form-2" },
  { label: "表单3", value: "form-3" },
];

const optionsField = [
  { label: "字段1", value: "filed-1" },
  { label: "字段2", value: "filed-2" },
  { label: "字段3", value: "filed-3" },
];

export interface ChooseFromOtherFormProps {
  onFormSelected: (value: string) => void;
  onFieldSelected: (value: string) => void;
}

export const ChooseFromOtherForm = (props: ChooseFromOtherFormProps) => {
  const { onFormSelected, onFieldSelected } = props;
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedField, setSelectedField] = useState("");

  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <div>
        <MPContainer margin={"0 0 8px 0"} padding={0}>
          选择表单
        </MPContainer>
        <Select
          style={{ width: "100%" }}
          placeholder="请选择表单"
          onSelect={v => {
            setSelectedForm(v);
            onFormSelected(v);
          }}
          options={optionsForm}
        ></Select>
      </div>
      <div>
        <MPContainer margin={"0 0 8px 0"} padding={0}>
          选择字段
        </MPContainer>
        <Select
          style={{ width: "100%" }}
          placeholder="请选择字段"
          disabled={!selectedForm}
          options={optionsField}
          onSelect={v => {
            setSelectedField(v);
            onFieldSelected(v);
          }}
        ></Select>
      </div>
    </Space>
  );
};
