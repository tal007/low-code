/*
 * @Date: 2022-10-13 14:32:37
 * @LastEditTime: 2022-12-12 10:15:36
 * @LastEditors: 刘玉田
 * @Description: switch 开关
 */

import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { setValue } from "./helper";

export interface SwitchProps extends AntdSwitchProps, PanelSchemaProps {
  [key: string]: any;
}

export const Switch = (props: SwitchProps) => {
  const { setProp, propName, defaultValue, onChange, ...rest } = props;

  return (
    <AntdSwitch
      defaultChecked={defaultValue}
      onChange={(checked, event) => {
        onChange
          ? onChange(checked, event)
          : setProp(props => setValue(props, propName, checked), 500);
      }}
      {...rest}
      style={{ width: "40px" }}
    />
  );
};

// Pick<SchemaItemType, 'children'> 只有 children
// Omit<SchemaItemType, 'children'> 除了 children
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: SwitchProps;
}
export const SwitchSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Switch {...childProps} />
    </SchemaItem>
  );
};
