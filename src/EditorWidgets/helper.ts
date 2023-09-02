/*
 * @Date: 2022-09-27 14:30:44
 * @LastEditTime: 2023-05-19 09:07:15
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 工具函数
 */

import { RGBColor } from "react-color";

export const generateWidgetOptions = (
  widgetName: string,
  widgetGroup: string
) => {
  return {
    renderName: widgetName,
    name: `${widgetGroup}.${widgetName}.name`,
    description: `${widgetGroup}.${widgetName}.description`,
    docLink: "",
  };
};

export const widgetIsContainer = (tags: string[]): boolean => {
  return tags.includes("container");
};

/*******
 * @description: 将color选择器选择出来的color转换为 rgba string
 * @param {RGBColor} color RGBColor
 * @return {*} rgba color
 */
export const toColorString = (color: RGBColor): string => {
  return `rgba(${Object.values(color)})` as string;
};
// 数值转大写
export const numberToUpperCase = (num: number | undefined): string => {
  if (num === undefined || num === null) return "";
  const maxNum = 999999999999.9999;
  if (num > maxNum) {
    return "超出最大处理数";
  }
  const numberMap = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖",
  ]; //0-9对应的大写映射
  const integerSuffix = "整"; // 整数后缀
  const integerLastUnit = "元"; // 整数后单位
  const unitIntBasic = ["", "拾", "佰", "仟"]; // 整数部分基本单位
  const unitIntExpand = ["", "万", "亿", "兆"]; // 整数部分万级单位
  const unitDecimal = ["角", "分", "毫", "厘"]; // 小数部分单位
  const numArr = num.toString().split("."); // 将数字拆分成数组
  let integerNum = numArr[0]; // 整数部分字符串
  let numSymbol = ""; // 数据符号，空字符串表示正数，否则表示负数
  const decimalNum = numArr[1]; // 小数部分
  if (/-\d+/.test(integerNum)) {
    integerNum = integerNum.replace(/-/, "");
    numSymbol = "负数";
  }
  // 小数部分转大写
  const decimalUpperCase = (
    numbers: string,
    units: string[],
    zeroValue?: string
  ) => {
    let upperCaseString = "";
    zeroValue = zeroValue || "";
    for (
      let i = 0, len = Math.min(numbers.length, units.length);
      i < len;
      i++
    ) {
      const _number = numbers[i];
      upperCaseString +=
        _number !== "0" ? numberMap[_number] + units[i] : zeroValue;
    }
    return upperCaseString;
  };
  // 整数部分转大写
  const integerUpperCase = () => {
    let upperCaseString = "";
    const numLen = integerNum.length;
    let zeroCount = 0;
    for (let i = 0; i < numLen; i++) {
      const _num = integerNum[i];
      const remainLength = numLen - i - 1;
      const devisorNum = remainLength / 4;
      const modNum = remainLength % 4;
      if (_num == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          upperCaseString += numberMap[0];
        }
        zeroCount = 0;
        upperCaseString += numberMap[parseInt(_num)] + unitIntBasic[modNum];
      }
      if (modNum == 0 && zeroCount < 4) {
        upperCaseString += unitIntExpand[devisorNum];
      }
    }
    return upperCaseString;
  };
  if (parseInt(integerNum) < 10) {
    if (decimalNum === undefined)
      return (
        numSymbol +
        numberMap[integerNum] +
        unitIntBasic[0] +
        integerLastUnit +
        integerSuffix
      );
    if (integerNum === "0")
      return numSymbol + decimalUpperCase(decimalNum, unitDecimal);
    return (
      numSymbol +
      decimalUpperCase(integerNum, unitIntBasic) +
      integerLastUnit +
      decimalUpperCase(decimalNum, unitDecimal, numberMap[0])
    );
  } else {
    if (decimalNum === undefined)
      return numSymbol + integerUpperCase() + integerLastUnit + integerSuffix;
    return (
      numSymbol +
      integerUpperCase() +
      integerLastUnit +
      decimalUpperCase(decimalNum, unitDecimal, numberMap[0])
    );
  }
};
