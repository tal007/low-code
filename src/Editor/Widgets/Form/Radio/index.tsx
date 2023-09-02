/*
 * @Date: 2022-09-27 10:37:56
 * @LastEditTime: 2023-01-05 11:46:26
 * @LastEditors: 刘玉田
 * @Description: 复选按钮
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";

import { KeyValueInputItemProps } from "@/SettingPanelSchema/components/KeyValueInput";
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { Element } from "@craftjs/core";
import { useState } from "react";
import { RadioSetting } from "./RadioSetting";
import { useEditorAction, useEvents } from "./../../hooks";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import {
  ProFormRadio,
  ProFormRadioGroupProps,
} from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Children, Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface RadioRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children {
  dataSource: {
    dataSourceType: DataSourceType;
    staticData?: Omit<KeyValueInputItemProps, "id">[];
  };
  fieldProps?: FieldProps<HTMLDivElement> & ProFormRadioGroupProps;
  formItemProps?: ProFormFieldItemProps<ProFormRadioGroupProps>;
  common: Record<string, any>;
}

const NAME = "Radio";
const widgetName = displayName(NAME);

const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults({ layout: "horizontal" }),
  onEvent: {},
  dataSource: {
    dataSourceType: "static",
    staticData: [
      {
        label: "选项A",
        value: "A",
      },
      {
        label: "选项B",
        value: "B",
      },
    ],
  },
};

export const RadioRenderView = (props: Partial<RadioRenderViewProps>) => {
  const [value, setValue] = useState([]);

  const { enabled } = useEditorAction();

  const { formItemProps, fieldProps, dataSource, common, onEvent } = props;
  const { staticData } = dataSource;

  // TODO 处理数据
  // console.log('dataSource', dataSource);
  const changeHandler = useEvents("change", onEvent);
  const onChange = e => {
    setValue(e.target.value);
    changeHandler(e);
  };
  return (
    <FormWidgetContainer {...props}>
      <ProFormRadio.Group
        {...formItemProps}
        label={
          <Element
            id="label"
            is={TextRenderView}
            text={(formItemProps.label as string) || widgetName}
          />
        }
        fieldProps={{
          ...fieldProps,
          name: NAME,
          value,
          options: staticData,
          onChange,
          disabled: enabled || fieldProps.disabled,
        }}
        layout={common.layout}
        hidden={false}
      ></ProFormRadio.Group>
    </FormWidgetContainer>
  );
};

RadioRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: RadioSetting,
  },
};

export const Radio: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "square-check",
  tags: ["form"],
  preview: (
    <>
      <ProFormRadio.Group
        fieldProps={{
          options: defaultProps.dataSource.staticData,
        }}
      ></ProFormRadio.Group>
    </>
  ),
  render: (
    <Element
      canvas
      is={RadioRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
