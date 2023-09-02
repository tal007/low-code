/*
 * @Date: 2022-11-21 14:08:06
 * @LastEditTime: 2022-11-21 14:26:09
 * @LastEditors: 刘玉田
 * @Description: 加载容器
 */

import { Loading, LoadingProps } from "./Loading";

export interface LoadingContainerProps extends LoadingProps {
  children: React.ReactNode;
  loading: boolean;
}

export const LoadingContainer = (props: LoadingContainerProps) => {
  const { children, loading, ...rest } = props;

  return loading ? <Loading {...rest} /> : <>{children}</>;
};
