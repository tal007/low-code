/*
 * @Date: 2022-10-10 10:42:18
 * @LastEditTime: 2023-05-19 10:46:29
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 下拉选择
 */

import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { setValue } from "./helper";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { PanelSchemaProps } from "./types";
import { useNode } from "@craftjs/core";

const { Option } = AntdSelect;

export type Enum = {
  label: string | [string, object];
  value: string | number;
  [key: string]: any;
};

export interface SelectProps extends AntdSelectProps, PanelSchemaProps {
  defaultValue: string;
  mapData: Enum[];
  [key: string]: any;
}

export const Select = (props: SelectProps) => {
  const { defaultValue, setProp, propName, mapData, ...rest } = props;

  const onChange = (value: string) => {
    setProp(props => setValue(props, propName, value), 500);
  };

  const { nodeProps } = useNode(node => {
    return {
      nodeProps: node.data.props,
    };
  });

  const { t } = useTranslation();

  return (
    <>
      <AntdSelect
        showSearch
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        defaultValue={defaultValue}
        style={{ width: 200 }}
        {...rest}
      >
        {mapData.map(item => (
          <Option key={item.value} value={item.value}>
            {item.translate
              ? t.apply(null, [...[item.label].flat(999)])
              : item.label}
          </Option>
        ))}
      </AntdSelect>
      {props?.renderextraNode && props.renderextraNode({...nodeProps, setProp})}
    </>
  );
};
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: SelectProps;
}
export const SelectSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;
  return (
    <SchemaItem {...parentProps}>
      <Select {...childProps} />
    </SchemaItem>
  );
};
