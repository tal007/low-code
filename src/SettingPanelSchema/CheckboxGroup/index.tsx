/*
 * @Date: 2022-10-11 16:15:44
 * @LastEditTime: 2022-12-30 14:51:41
 * @LastEditors: 刘玉田
 * @Description: 多选 checkbox 组件
 */

import { PanelSchemaProps } from "../types";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { CheckboxButton } from "./CheckboxButton";
import { FlexBox } from "@/style";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { setValue } from "../helper";

export interface CheckboxProps {
  label?: string | React.ReactNode;
  value: string | number;
  propName: string;
  icon?: IconProp;
}

export interface CheckboxGroupProps extends PanelSchemaProps {
  defaultValue: boolean[];
  mapData: CheckboxProps[];
  [key: string]: any;
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { setProp, defaultValue, mapData, propName } = props;

  return (
    <FlexBox justify={"flex-end"}>
      {mapData?.map((data, i) => (
        <CheckboxButton
          defaultValue={defaultValue[i]}
          key={data.value}
          label={data.label}
          onChange={value => {
            setProp(props => setValue(props, propName, value, i), 500);
          }}
          icon={data.icon}
        />
      ))}
    </FlexBox>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: CheckboxGroupProps;
}
export const CheckboxGroupSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <CheckboxGroup {...childProps} />
    </SchemaItem>
  );
};
