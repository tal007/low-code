/*
 * @Date: 2023-04-24 10:16:11
 * @LastEditTime: 2023-04-25 14:20:02
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 省市区组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface ComponentProps extends FormWidgetContainerProps {
  format: "City" | "Area" | "Town";
}

export interface CascaderOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}
export type CascaderValue = string | null;
export type CascaderValueExtend = {
  items: (CascaderOption | null)[];
  isLeaf: boolean;
};
export interface ProvinceProps {
  code: string;
  name: string;
  provinceCode?: string;
  areaCode?: string;
  cityCode?: string;
  children?: CascaderOption[];
}
// 移动端联级选择器组件prop
export interface CascaderMobileProps {
  placeholder: string;
  label: string;
  options: CascaderOption[];
  onSelect: function;
}

export interface MobileCascaderContainerProps {
  borderBottomColor: string;
  arrowColor: string;
}
