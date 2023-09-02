/*
 * @Date: 2022-10-11 13:37:28
 * @LastEditTime: 2023-05-04 10:55:29
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import { Row } from "antd";

export const GridSchema = ({ children }: any) => {
  return <Row gutter={[16, 16]}>{children}</Row>;
};
