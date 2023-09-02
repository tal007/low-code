/*
 * @Date: 2022-12-12 10:54:48
 * @LastEditTime: 2023-05-04 10:49:49
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: Antd Pro form fieldProps
 * 是 Form.Item包含的子组件 的属性 不同的组件属性不同 例如 Input 与 InputNumber就有所差异
 */
import { merge } from "lodash";
import { createSchema } from "..";

export const setFieldPropsDefaults = (
  passDefaults?: Record<string, any>
): { fieldProps: Record<string, any> } => {
  const initial = {
    placeholder: "",
    allowClear: true,
    disabled: false,
    readOnly: false,
  };

  return {
    fieldProps: merge(initial, passDefaults),
  };
};

export const placeholder = createSchema(
  "InputSchema",
  "antdPropDesc.placeholder",
  "fieldProps.placeholder"
);
export const maxLength = createSchema(
  "InputNumberSchema",
  "antdPropDesc.maxLength",
  "fieldProps.maxLength",
  {
    min: 0,
  }
);
export const showCount = createSchema(
  "SwitchSchema",
  "antdPropDesc.showCount",
  "fieldProps.showCount"
);
export const allowClear = createSchema(
  "SwitchSchema",
  "antdPropDesc.allowClear",
  "fieldProps.allowClear"
);
export const background = createSchema(
  "BackgroundSchema",
  "propSettingHeader.background",
  "fieldProps.background"
);
export const max = createSchema(
  "InputNumberSchema",
  "antdPropDesc.max",
  "fieldProps.max"
);
export const min = createSchema(
  "InputNumberSchema",
  "antdPropDesc.min",
  "fieldProps.min"
);
export const step = createSchema(
  "InputNumberSchema",
  "antdPropDesc.step",
  "fieldProps.step",
  { min: 0.01 }
);
export const disabled = createSchema(
  "SwitchSchema",
  "antdPropDesc.disabled",
  "fieldProps.disabled"
);
export const readOnly = createSchema(
  "SwitchSchema",
  "antdPropDesc.readOnly",
  "fieldProps.readOnly"
);
