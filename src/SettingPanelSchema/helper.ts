/*
 * @Date: 2022-12-12 10:10:33
 * @LastEditTime: 2023-05-04 10:50:17
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

/*******
 * @description: 更新数据
 * @return {*}
 */
export const setValue = (
  props: Record<string, any>,
  propName: string,
  value: any,
  index?: number // 如果是数组，需要传入修改的索引值
): void => {
  const propNameArr = propName.split(".");
  const length = propNameArr.length;

  propNameArr.forEach((name, i) => {
    if (i === length - 1) {
      if (index !== undefined) {
        props[name][index] = value;
      } else {
        props[name] = value;
      }
    } else {
      props = props[name];
    }
  });
  console.log("props:", props);
};
