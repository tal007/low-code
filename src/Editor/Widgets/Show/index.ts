/*
 * @Date: 2022-10-08 16:00:51
 * @LastEditTime: 2022-12-29 15:07:40
 * @LastEditors: 刘玉田
 * @Description: 展示组件集合
 */

import { Text, TextRenderView } from "./Text";
import { Image, ImageRenderView } from "./Image";
import { QRCode, QRCodeRenderView } from "./QRCode";
import { Statistic, StatisticRenderView } from "./Statistic";

export const ShowWidgets = {
  Text,
  Image,
  QRCode,
  Statistic,
};

export const ShowRenders = {
  TextRenderView,
  ImageRenderView,
  QRCodeRenderView,
  StatisticRenderView,
};
