/*
 * @Date: 2022-09-21 10:38:44
 * @LastEditTime: 2023-05-09 17:28:39
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 错误边界捕获
 */
import { ReactNode } from "react";
import { Alert } from "antd";

const { ErrorBoundary: AntdErrorBoundary } = Alert;
export const ErrorBoundary = (props: { children: ReactNode }) => {
  const { children } = props;

  return <AntdErrorBoundary>{children}</AntdErrorBoundary>;
};
