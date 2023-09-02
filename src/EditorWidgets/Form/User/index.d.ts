/**
 * @author 梁强
 * @filename index.d.ts
 * @date 2023-05-11 星期四
 * @description
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Events } from "../../types";
import { DefaultOptionType } from "antd/es/select";

export interface UserComponentViewProps
  extends FormWidgetContainerProps,
    Events {
  userOptions: DefaultOptionType[];
  placeholder: string;
  optionalRange: number;
  userOptionsMode: number;
  mainGate: boolean;
  [key: string]: any;
}
