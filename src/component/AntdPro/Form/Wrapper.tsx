/*
 * @Date: 2022-12-08 11:50:34
 * @LastEditTime: 2022-12-08 14:05:29
 * @LastEditors: 刘玉田
 * @Description: Form 的属性配置容器 这里统一处理
 */

import type { ExtendsProps } from "@ant-design/pro-form/es/typing";

interface FormWrapperProps extends ExtendsProps {
  children: React.ReactNode;
}
export const FormWrapper = (props: FormWrapperProps) => {
  const { children } = props;
  return <>{children}</>;
};
