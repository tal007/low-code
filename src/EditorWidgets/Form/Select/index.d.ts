/*
 * @Date: 2023-05-12 15:05:34
 * @LastEditTime: 2023-05-12 15:05:36
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 下拉框ts定义
 */
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { ProFormSelectProps } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import { Children, Events } from "../../types";
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

export interface SelectRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children,
    FormWidgetContainerProps {
  dataSource: {
    dataSourceType: DataSourceType;
    staticData?: DefaultOptionType[];
  };
  fieldProps?: FieldProps<any> &
    SelectProps<string, DefaultOptionType> &
    ProFormSelectProps;
  formItemProps?: ProFormFieldItemProps<ProFormSelectProps>;
  common: Record<string, any>;
}
