/*
 * @Date: 2022-10-20 16:01:58
 * @LastEditTime: 2023-05-16 10:05:16
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 通用
 */

import {
  SettingProviderChildrenProps,
  SettingProviderProps,
} from "../SettingProvider";
import {
  formItemColon,
  formItemLabelAlign,
  formItemLabelCol,
  formItemNoStyle,
} from "./formItemProps";
import { ruleRequired } from "./formRules";

import { basicNameSetting } from "./common";

type Children = SettingProviderChildrenProps[];

export const renderProviderSetting = (
  key: string,
  header: string,
  children: Children
): SettingProviderProps => {
  return {
    [key]: {
      header,
      children: [...children],
    },
  };
};

export const basicRender = (children: Children) =>
  renderProviderSetting("basic", "propSettingHeader.basic", [
    basicNameSetting,
    ...children,
  ]);

export const statusRender = (children: Children) =>
  renderProviderSetting("status", "propSettingHeader.status", children);

export const formLabelSettingRender = (children: Children) =>
  renderProviderSetting(
    "formLabel",
    "propSettingHeader.labelSetting",
    [
      formItemNoStyle,
      formItemColon,
      formItemLabelAlign,
      formItemLabelCol,
    ].concat(children)
  );

export const formItemRulesRender = (children: Children) =>
  renderProviderSetting(
    "formRules",
    "propSettingHeader.formRules",
    [ruleRequired].concat(children)
  );

export const formItemColPropsRender = (children: Children) =>
  renderProviderSetting(
    "formItemColProps",
    "propSettingHeader.formItemColProps",
    [].concat(children)
  );
