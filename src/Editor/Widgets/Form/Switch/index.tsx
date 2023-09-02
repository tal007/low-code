/*
 * @Date: 2022-12-19 15:28:08
 * @LastEditTime: 2023-01-05 12:09:37
 * @LastEditors: 刘玉田
 * @Description: Switch 开关
 */

import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Element } from "@craftjs/core";
import { SwitchProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { useEditorAction, useEvents } from "../../hooks";
import { SwitchSetting } from "./SwitchSetting";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormSwitch, ProFormSwitchProps } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface SwitchRenderViewProps
  extends WidthAndHeight,
    Events,
    StyleContainerProps {
  fieldProps?: FieldProps<HTMLElement> & SwitchProps;
  formItemProps?: ProFormFieldItemProps<ProFormSwitchProps>;
  common: Record<string, any>;
}

const NAME = "Switch";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({
    defaultChecked: false,
    checkedChildren: "",
    unCheckedChildren: "",
  }),
  ...setCommonDefaults(),
  onEvent: {},
};

export const SwitchRenderView = (props: Partial<SwitchRenderViewProps>) => {
  const { enabled } = useEditorAction();
  const { fieldProps, formItemProps, onEvent } = props;
  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      <ProFormSwitch
        {...formItemProps}
        fieldProps={{
          ...fieldProps,
          disabled: enabled || fieldProps.disabled,
          onChange: changeHandler,
        }}
        label={
          <Element
            id="label"
            is={TextRenderView}
            text={(formItemProps.label as string) || widgetName}
          />
        }
        hidden={false}
      />
    </FormWidgetContainer>
  );
};

SwitchRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: SwitchSetting,
  },
};

export const Switch: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "toggle-on",
  tags: ["form"],
  preview: <ProFormSwitch />,
  render: (
    <Element
      canvas
      is={SwitchRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
