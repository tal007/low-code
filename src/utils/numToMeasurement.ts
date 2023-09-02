/*
 * @Date: 2022-10-08 09:55:38
 * @LastEditTime: 2022-10-26 14:41:44
 * @LastEditors: 刘玉田
 * @Description:
 */

export const isPercentage = (val: string) =>
  typeof val === "string" && val.indexOf("%") > -1;

export const percentToPx = (value: any, comparativeValue: number) => {
  if (value.indexOf("px") > -1 || value === "auto" || !comparativeValue)
    return value;
  const percent = parseInt(value);
  return (percent / 100) * comparativeValue + "px";
};
export const pxToPercent = (value: any, comparativeValue: number) => {
  const val = (Math.abs(value) / comparativeValue) * 100;
  if (value < 0) return -1 * val;
  else return Math.round(val);
};
export const getElementDimensions = (element: HTMLElement) => {
  const computedStyle = getComputedStyle(element);

  let height = element.clientHeight,
    width = element.clientWidth; // width with padding

  height -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  width -=
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);

  return {
    width,
    height,
  };
};
