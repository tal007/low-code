/*
 * @Date: 2022-11-03 17:36:43
 * @LastEditTime: 2023-01-09 14:35:20
 * @LastEditors: 刘玉田
 * @Description: 组件可见性
 */

import { ActionDesc } from "./Common";
import { ProFormSelect, ProFormRadio } from "@ant-design/pro-components";
import { FormInstance, Form } from "antd";
import { Node, Nodes, useEditor } from "@craftjs/core";
import { useMemo } from "react";
import { PrimaryColorSpan } from "@/style";

export interface ShowProperties {
  form: FormInstance;
  defaultFormValue: {
    selectWidget: string;
    type: "show" | "hidden";
  };
}

const getPathName = (nodeValue: Node, nodes: Nodes): string => {
  const parentId = nodeValue.data.parent;
  if (!parentId) return "";
  const parentNodeValue = nodes[parentId];
  const parentName =
    parentNodeValue.data.custom?.displayName ||
    parentNodeValue.data.displayName;
  return getPathName(parentNodeValue, nodes) + "/" + parentName;
};

export const Show = (props: Partial<ShowProperties>) => {
  const { t } = useTranslation();
  const { form, defaultFormValue } = props;

  const { nodes } = useEditor(state => ({
    nodes: state.nodes,
  }));

  const selectMapNodes = useMemo(() => {
    return Object.entries(nodes).map(([nodeKey, nodeValue]) => {
      return {
        label: (
          <>
            {`${getPathName(nodeValue, nodes)}/`.slice(1)}
            <PrimaryColorSpan>
              {nodeValue.data?.custom?.displayName ||
                nodeValue.data.displayName}
            </PrimaryColorSpan>
          </>
        ),
        value: nodeKey,
      };
    });
  }, [nodes]);

  return (
    <ActionDesc desc={t("event.show")}>
      <Form form={form} initialValues={defaultFormValue}>
        <ProFormSelect
          label={t("event.showDetail.select")}
          name="selectWidget"
          required
          rules={[{ required: true }]}
          options={selectMapNodes}
        ></ProFormSelect>
        <ProFormRadio.Group
          label={t("event.showDetail.type")}
          name="type"
          required
          rules={[{ required: true }]}
          options={[
            {
              label: t("common.show"),
              value: "show",
            },
            {
              label: t("common.hidden"),
              value: "hidden",
            },
          ]}
        ></ProFormRadio.Group>
      </Form>
    </ActionDesc>
  );
};
