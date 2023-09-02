/*
 * @Date: 2023-05-04 17:18:37
 * @LastEditTime: 2023-05-09 16:39:39
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */

import { ButtonProps } from "antd";
import { PanelSchemaProps } from "../types";
import { SchemaItemType } from "../SchemaItem";

export interface FormulaButtonProps extends ButtonProps, PanelSchemaProps {
  [key: string]: any;
}
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: FormulaButtonProps;
}
export interface ButtonComponentsProps {
  data: string[];
  onClick: (sym: number | string, index: number) => void;
  wrap: boolean;
  label: string;
  children?: React.ReactElement;
  width?: string;
  justifyContent?: string;
}
