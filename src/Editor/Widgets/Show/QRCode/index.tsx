/*
 * @Date: 2022-12-23 15:29:28
 * @LastEditTime: 2022-12-29 16:48:24
 * @LastEditors: 刘玉田
 * @Description: 二维码
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element, useNode } from "@craftjs/core";
import { QRCode as AntdQRCode, QRCodeProps as AntdQRCodeProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import {
  StyleContainer,
  StyleContainerProps,
  styleDefault,
} from "../../Common/StyleContainer";
import { generateWidgetOptions, toColorString } from "../../helper";
import { QRCodeSetting } from "./QRCodeSetting";
import { CraftContainer } from "./../../Common/CraftContainer/index";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { RGBColor } from "react-color";
import { useQueryInitial } from "@/Editor/Widgets/hooks";
import {
  Query,
  setQueryConfig,
} from "@/SettingPanelSchema/settingRender/querySetting";

export interface QRCodeProps
  extends Omit<StyleContainerProps, "style">,
    Omit<AntdQRCodeProps, "color"> {
  common: Record<string, any>;
  name: string;
  uploadSrc: string;
  color: RGBColor;
  queryConfig: Partial<Query>;
}

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

export const QRCodeRenderView = (props: Partial<QRCodeProps>) => {
  const { value, color, common, queryConfig, ...rest } = props;
  const { id } = useNode();

  const {
    queryResult: { isLoading, error, data },
    enabled,
  } = useQueryInitial<{ url: string }>("qrcode", queryConfig, id);

  return (
    <StyleContainer {...props} style={{ display: "inline-block" }}>
      <CraftContainer<Error>
        loading={isLoading}
        error={error}
        hidden={common.hidden}
      >
        <AntdQRCode
          value={data?.data?.url || value}
          color={toColorString(color)}
          status={
            isLoading && queryConfig.url && !enabled ? "loading" : "active"
          }
          // status === expired 时候的回调函数，目前这里暂时用不到
          // onRefresh={() => {}}
          {...rest}
        />
      </CraftContainer>
    </StyleContainer>
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
  preview: <AntdQRCode value={"127.0.0.1"} errorLevel={"H"} />,
  render: (
    <Element
      canvas
      is={QRCodeRenderView}
      custom={{ displayName: widgetName, tags: ["show"] }}
    />
  ),
};
