/*
 * @Date: 2022-10-08 16:00:51
 * @LastEditTime: 2023-05-12 17:45:44
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 展示组件集合
 */

import { Text, TextRenderView, TextComponent } from "./Text";
import { Image, ImageRenderView, ImageComponent } from "./Image";
import { QRCode, QRCodeRenderView, QRCodeComponent } from "./QRCode";
import {
  Statistic,
  StatisticRenderView,
  StatisticComponent,
} from "./Statistic";
import { TextLink, TextLinkRenderView, TextLinkComponent } from "./TextLink";

export const ShowWidgets = {
  Text,
  Image,
  QRCode,
  Statistic,
  TextLink,
};

export const ShowRenders = {
  TextRenderView,
  ImageRenderView,
  QRCodeRenderView,
  StatisticRenderView,
  TextLinkRenderView,
};
export const ShowComponents = {
  TextLinkComponent,
  ImageComponent,
  QRCodeComponent,
  TextComponent,
  StatisticComponent,
};
