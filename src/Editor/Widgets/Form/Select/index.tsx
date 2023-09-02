/*
 * @Date: 2022-10-19 10:04:49
 * @LastEditTime: 2023-01-05 11:46:59
 * @LastEditors: 刘玉田
 * @Description: Select
 */

import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { useState } from "react";
import { SelectSetting } from "./SelectSetting";
import { useEditorAction, useEvents } from "./../../hooks";
import { DataSourceType } from "@/SettingPanelSchema/DataSource";
import { displayName } from "@/i18n/widgetDisplayName";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { TextRenderView } from "../../Show/Text";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { setFieldPropsDefaults } from "@/SettingPanelSchema/settingRender/fieldProps";
import { Children, Events } from "../../types";
import { FormWidgetContainer } from "../FormWidgetContainer";

export interface SelectRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children {
  dataSource: {
    dataSourceType: DataSourceType;
    staticData?: DefaultOptionType[];
  };
  fieldProps?: FieldProps<any> &
    SelectProps<string, DefaultOptionType> &
    ProFormSelectProps;
  formItemProps?: ProFormFieldItemProps<ProFormSelectProps>;
  common: Record<string, any>;
}

const NAME = "Select";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
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

export const SelectRenderView = (props: Partial<SelectRenderViewProps>) => {
  const [value, setValue] = useState("");

  const { enabled } = useEditorAction();

  const { fieldProps, formItemProps, dataSource, onEvent } = props;
  const { staticData } = dataSource;

  // TODO 处理数据
  // console.log('dataSource', dataSource);
  const changeHandler = useEvents("change", onEvent);

  const onChange = (value: string) => {
    setValue(value);
    changeHandler(value);
  };

  return (
    <FormWidgetContainer {...props}>
      <ProFormSelect.SearchSelect
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
          value,
          onChange,
          options: staticData,
          disabled: enabled || fieldProps.disabled,
        }}
        hidden={false}
      ></ProFormSelect.SearchSelect>
    </FormWidgetContainer>
  );
};

SelectRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: SelectSetting,
  },
};

export const Select: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "th-list",
  tags: ["form"],
  preview: (
    <ProFormSelect
      fieldProps={{
        options: defaultProps.dataSource.staticData,
      }}
    ></ProFormSelect>
  ),
  render: (
    <Element
      canvas
      is={SelectRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
      }}
    ></Element>
  ),
};
