/*
 * @Date: 2023-04-20 11:07:50
 * @LastEditTime: 2023-05-15 14:03:50
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 评分组件
 */

import { RateProps } from "./index.d";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Rate } from "antd";

const Component = (props: Partial<RateProps>) => {
  const onChange = (value: number) => {
    console.log(value);
  };

  return (
    <FormWidgetContainer {...props}>
      <Rate
        onChange={number => onChange(number)}
        count={props.count}
        allowHalf={props.allowHalf}
      />
    </FormWidgetContainer>
  );
};
export default Component;
