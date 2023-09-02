/*
 * @Date: 2022-10-09 09:26:23
 * @LastEditTime: 2023-05-19 14:12:09
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 输入框
 */

import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { currentEditorConfig } from "@/store/editor.slice";
import { useSelector } from "react-redux";
import { useEditor } from "@craftjs/core";
import { setValue } from "./helper";
import { useTranslation } from "react-i18next";

export interface InputProps extends AntdInputProps, PanelSchemaProps {
  defaultValue: string | number;
  [key: string]: any;
}

export const Input = (props: InputProps) => {
  const {
    type = "text",
    setProp,
    propName,
    defaultValue,
    required,
    ...rest
  } = props;

  const editorState = useSelector(currentEditorConfig);
  const id = editorState.activeNodeId;
  const { displayName, actions } = useEditor(state => ({
    displayName:
      state.nodes[id] && state.nodes[id].data.custom.displayName
        ? state.nodes[id]?.data?.custom?.displayName
        : state.nodes[id]?.data?.displayName,
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
  }));
  const isCustomData = propName.indexOf("custom") > -1;
  const onChange = e => {
    const { value } = e.target;
    if (isCustomData) {
      const customPropName = propName.split(".")[1];
      actions.setCustom(
        id,
        custom => (custom[customPropName] = e.target.value)
      );
    } else {
      setProp(props => {
        setValue(props, propName, value);
      }, 500);
    }
  };

  const onBlur = e => {
    const { value } = e.target;
    if (value.trim() === "" && required)
      setProp(props => {
        setValue(props, propName, displayName);
      }, 500);
  };

  return (
    <AntdInput
      allowClear
      type={type}
      value={isCustomData ? displayName : defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      style={{ width: "100%" }}
      status={rest.required && defaultValue === "" ? "error" : ""}
      {...rest}
    />
  );
};

// Pick<SchemaItemType, 'children'> 只有 children
// Omit<SchemaItemType, 'children'> 除了 children
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: InputProps;
}
export const InputSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;
  const { label } = parentProps;
  const { t } = useTranslation();
  const requireTip =
    childProps.required && childProps.defaultValue === ""
      ? t("i18n.requiredTip", {
          name: t.apply(null, [...[label].flat(999)]),
          ns: "formRules",
        })
      : "";
  return (
    <SchemaItem {...parentProps} requireTip={requireTip}>
      <Input {...childProps} />
    </SchemaItem>
  );
};
