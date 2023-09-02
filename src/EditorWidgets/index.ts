/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-09-26 17:52:21
 * @LastEditTime: 2023-05-11 09:50:02
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */

import { Fragment } from "react";
import { CommonButtonTypes } from "./Common";
import { Root } from "./Container/Root";
import {
  ContainerWidgets,
  ContainerRenders,
  ContainerComponents,
} from "./Container";
import { FormWidgets, FormRenders, FormComponents } from "./Form";
import { ShowWidgets, ShowRenders, ShowComponents } from "./Show";
import { ButtonWidgets, ButtonRenders } from "./Button";
import { LayoutWidgets, LayoutRenders } from "./Layout";
import { ModalWidgets, ModalRenders } from "./Modal";

export interface WidgetsT<T> {
  container: T;
  form: T;
  show: T;
  // button: T;
  layout: T;
  // modal: T;
  user: T;
  extra: T;
}

export type WidgetsType = WidgetsT<{
  [keys: string]: CommonButtonTypes;
}>;

// 这里的顺序为左侧面板组件的顺序
export const widgets: WidgetsType = {
  container: ContainerWidgets,
  layout: LayoutWidgets,
  // modal: ModalWidgets,
  form: FormWidgets,
  show: ShowWidgets,
  // button: ButtonWidgets,
  user: {},
  extra: {},
};

export const widgetsMap: { [key: string]: CommonButtonTypes } = {
  ...ContainerWidgets,
  ...FormWidgets,
};

export const resolver = {
  Root,
  Fragment,
  ...ContainerRenders,
  ...LayoutRenders,
  ...ModalRenders,
  ...FormRenders,
  ...ShowRenders,
  ...ButtonRenders,
};
export const components = {
  ...FormComponents,
  ...ShowComponents,
  ...ContainerComponents,
};

export default widgets;
