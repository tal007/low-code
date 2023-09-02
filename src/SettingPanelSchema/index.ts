/*
 * @Date: 2022-10-09 09:24:00
 * @LastEditTime: 2023-05-10 13:57:04
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 设置面板
 */

import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { Input, InputSchema } from "./Input";
import { TextArea, TextAreaSchema } from "./TeatArea";
import { InputNumber, InputNumberSchema } from "./InputNumber";
import { InputColor, InputColorSchema } from "./InputColor";
import { Select, SelectSchema } from "./Select";
import { RadioGroup, RadioGroupSchema } from "./RadioGroup";
import { CheckboxGroup, CheckboxGroupSchema } from "./CheckboxGroup";
import { Switch, SwitchSchema } from "./Switch";
import { DataSource, DataSourceSchema } from "./DataSource";
import { Slider, SliderSchema } from "./Slider";
import { Background, BackgroundSchema } from "./Background";
import { Upload, UploadSchema } from "./Upload";
import { MarginAndPadding, MarginAndPaddingSchema } from "./MarginAndPadding";
import { Border, BorderSchema } from "./Border";
import { BorderRadius, BorderRadiusSchema } from "./Border/BorderRadius";
import { QueryModal, QueryModalSchema } from "./QueryModal";
import { IconSelect, IconSelectSchema } from "./Icons";
import { TabsRadioBox, TabsRadioSchema } from "./TabsRadioBox";
import { FormulaButton, FormulaButtonSchema } from "./FormulaModal";
import {
  DefaultValueInput,
  DefaultValueInputSchema,
} from "./DefaultValueInput";
import { MultipleCheckbox, MultipleCheckboxSchema } from "./MultipleCheckbox";

export const Schema = {
  InputSchema,
  InputColorSchema,
  SelectSchema,
  InputNumberSchema,
  RadioGroupSchema,
  CheckboxGroupSchema,
  SwitchSchema,
  DataSourceSchema,
  SliderSchema,
  BackgroundSchema,
  TextAreaSchema,
  UploadSchema,
  MarginAndPaddingSchema,
  BorderSchema,
  BorderRadiusSchema,
  QueryModalSchema,
  IconSelectSchema,
  TabsRadioSchema,
  FormulaButtonSchema,
  DefaultValueInputSchema,
  MultipleCheckboxSchema,
};

export const Widgets = {
  SchemaItem,
  Input,
  InputColor,
  Select,
  InputNumber,
  RadioGroup,
  CheckboxGroup,
  Switch,
  DataSource,
  Slider,
  Background,
  TextArea,
  Upload,
  MarginAndPadding,
  Border,
  BorderRadius,
  QueryModal,
  IconSelect,
  TabsRadioBox,
  FormulaButton,
  DefaultValueInput,
  MultipleCheckbox,
};

export const createSchema = (
  component: keyof typeof Schema,
  parentProps: string | Omit<SchemaItemType, "children">,
  propName: string,
  childProps: { [key: string]: any } = {},
  otherProps: { [key: string]: any } = {}
) => {
  return {
    component,
    parentProps:
      typeof parentProps === "string"
        ? {
            label: parentProps,
          }
        : parentProps,
    childProps: {
      propName,
      ...childProps,
    },
    ...otherProps,
  };
};
