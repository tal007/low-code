/*
 * @Date: 2022-10-26 13:55:33
 * @LastEditTime: 2023-05-12 15:37:49
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 图片
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { marginAndPaddingDefault } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { ImageSetting } from "./setting";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { ImageProps } from "./index.d";

const NAME = "Image";
const widgetName = displayName(NAME);
const defaultProps = {
  ...marginAndPaddingDefault,
  name: "",
  vertical: false,
  width: "200px",
  height: "200px",
  alt: "",
  preview: false,
  src: "/vite.svg",
  uploadSrc: "",
};
export const ImageComponent = Component;
export const ImageRenderView = (props: Partial<ImageProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

ImageRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: ImageSetting,
  },
};

export const Image: CommonButtonTypes = {
  ...generateWidgetOptions("Image", "show"),
  icon: "image",
  tags: ["show"],
  render: (
    <Element
      canvas
      is={ImageRenderView}
      custom={{
        displayName: widgetName,
        tags: ["show"],
        componentName: "ImageComponent",
      }}
    />
  ),
};
