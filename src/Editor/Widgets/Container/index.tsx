/*
 * @Date: 2022-09-27 15:04:53
 * @LastEditTime: 2022-10-19 14:48:59
 * @LastEditors: 刘玉田
 * @Description: 容器入口文件
 */

import { Container, ContainerRenderView } from "./Container";
import { Grid, GridRenderView } from "./Grid";
import { Form, FormRenderView } from "./Form";
import { Iframe, IframeRenderView } from "./Iframe";

export const ContainerWidgets = {
  Container,
  Grid,
  Form,
  Iframe,
};

export const ContainerRenders = {
  ContainerRenderView,
  GridRenderView,
  FormRenderView,
  IframeRenderView,
};
