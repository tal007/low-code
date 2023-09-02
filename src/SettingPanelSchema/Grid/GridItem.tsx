/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-10-11 13:38:03
 * @LastEditTime: 2023-05-04 10:55:43
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { useNode } from "@craftjs/core";
import { Row, Col } from "antd";

export type GridItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};
export const GridItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: GridItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode(node => ({
    propValue: node.data.props[propKey],
  }));
  const value = Array.isArray(propValue) ? propValue[index] : propValue;

  return <Row gutter={[16, 16]}></Row>;
};
