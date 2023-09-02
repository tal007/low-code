/*
 * @Date: 2023-04-21 10:32:52
 * @LastEditTime: 2023-04-21 10:32:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 评分组件内部ts接口定义
 */
import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
export interface RateProps extends FormWidgetContainerProps {
  count: number;
  allowHalf: boolean;
}
