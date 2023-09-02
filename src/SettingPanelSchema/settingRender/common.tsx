/*
 * @Date: 2022-10-20 16:07:30
 * @LastEditTime: 2023-05-16 10:54:22
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 通用属性，不区分表单，容器等组件类型
 */

import { createSchema } from "..";
import { merge } from "lodash";

export const setCommonDefaults = (passDefaults = {}) => {
  const initial = {
    hidden: false,
    disabled: false,
    readOnly: false,
  };
  return {
    common: merge(initial, passDefaults),
  };
};

export const disabled = createSchema(
  "SwitchSchema",
  "antdPropDesc.disabled",
  "common.disabled"
);
export const hidden = createSchema(
  "SwitchSchema",
  "antdPropDesc.hidden",
  "common.hidden"
);
export const readOnly = createSchema(
  "SwitchSchema",
  "antdPropDesc.readOnly",
  "common.readOnly"
);
export const layout = createSchema(
  "RadioGroupSchema",
  "antdPropDesc.layout",
  "common.layout",
  {
    mapData: [
      { label: "水平", value: "horizontal" },
      { label: "垂直", value: "vertical" },
    ],
  }
);

const SubLabel = () => {
  const { t } = useTranslation();
  return <>{t("rightPanel.i18n.max_50", { ns: "editor" })}</>;
};
const direction = "column";
const inputChildProps = {
  maxLength: 50,
};
export const basicNameSetting = createSchema(
  "InputSchema",
  {
    label: ["rightPanel.i18n.title", { ns: "editor" }],
    subLabel: <SubLabel />,
    direction,
  },
  "name",
  {
    ...inputChildProps,
    required: true,
  }
);
export const basePlaceholderSetting = createSchema(
  "InputSchema",
  {
    label: ["rightPanel.i18n.placeholder", { ns: "editor" }],
    subLabel: <SubLabel />,
    direction,
  },
  "placeholder",
  inputChildProps
);
export const vertical = createSchema(
  "SwitchSchema",
  { label: ["rightPanel.i18n.vertical", { ns: "editor" }] },
  "vertical"
);
export const itemVertical = createSchema(
  "SwitchSchema",
  { label: ["rightPanel.i18n.itemVertical", { ns: "editor" }] },
  "vertical"
);
export const required = createSchema(
  "SwitchSchema",
  { label: ["rightPanel.i18n.required", { ns: "editor" }] },
  "required"
);
export const flat = createSchema(
  "SwitchSchema",
  { label: ["rightPanel.i18n.flat", { ns: "editor" }] },
  "flat"
);
