/*
 * @Date: 2022-12-23 15:29:28
 * @LastEditTime: 2023-05-15 13:57:40
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 二维码
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { styleDefault } from "../../Common/StyleContainer";
import { generateWidgetOptions } from "../../helper";
import { QRCodeSetting } from "./setting";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setQueryConfig } from "@/SettingPanelSchema/settingRender/querySetting";
import { QRCodeProps } from "./index.d";
import { Component, EditorComponent } from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";

const NAME = "QRCode";
const widgetName = displayName(NAME);
const defaultProps: Partial<QRCodeProps> = {
  ...styleDefault,
  ...setCommonDefaults(),
  value: "127.0.0.1",
  size: 160,
  iconSize: 40,
  bordered: true,
  errorLevel: "M",
  color: { r: 0, g: 0, b: 0, a: 1 },
  queryConfig: setQueryConfig(),
};
export const QRCodeComponent = Component;
export const QRCodeRenderView = (props: Partial<QRCodeProps>) => {
  return (
    <BaseContainer {...props}>
      <EditorComponent {...props} />
    </BaseContainer>
  );
};

QRCodeRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: QRCodeSetting,
  },
};

export const QRCode: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "show"),
  icon: "qrcode",
  tags: ["show"],
  render: (
    <Element
      canvas
      is={QRCodeRenderView}
      custom={{
        displayName: widgetName,
        tags: ["show"],
        componentName: "QRCodeComponent",
      }}
    />
  ),
};
