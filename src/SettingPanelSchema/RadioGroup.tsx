/*
 * @Date: 2022-10-11 15:09:46
 * @LastEditTime: 2023-05-19 11:05:19
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 按钮组
 */

import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import {
  Radio,
  RadioChangeEvent,
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps,
} from "antd";
import { useTranslation } from "react-i18next";
import { setValue } from "./helper";
import { useEditor, useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import { hasGridContainer } from "@/EditorWidgets/CommonSettings";
import React from "react";

export interface RadioGroupChildProps extends RadioProps {
  label: string | React.ReactNode | [string, object];
  value: string | number;
  translate?: boolean;
  [key: string]: any;
}

export interface RadioGroupProps extends AntdRadioGroupProps, PanelSchemaProps {
  defaultValue: string | number;
  mapData: RadioGroupChildProps[];
  onChange?: (e: RadioChangeEvent) => void;
  [key: string]: any;
}

export const RadioGroup = (props: Partial<RadioGroupProps>) => {
  const {
    defaultValue,
    setProp,
    propName,
    mapData,
    onChange,
    optionType,
    className,
    paddingLeft,
    paddingRight,
  } = props;
  const { t } = useTranslation();
  const { query } = useEditor();
  const [initValue, setInitValue] = useState(defaultValue);
  const { nodeProps, parent } = useNode(node => ({
    nodeProps: node.data.props,
    parent: node.data.parent,
  }));

  useEffect(() => {
    if (nodeProps?.colSpan) {
      setInitValue(nodeProps?.colSpan);
    } else {
      // 默认设置: cannot access 'RadioGroupSchema' before initialization
      if (!parent && !setProp) {
        return;
      }
      const parentNode = query.node(parent).toSerializedNode();
      if (
        hasGridContainer(parentNode.custom.tags, "container") &&
        typeof setProp === "function"
      ) {
        return setProp(
          props =>
            setValue(
              props,
              "colSpan",
              Number(import.meta.env.VITE_APP_GRID_COLSPAN)
            ),

          500
        );
      }
    }
  }, [nodeProps?.colSpan, parent, query, setProp]);
  const changeHandler = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    setInitValue(value);
    if (onChange) {
      onChange(e);
    } else {
      setProp(props => setValue(props, propName, value), 500);
    }
  };

  const renderLabel = (data: RadioGroupChildProps) => {
    const { translate = true, label } = data;
    let result;

    if (typeof label === "string" || Array.isArray(label)) {
      if (translate) {
        result = t.apply(null, [...[label].flat(999)]);
      } else {
        result = label;
      }
    } else {
      result = label;
    }

    return result;
  };

  return (
    <Radio.Group
      value={initValue}
      onChange={changeHandler}
      optionType={optionType || "button"}
      className={className || ""}
    >
      {mapData?.map(data => {
        const { value } = data;
        return (
          <Radio
            key={value}
            value={value}
            style={{
              paddingLeft: paddingLeft ?? "10px",
              paddingRight: paddingRight ?? "10px",
            }}
          >
            {renderLabel(data)}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: RadioGroupProps;
}
export const RadioGroupSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <RadioGroup {...childProps} />
    </SchemaItem>
  );
};
