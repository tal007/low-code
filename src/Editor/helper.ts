/*
 * @Date: 2022-12-27 15:53:40
 * @LastEditTime: 2023-05-04 10:58:15
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 帮助函数
 */

import { DataType } from "@/SettingPanelSchema/settingRender/querySetting";
import { QueryData } from "./Widgets/hooks";
import qs from "query-string";

/*******
 * @description: 处理ajax数据请求中的 data
 * @return {*} 返回处理后的数据
 */
export const processingAjaxSubmissionData = (
  values: QueryData,
  dataType: DataType
): any => {
  if (values === undefined || values === null) {
    return values;
  }
  // 提交数据处理
  if (dataType === "json") {
    return values;
  }
  if (dataType === "form") {
    return qs.stringify(values);
  }
  if (dataType === "formData") {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }
};

const replaceData = (str: string, props: KeyValueObject) => {
  const arr = str.split(".");
  return arr.reduce((acc, val) => {
    return acc[val];
  }, props);
};

/*******
 * @description: 字符串替换 要写替换的内容使用 {{XXX}} 包裹
 * @param {*} str 需要替换的字符串
 * @param {*} props 从那个对象获取替换的数据 比如 props.name
 * @return {*} 替换后的字符串
 */
export function replaceString(str: string, props: KeyValueObject) {
  const reg = /{{(.*?)}}/;
  let arr = [];
  while ((arr = reg.exec(str))) {
    str = str.replace(arr[0], replaceData(arr[1], props));
  }
  return str;
}
