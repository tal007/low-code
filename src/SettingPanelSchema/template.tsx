/*
 * @Date: 2022-10-26 15:37:59
 * @LastEditTime: 2023-05-04 10:49:01
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 边框
 */

import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { PanelSchemaProps } from "./types";

export type BorderProps = PanelSchemaProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Border = (props: BorderProps) => {
  return null;
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: BorderProps;
}
export const BorderSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Border {...childProps} />
    </SchemaItem>
  );
};
