/*
 * @Date: 2022-12-08 15:44:49
 * @LastEditTime: 2022-12-28 10:27:27
 * @LastEditors: 刘玉田
 * @Description: craftjs 容器 显隐等属性在这里配置
 */

import { HiddenElement } from "@/component/HiddenElement";
import { Loading } from "@/component/Loading";
import { useNode } from "@craftjs/core";
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
  const {
    connectors: { connect },
  } = useNode(node => ({
    parent: node.data.parent,
  }));
  const { enabled } = useEditorAction();

  // const { parentIsForm, parentData } = useEditor((_, query) => {
  //   return {
  //     parentIsForm: query.getNodes()[parent].data.displayName === "Form",
  //     parentData: query.getNodes()[parent].data,
  //   };
  // });

  return (
    <HiddenElement ref={connect} hidden={hidden} style={style}>
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
