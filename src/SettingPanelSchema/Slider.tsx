/*
 * @Date: 2022-10-18 09:48:28
 * @LastEditTime: 2022-12-12 10:16:13
 * @LastEditors: 刘玉田
 * @Description: 滑块
 */
import {
  Slider as AntdSlider,
  SliderSingleProps as AntdSliderProps,
} from "antd";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { setValue } from "./helper";

export interface SliderProps extends AntdSliderProps, PanelSchemaProps {
  defaultValue: number;
  [key: string]: any;
}

export const Slider = (props: SliderProps) => {
  const { setProp, propName, defaultValue, marks, ...rest } = props;
  const index = Object.values(marks).findIndex(value => value === defaultValue);

  return (
    <AntdSlider
      marks={marks}
      value={index}
      onChange={(value: number) => {
        setProp(props => setValue(props, propName, marks[value]), 500);
      }}
      style={{ width: "100%" }}
      {...rest}
    />
  );
};

// Pick<SchemaItemType, 'children'> 只有 children
// Omit<SchemaItemType, 'children'> 除了 children
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: SliderProps;
}
export const SliderSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Slider {...childProps} />
    </SchemaItem>
  );
};
