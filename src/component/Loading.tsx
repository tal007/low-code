/*
 * @Date: 2022-09-29 15:23:55
 * @LastEditTime: 2023-05-04 10:29:40
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 加载
 */

import { FlexBox } from "@/style";
import { Spin, SpinProps } from "antd";

export type LoadingProps = SpinProps;

export const Loading = (props: LoadingProps) => {
  return (
    <FlexBox style={{ minHeight: 100 }}>
      <Spin {...props} />
    </FlexBox>
  );
};
