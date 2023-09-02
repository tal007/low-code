/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-13 10:32:13
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-23 16:13:19
 * @Description: 钉钉版本组件库
 */

import { CommonButtonTypes } from "@/EditorWidgets/Common";
import { ContainerRenders, ContainerWidgets } from "@/EditorWidgets/Container";
import { Root } from "@/EditorWidgets/Container/Root";
import { FormRenders, FormWidgets } from "@/EditorWidgets/Form";
import { ShowRenders, ShowWidgets } from "@/EditorWidgets/Show";
import { DropTip } from "@/EditorWidgets/Common/DropTip";

export interface WidgetsT<T> {
  container: T;
  form: T;
  show: T;
  // button: T;
  // layout: T;
  // modal: T;
  user: T;
  extra: T;
}

export type WidgetsType = WidgetsT<{
  [keys: string]: CommonButtonTypes;
}>;

// 这里的顺序为左侧面板组件的顺序
export const widgets: Partial<WidgetsType> = {
  container: ContainerWidgets,
  // layout: LayoutWidgets,
  // modal: ModalWidgets,
  form: FormWidgets,
  // show: ShowWidgets,
  // button: ButtonWidgets,
  user: {},
  extra: {},
};

export const widgetsMap: { [key: string]: CommonButtonTypes } = {
  // ...ContainerWidgets,
  ...FormWidgets,
};

export const resolver = {
  Root,
  DropTip,
  ...ContainerRenders,
  // ...LayoutRenders,
  ...FormRenders,
  // ...ShowRenders,
  // ...ButtonRenders,
};

export default widgets;
