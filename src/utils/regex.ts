/*
 * @Date: 2022-11-03 14:21:43
 * @LastEditTime: 2023-05-04 10:13:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 正则校验规则
 */

export const urlRegex =
  // eslint-disable-next-line no-useless-escape
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

export default { urlRegex };
