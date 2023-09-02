/*
 * @Date: 2022-12-21 09:12:38
 * @LastEditTime: 2023-05-15 15:02:27
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 验证码
 */

import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { CaptchaSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { styleDefault } from "../../Common/StyleContainer";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setRulesDefault } from "@/SettingPanelSchema/settingRender/formRules";
import { CaptchaRenderViewProps } from "./index.d";
import Component from "./Component";
import { BaseContainer } from "@/EditorWidgets/Common/Container";

const NAME = "Captcha";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME, phoneName: "" }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
  ...setRulesDefault(),
  name: widgetName,
};
export const CaptchaComponent = Component;
export const CaptchaRenderView = (props: Partial<CaptchaRenderViewProps>) => {
  return (
    <BaseContainer {...props}>
      <Component {...props} />
    </BaseContainer>
  );
};

CaptchaRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: CaptchaSetting,
  },
};

export const Captcha: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "key",
  tags: ["form"],
  render: (
    <Element
      canvas
      is={CaptchaRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "CaptchaComponent",
      }}
    ></Element>
  ),
};
