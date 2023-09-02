/*
 * @Date: 2023-05-08 11:35:08
 * @LastEditTime: 2023-05-08 11:37:35
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 复选框组件ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { KeyValueInputItemProps } from "@/SettingPanelSchema/components/KeyValueInput";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { Children, Events } from "../../types";
export interface CheckboxProps extends FormWidgetContainerProps {
  name: string;
  defaultValue: string;
  flat: boolean;
  placeholder: string;
  dataSource: {
    dataSourceType: DataSourceType;
    staticData?: Omit<KeyValueInputItemProps, "id">[];
  };
  itemVertical: boolean;
}
export interface CheckboxRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children,
    CheckboxProps {}
