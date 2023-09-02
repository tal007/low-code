/*
 * @Date: 2022-09-27 10:37:56
 * @LastEditTime: 2023-01-05 11:57:08
 * @LastEditors: 刘玉田
 * @Description: 复选按钮
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";

import { KeyValueInputItemProps } from "@/SettingPanelSchema/components/KeyValueInput";
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { Element } from "@craftjs/core";
import { useState } from "react";
import { CheckboxSetting } from "./CheckboxSetting";
import { useEditorAction, useEvents } from "./../../hooks";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import {
  ProFormCheckbox,
  ProFormCheckboxGroupProps,
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
  fieldProps?: FieldProps<HTMLInputElement> & ProFormCheckboxGroupProps;
  formItemProps?: ProFormFieldItemProps<ProFormCheckboxGroupProps>;
  common: Record<string, any>;
}

const NAME = "Checkbox";
const widgetName = displayName(NAME);

const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults({ layout: "horizontal" }),
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
  onEvent: {},
};

export const CheckboxRenderView = (props: Partial<RadioRenderViewProps>) => {
  const [value, setValue] = useState([]);

  const { enabled } = useEditorAction();

  const { formItemProps, fieldProps, dataSource, onEvent, common } = props;
  const { staticData } = dataSource;

  const changeHandler = useEvents("change", onEvent);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues);
    changeHandler(checkedValues);
    setValue(checkedValues);
  };
  // TODO 处理数据
  // console.log('dataSource', dataSource);

  return (
    <FormWidgetContainer {...props}>
      <ProFormCheckbox.Group
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
      ></ProFormCheckbox.Group>
    </FormWidgetContainer>
  );
};

CheckboxRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: CheckboxSetting,
  },
};

export const Checkbox: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "square-check",
  tags: ["form"],
  preview: (
    <>
      <ProFormCheckbox.Group
        fieldProps={{
          options: defaultProps.dataSource.staticData,
        }}
      ></ProFormCheckbox.Group>
    </>
  ),
  render: (
    <Element
      canvas
      is={CheckboxRenderView}
      custom={{ displayName: widgetName, tags: ["form"] }}
    ></Element>
  ),
};
