/*
 * @Date: 2022-10-24 16:48:04
 * @LastEditTime: 2023-05-04 10:50:52
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Input as AntdInput } from "antd";
import type { TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { setValue } from "./helper";

export interface TextAreaProps extends PanelSchemaProps, AntdTextAreaProps {
  defaultValue: string | number;
  [key: string]: any;
}

export const TextArea = (props: TextAreaProps) => {
  const { setProp, propName, defaultValue, onChange, ...rest } = props;

  return (
    <AntdInput.TextArea
      value={defaultValue}
      onChange={e => {
        const { value } = e.target;
        onChange
          ? onChange(e)
          : setProp(props => setValue(props, propName, value), 500);
      }}
      {...rest}
    />
  );
};

// Pick<SchemaItemType, 'children'> 只有 children
// Omit<SchemaItemType, 'children'> 除了 children
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: TextAreaProps;
}
export const TextAreaSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <TextArea {...childProps} />
    </SchemaItem>
  );
};
