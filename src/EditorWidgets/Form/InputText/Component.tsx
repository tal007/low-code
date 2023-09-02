/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-12 11:01:31
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-11 16:48:03
 * @Description: 单行输入组件
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Input as InputPC } from "antd";
import { Input as InputMobile } from "antd-mobile";
import { useState } from "react";
import { InputProps } from "./index.d";
import { useDefaultValue } from "../../hooks";

const Component = (props: Partial<InputProps>) => {
  const {
    platform,
    placeholder,
    onChange: onFormChange,
    defaultValue,
    enabled,
  } = props;
  const defaultShowValue = useDefaultValue(defaultValue, enabled);
  const [inputValue, setInputValue] = useState<string>(defaultShowValue);

  const onChange = (value: string) => {
    setInputValue(value);
    onFormChange && onFormChange(value);
  };

  return (
    <FormWidgetContainer {...props} defaultValue={defaultShowValue}>
      {platform === "mobile" ? (
        <InputMobile
          placeholder={placeholder}
          clearable
          value={inputValue}
          onChange={e => onChange(e)}
        />
      ) : (
        <InputPC
          placeholder={placeholder}
          allowClear
          value={inputValue}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </FormWidgetContainer>
  );
};

export default Component;
