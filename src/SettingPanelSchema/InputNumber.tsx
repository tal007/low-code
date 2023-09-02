/*
 * @Date: 2022-10-11 14:26:10
 * @LastEditTime: 2022-12-20 17:22:22
 * @LastEditors: 刘玉田
 * @Description: 数字输入框
 */

import {
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from "antd";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { setValue } from "./helper";

export interface InputNumberProps
  extends AntdInputNumberProps,
    PanelSchemaProps {
  defaultValue: string | number;
  onChange?: (value: string | number) => void;
  [key: string]: any;
}

export const InputNumber = (props: InputNumberProps) => {
  const {
    type = "text",
    setProp,
    propName,
    defaultValue,
    onChange,
    ...rest
  } = props;

  return (
    <AntdInputNumber
      type={type}
      value={defaultValue}
      defaultValue={defaultValue}
      onChange={value => {
        if (value !== null) {
          onChange
            ? onChange(value)
            : setProp(props => setValue(props, propName, value), 500);
        } else {
          onChange
            ? onChange(undefined)
            : setProp(props => setValue(props, propName, undefined), 500);
        }
      }}
      style={{ width: 200 }}
      {...rest}
    />
  );
};

// Pick<SchemaItemType, 'children'> 只有 children
// Omit<SchemaItemType, 'children'> 除了 children
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: InputNumberProps;
}
export const InputNumberSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <InputNumber {...childProps} />
    </SchemaItem>
  );
};
