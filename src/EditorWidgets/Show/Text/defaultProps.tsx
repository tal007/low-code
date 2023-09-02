/*
 * @Date: 2023-05-12 16:42:49
 * @LastEditTime: 2023-05-12 16:42:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 组件props默认值
 */
import { backgroundColorDefault } from "../../types";
import { fontDefault } from "@/SettingPanelSchema/settingRender/font";
import { marginAndPaddingDefault } from "@/SettingPanelSchema/settingRender/marginAndPadding";

const defaultProps = {
  ...backgroundColorDefault,
  ...fontDefault,
  ...marginAndPaddingDefault,
  text: "请编辑内容",
  tagName: "span",
};
export default defaultProps;
