/*
 * @Date: 2022-12-16 10:53:55
 * @LastEditTime: 2023-05-15 15:31:01
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: Antd Pro form formItemProps
 * 是 Form.Item 的属性，参见 https://ant.design/components/form-cn#formitem
 */

import { FormItemProps } from "antd/lib/form/FormItem";
import { merge } from "lodash";
import { createSchema } from "..";

export const setFormItemPropsDefaults = <T,>(
  passDefaults: FormItemProps & T
): { formItemProps: FormItemProps } => {
  const initial = {
    colon: true,
    extra: "",
    // help: "",
    hidden: false,
    noStyle: false,
    tooltip: "",
    labelAlign: "left",
    labelCol: { span: 0 },
    colProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 24 },
  };

  return {
    formItemProps: merge(initial, passDefaults),
  };
};
export const formItemName = createSchema(
  "InputSchema",
  {
    label: "formItemProps.name",
    isRequired: true,
  },
  "formItemProps.name"
);
export const formItemColon = createSchema(
  "SwitchSchema",
  {
    label: "formItemProps.colon",
  },
  "formItemProps.colon"
);
// export const formItemDependencies = createSchema(
//   "InputSchema",
//   {
//     label: "formItemProps.dependencies",
//   },
//   "formItemProps.dependencies"
// );
export const formItemExtra = createSchema(
  "InputSchema",
  {
    label: "formItemProps.extra",
  },
  "formItemProps.extra"
);
// export const formItemGetValueFromEvent = createSchema(
//   "InputSchema",
//   {
//     label: "formItemProps.getValueFromEvent",
//   },
//   "formItemProps.getValueFromEvent"
// );
export const formItemHelp = createSchema(
  "InputSchema",
  {
    label: "formItemProps.help",
  },
  "formItemProps.help"
);
export const formItemHidden = createSchema(
  "SwitchSchema",
  {
    label: "formItemProps.hidden",
  },
  "formItemProps.hidden"
);
// export const formItemHtmlFor = createSchema(
//   "InputSchema",
//   {
//     label: "formItemProps.htmlFor",
//   },
//   "formItemProps.htmlFor"
// );
export const formItemInitialValue = createSchema(
  "InputSchema",
  {
    label: "formItemProps.initialValue",
  },
  "formItemProps.initialValue"
);
export const formItemLabelAlign = createSchema(
  "SelectSchema",
  {
    label: "formItemProps.labelAlign",
  },
  "formItemProps.labelAlign",
  {
    mapData: [
      { label: "左对齐", value: "left" },
      { label: "右对齐", value: "right" },
    ],
  }
);
export const formItemLabelCol = createSchema(
  "InputNumberSchema",
  {
    label: "formItemProps.labelCol",
  },
  "formItemProps.labelCol.span",
  { min: 0, max: 24 }
);
export const formItemNoStyle = createSchema(
  "SwitchSchema",
  {
    label: "formItemProps.noStyle",
  },
  "formItemProps.noStyle"
);
export const formItemTooltip = createSchema(
  "InputSchema",
  {
    label: "formItemProps.tooltip",
  },
  "formItemProps.tooltip"
);
export const formItemRequired = createSchema(
  "SwitchSchema",
  "antdPropDesc.required",
  "formItemProps.required"
);

export const createFormItemColProps = (label: string, props: string) =>
  createSchema(
    "InputNumberSchema",
    {
      label,
      labelWidth: "200px",
    },
    props,
    { min: 0, max: 24 }
  );
