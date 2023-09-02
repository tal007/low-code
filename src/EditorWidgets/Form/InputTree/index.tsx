/*
 * @Date: 2022-09-27 11:40:09
 * @LastEditTime: 2023-01-05 11:45:54
 * @LastEditors: 刘玉田
 * @Description: 树形选择框
 */

import { TreeSelectProps } from "antd";
import { useState } from "react";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { displayName } from "@/i18n/widgetDisplayName";
import { InputTreeSetting } from "./InputTreeSetting";
import { useEditorAction, useEvents } from "../../hooks";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { ProFormTreeSelect } from "@ant-design/pro-components";
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

export interface InputTreeProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children {
  fieldProps?: FieldProps<any> & TreeSelectProps;
  formItemProps?: ProFormFieldItemProps<TreeSelectProps>;
  common: Record<string, any>;
}

const NAME = "InputTree";
const widgetName = displayName(NAME);
const defaultProps = {
  ...styleDefault,
  ...setFormItemPropsDefaults({ name: NAME }),
  ...setFieldPropsDefaults(),
  ...setCommonDefaults(),
  onEvent: {},
};

export const InputTreeRenderView = (props: Partial<InputTreeProps>) => {
  const [, setValue] = useState<string | undefined>(undefined);
  const { enabled } = useEditorAction();

  const { formItemProps, fieldProps, onEvent } = props;
  const changeHandler = useEvents("change", onEvent);
  const onChange = (newValue: string) => {
    setValue(newValue);
    changeHandler(newValue);
  };

  return (
    <FormWidgetContainer {...props}>
      <ProFormTreeSelect
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
          onChange,
          disabled: enabled || fieldProps.disabled,
        }}
        request={async () => {
          return [
            {
              title: "Node1",
              value: "0-0",
              children: [
                {
                  title: "Child Node1",
                  value: "0-0-0",
                },
              ],
            },
            {
              title: "Node2",
              value: "0-1",
              children: [
                {
                  title: "Child Node3",
                  value: "0-1-0",
                },
                {
                  title: "Child Node4",
                  value: "0-1-1",
                },
                {
                  title: "Child Node5",
                  value: "0-1-2",
                },
              ],
            },
          ];
        }}
        hidden={false}
      />
    </FormWidgetContainer>
  );
};

InputTreeRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  related: {
    settings: InputTreeSetting,
  },
};

export const InputTree: CommonButtonTypes = {
  ...generateWidgetOptions("InputTree", "form"),
  icon: "chevron-down",
  tags: ["form"],
  preview: <ProFormTreeSelect />,
  render: (
    <Element
      canvas
      is={InputTreeRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
      }}
    ></Element>
  ),
};
