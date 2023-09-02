/*
 * @Date: 2022-12-29 15:47:41
 * @LastEditTime: 2023-01-04 14:46:50
 * @LastEditors: 刘玉田
 * @Description: 图标选择
 */

import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import React from "react";
import * as icons from "@ant-design/icons";
import { Select } from "antd";
import { setValue } from "../helper";

export interface IconSelectProps extends PanelSchemaProps {
  defaultValue: string;
}

const { Option } = Select;

export const IconSelect = (props: IconSelectProps) => {
  const { setProp, defaultValue, propName } = props;
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter(item => {
    return typeof icons[item] === "object" && item !== "default";
  });

  return (
    <Select
      showSearch
      allowClear
      style={{ width: "100%" }}
      defaultValue={defaultValue}
      onChange={value => {
        setProp(props => setValue(props, propName, value), 500);
      }}
    >
      {iconList.map(item => {
        // TODO 这里的代码会报一个警告 option的 value 和 label 的值（多了一个图标）不一样
        return (
          <Option value={item} key={item}>
            {React.createElement(icons[item], { style: { marginRight: 8 } })}
            {item}
          </Option>
        );
      })}
    </Select>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: IconSelectProps;
}
export const IconSelectSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <IconSelect {...childProps} />
    </SchemaItem>
  );
};
