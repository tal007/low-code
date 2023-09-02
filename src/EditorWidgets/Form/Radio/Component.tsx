/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-13 10:40:59
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-11 16:59:18
 * @Description: 单选框
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Radio as RadioPC, Select, Space } from "antd";
import { useState } from "react";
import { RadioProps } from "./index.d";

const Component = (props: Partial<RadioProps>) => {
  const { flat, dataSource, itemVertical, placeholder } = props;
  const { staticData } = dataSource;

  const [value, setValue] = useState("");

  const onChange = value => {
    console.log(value);
    setValue(value);
  };

  return (
    <FormWidgetContainer {...props}>
      {flat ? (
        <RadioPC.Group
          onChange={e => {
            onChange(e.target.value);
          }}
          value={value}
        >
          <Space direction={itemVertical ? "vertical" : "horizontal"}>
            {staticData.map(item => {
              return (
                <RadioPC
                  key={item.label}
                  value={item.value}
                  onClick={() => {
                    if (item.value === value) setValue("");
                  }}
                >
                  {item.label}
                </RadioPC>
              );
            })}
          </Space>
        </RadioPC.Group>
      ) : (
        <Select
          placeholder={placeholder}
          style={{ width: "100%" }}
          options={staticData}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          value={value}
          onChange={e => {
            onChange(e);
          }}
        />
      )}
    </FormWidgetContainer>
  );
};

export default Component;
