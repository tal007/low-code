/*
 * @Date: 2022-12-08 15:44:49
 * @LastEditTime: 2023-04-21 17:25:49
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: craftjs 容器 显隐等属性在这里配置
 */

import { HiddenElement } from "@/component/HiddenElement";
import { Loading } from "@/component/Loading";
import { Alert } from "antd";
import { useEditorAction } from "../../hooks";

export interface CraftContainerProps<T> {
  hidden: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
  error: T | null;
  loading?: boolean;
}

export const CraftContainer = <T extends Error>(
  props: Partial<CraftContainerProps<T>>
) => {
  const { hidden, children, style, loading, error = null } = props;
  const { enabled } = useEditorAction();

  return (
    <HiddenElement hidden={hidden} style={style}>
      {error !== null ? (
        <Alert
          style={{ width: 160, height: 160 }}
          message={error?.name || "Error"}
          description={error?.message}
          type={"error"}
          showIcon
        />
      ) : loading && !enabled ? (
        <Loading />
      ) : (
        children
      )}
    </HiddenElement>
  );
};
