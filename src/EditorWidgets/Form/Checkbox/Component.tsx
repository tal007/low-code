/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-13 13:39:35
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-18 16:07:03
 * @Description: 多选框
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Checkbox as CheckboxPC, Select, Space } from "antd";
import { useState } from "react";
import { CheckboxProps } from "./index.d";

const Component = (props: Partial<CheckboxProps>) => {
  const { flat, dataSource, itemVertical, placeholder } = props;
  const { staticData } = dataSource;
  const [value, setValue] = useState([]);

  const onChange = (value: any[]) => {
    setValue(value);
  };

  return (
    <FormWidgetContainer {...props}>
      {flat ? (
        <CheckboxPC.Group
          onChange={checkedValues => {
            console.log(checkedValues);
            setValue(checkedValues);
            onChange(checkedValues);
          }}
        >
          <Space direction={itemVertical ? "vertical" : "horizontal"}>
            {staticData.map(item => {
              return (
                <CheckboxPC key={item.label} value={item.value}>
                  {item.label}
                </CheckboxPC>
              );
            })}
          </Space>
        </CheckboxPC.Group>
      ) : (
        <Select
          mode={"multiple"}
          placeholder={placeholder}
          style={{ width: "100%" }}
          options={staticData}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          value={value}
          onChange={e => {
            console.log(e);
            setValue(e);
            onChange(e);
          }}
        />
      )}
    </FormWidgetContainer>
  );
};

export default Component;
