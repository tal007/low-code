/**
 * @author 梁强
 * @filename index.d.ts
 * @date 2023-04-25 星期二
 * @description UploadFileRenderViewProps
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { StyleContainerProps } from "../../Common/StyleContainer";
import UploadProps from "antd/es/upload/Upload";
import { Events } from "../../types";

export interface UploadFileRenderViewProps
  extends UploadProps,
    FormWidgetContainerProps {
  maxCount: number;
  maxMb: number; // mb
  sort: number;
  settings: number[];
  mime: number[];
}

export interface UploadExtendsProps
  extends StyleContainerProps,
    Events,
    UploadFileRenderViewProps {}
