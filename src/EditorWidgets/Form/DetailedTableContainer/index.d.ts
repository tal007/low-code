/**
 * @author 梁强
 * @filename index.d.tsx
 * @date 2023-04-26 星期三
 * @description DetailedTableContainerProps
 */
import { ContainerRenderViewProps } from "@/EditorWidgets/Container/Container";
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";

type IFillingMethod = "list" | "table";

type IPrintFormat = "horizontal" | "vertical";

export interface DetailedTableContainerProps
  extends FormWidgetContainerProps,
    ContainerRenderViewProps {
  name: string;
  actionName: string;
  fillingMethod: IFillingMethod;
  printFormat: IPrintFormat;
  children: React.ReactElement;
}

export type DetailedTableContainerDataSourceType = {
  id: React.Key;
  title?: string;
  [key: string]: any;
};
