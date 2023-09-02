/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-23 15:41:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-23 15:44:58
 * @Description: 自定义SQL下拉选择配置面板
 */
import { MPContainer } from "@/style";
import { Space, Select } from "antd";

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

export const CustomSQLSelect = () => {
  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <div>
        <MPContainer margin={"0 0 8px 0"} padding={0}>
          文本字段
        </MPContainer>
        <Select
          style={{ width: "100%" }}
          placeholder="请选择文本字段"
          onSelect={v => {
            //
          }}
          options={optionsForm}
        ></Select>
      </div>
      <div>
        <MPContainer margin={"0 0 8px 0"} padding={0}>
          数值字段
        </MPContainer>
        <Select
          style={{ width: "100%" }}
          placeholder="请选择数值字段"
          options={optionsField}
          onSelect={v => {
            //
          }}
        ></Select>
      </div>
    </Space>
  );
};
