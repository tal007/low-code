/*
 * @Date: 2022-12-19 15:27:41
 * @LastEditTime: 2023-01-05 12:09:15
 * @LastEditors: 刘玉田
 * @Description: 滑块
 */

import { WidthAndHeight } from "@/SettingPanelSchema/settingRender/widthAndHeight";
import { Element } from "@craftjs/core";
import { SliderSingleProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { useEditorAction, useEvents } from "../../hooks";
import { SliderSetting } from "./SliderSetting";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormSlider, ProFormSliderProps } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { SliderRangeProps } from "antd/es/slider";
import { Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface SliderRenderViewProps
  extends WidthAndHeight,
    Events,
    StyleContainerProps {
  fieldProps?: FieldProps<unknown> & (SliderSingleProps | SliderRangeProps);
  formItemProps?: ProFormFieldItemProps<ProFormSliderProps>;
  common: Record<string, any>;
}

const NAME = "Slider";
const widgetName = displayName(NAME);

export const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults({ max: 100, min: 0, step: 1 }),
  ...setCommonDefaults(),
  onEvent: {},
};

export const SliderRenderView = (props: Partial<SliderRenderViewProps>) => {
  const { enabled } = useEditorAction();
  const { fieldProps, formItemProps, onEvent } = props;
  const changeHandler = useEvents("change", onEvent);

  return (
    <FormWidgetContainer {...props}>
      <ProFormSlider
        {...formItemProps}
        fieldProps={{
          ...fieldProps,
          disabled: enabled || fieldProps.disabled,
          onChange: changeHandler,
        }}
        step={fieldProps.step}
        max={fieldProps.max}
        min={fieldProps.min}
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

SliderRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: SliderSetting,
  },
};

export const Slider: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "sliders",
  tags: ["form"],
  preview: <ProFormSlider />,
  render: (
    <Element
      canvas
      is={SliderRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
