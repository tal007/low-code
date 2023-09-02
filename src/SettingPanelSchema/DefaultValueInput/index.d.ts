/*
 * @Date: 2023-05-04 17:18:37
 * @LastEditTime: 2023-05-10 09:20:10
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本框默认值设置ts定义
 */
import { PanelSchemaProps } from "../types";
import { SchemaItemType } from "../SchemaItem";

export interface DefaultValueProps extends PanelSchemaProps {
  [key: string]: any;
}

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: DefaultValueProps;
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
