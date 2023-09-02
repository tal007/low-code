/*
 * @Date: 2023-05-08 11:26:44
 * @LastEditTime: 2023-05-08 11:26:48
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 单选框组件ts定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { KeyValueInputItemProps } from "@/SettingPanelSchema/components/KeyValueInput";
import { StyleContainerProps } from "../../Common/StyleContainer";
import { Children, Events } from "../../types";
export interface RadioProps extends FormWidgetContainerProps {
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
export interface RadioRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children,
    RadioProps {}
