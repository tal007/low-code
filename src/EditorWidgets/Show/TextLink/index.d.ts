/*
 * @Date: 2023-04-20 10:23:52
 * @LastEditTime: 2023-04-20 10:23:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 数据展示模块的ts定义
 */
import { Color } from "@/Editor/Widgets/types";
//文字说明组件props接口定义
export interface TextLinkProps {
  href?: string;
  description: string;
  fontFamily: string;
  fontSize: number;
  fontStyle: boolean[];
  color: Color.color;
}
