/**
 * @author 梁强
 * @filename index.tsx
 * @date 2023-04-26 星期三
 * @description 明细/表格
 */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CommonButtonTypes } from "@/EditorWidgets/Common";
import { generateWidgetOptions } from "@/EditorWidgets/helper";
import { Element, Node, NodeTree, useEditor, useNode } from "@craftjs/core";
import DetailedTableContainerSetting from "./setting";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { DropTip, DropTipShowNode } from "@/EditorWidgets/Common/DropTip";
import { useDispatch, useSelector } from "react-redux";
import { currentTipContainerIds } from "@/store/tipContainer.slice";
import {
  DetailedTableContainerDataSourceType,
  DetailedTableContainerProps,
} from "./index.d";
import { getRandomId } from "@craftjs/utils";
import { useEditorAction } from "@/EditorWidgets/hooks";
import {
  DetailedTableContainerNAME,
  defaultProps,
  fillingMethodMap,
  fromEntries,
  platformMap,
} from "./constant";
import {
  DetailedTableContainerCardBottom,
  TableHeaderContainerComponent,
} from "./Component";
import { omit } from "lodash";
import {
  currentFormValue,
  currentFormValueActions,
} from "@/store/formValue.slice";
import type { ProColumns } from "@ant-design/pro-components";
import { EditableProTable } from "@ant-design/pro-components";
import { Button as ButtonM, Popup as PopupM } from "antd-mobile";
import { usePlatform } from "@/hooks/usePlatform";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import { nanoid } from "@reduxjs/toolkit";

export const DetailedTableContainerRenderView = (
  props: Partial<DetailedTableContainerProps>
) => {
  const { actions, query } = useEditor();
  const { enabled } = useEditorAction();
  const { id, parent } = useNode(node => {
    return {
      parent: node.data.parent,
      id: node.id,
    };
  });
  const {
    children,
    name,
    fillingMethod,
    parentNodeId: parentId,
    ...restProps
  } = props;
  const platform = usePlatform();
  const dom = useMobilePopupContainer();
  const tipContainerIds = useSelector(currentTipContainerIds);
  const childLength = children?.props?.children?.length || 0;
  const [dataSource, setDataSource] = useState<
    DetailedTableContainerDataSourceType[]
  >([]);
  const dispatch = useDispatch();
  const currentFormValueState = useSelector(currentFormValue);
  const [popupVisiable, setPopupVisiable] = useState(false);

  console.log("currentFormValueState:", currentFormValueState);
  // 建立关系
  useEffect(() => {
    if (id) {
      const idTree = query.node(id).toNodeTree();
      const nodeDataPairs = Object.keys(idTree.nodes).map(id => [
        id,
        query.node(id).toSerializedNode(),
      ]);
      const serializedNodesJSON = omit(fromEntries(nodeDataPairs), [
        idTree.rootNodeId,
      ]);
      const nodePairsId = Object.keys(serializedNodesJSON)
        .map(id => {
          const nodeId = id;

          const nodeItem = query
            .parseSerializedNode(serializedNodesJSON[id])
            .toNode(node => (node.id = nodeId));

          return {
            ...nodeItem,
            ...nodeItem?.data,
          };
        })
        .filter(item => item.data.displayName !== "DropTip")
        .map(item => item.id);
      if (nodePairsId.length) {
        dispatch(
          currentFormValueActions.setValue({
            id: idTree.rootNodeId,
            value: nodePairsId,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataSource.length) {
      dispatch(
        currentFormValueActions.setValue({
          id,
          value: dataSource.map(item => ({ ...omit(item, ["index", "id"]) })),
        })
      );
    }
    return () => {
      dispatch(
        currentFormValueActions.setValue({
          id,
          value: [],
        })
      );
    };
  }, [dataSource, dispatch, id]);

  /**
   * @author 梁强
   * @date 2023-04-27 星期四
   * @function 重组树节点
   * @param {}
   * @return {}
   */
  const getCloneTree = useCallback(
    (tree: NodeTree) => {
      const newNodes = {};
      const changeNodeId = (node: Node, newParentId?: string) => {
        const newNodeId = getRandomId();
        const childNodes = node.data.nodes.map(childId =>
          changeNodeId(tree.nodes[childId], newNodeId)
        );
        const linkedNodes = Object.keys(node.data.linkedNodes).reduce(
          (acc, id) => {
            const newLinkedNodeId = changeNodeId(
              tree.nodes[node.data.linkedNodes[id]],
              newNodeId
            );
            return {
              ...acc,
              [id]: newLinkedNodeId,
            };
          },
          {}
        );

        const tmpNode = {
          ...node,
          id: newNodeId,
          data: {
            ...node.data,
            parent: newParentId || node.data.parent,
            nodes: childNodes,
            linkedNodes,
          },
        };
        const freshNode = query.parseFreshNode(tmpNode).toNode();
        newNodes[newNodeId] = freshNode;
        return newNodeId;
      };

      const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId]);
      return {
        rootNodeId,
        nodes: newNodes,
      };
    },
    [query]
  );

  /**
   * @author 梁强
   * @date 2023-04-27 星期四
   * @function  clone 节点
   * @param {}
   * @return {}
   */
  const onClick = useCallback(() => {
    const idTree = query.node(id).toNodeTree();
    const nodeDataPairs = Object.keys(idTree.nodes).map(id => [
      id,
      query.node(id).toSerializedNode(),
    ]);
    const serializedNodesJSON = fromEntries(nodeDataPairs);
    const nodePairs = Object.keys(serializedNodesJSON).map(id => {
      const nodeId = id;

      return [
        nodeId,
        query
          .parseSerializedNode(serializedNodesJSON[id])
          .toNode(node => (node.id = nodeId)),
      ];
    });
    const tree = {
      rootNodeId: idTree.rootNodeId,
      nodes: fromEntries(nodePairs),
    };

    const newTree = getCloneTree(tree);

    actions.addNodeTree(
      newTree,
      parent,
      query.node(parent).toSerializedNode().nodes.length
    );
    // TODO 预览的时候如果不引入 craftjs ，这段代码不生效
    actions.setProp(newTree.rootNodeId, props => (props.id = nanoid()));
  }, [actions, getCloneTree, id, parent, query]);

  /**
   * @author 梁强
   * @date 2023-04-28 星期五
   * @function Pc-根据平台和Enbale状态进行展示
   * @param {}
   * @return {}
   */
  const renderNode = useMemo(() => {
    // 表格模式 + 预览模式
    if (fillingMethod === fillingMethodMap.表格 && !enabled) {
      const idTree = query.node(id).toNodeTree();
      const rootNodeId = idTree.rootNodeId;
      const nodeDataPairs = Object.keys(idTree.nodes).map(id => [
        id,
        query.node(id).toSerializedNode(),
      ]);
      const serializedNodesJSON = omit(fromEntries(nodeDataPairs), [
        idTree.rootNodeId,
      ]);
      const nodePairs = Object.keys(serializedNodesJSON)
        .map(id => {
          const nodeId = id;

          const nodeItem = query
            .parseSerializedNode(serializedNodesJSON[id])
            .toNode(node => (node.id = nodeId));

          return {
            ...nodeItem,
          };
        })
        .filter(
          item =>
            item.data.displayName !== import.meta.env.VITE_APP_FORM_EXCLUDE
        ); // 优化

      const columns: ProColumns<DetailedTableContainerDataSourceType>[] =
        nodePairs
          .filter(item => item.data.custom?.exclude !== true)
          .map(item => {
            return {
              title: item?.data.custom.displayName,
              dataIndex: item?.id,
              align: "center",
              renderFormItem() {
                const Component = item.data.type;
                return (
                  <Element
                    canvas
                    is={Component}
                    // exclude 用于排除
                    custom={{ ...item.data.custom, exclude: true }}
                  />
                );
              },
            };
          });
      console.log(
        "nodePairs:",
        JSON.stringify(
          {
            columns,
            rootNodeId,
            dataSource,
          },
          null,
          4
        )
      );

      return (
        <>
          <TableHeaderContainerComponent
            title={name}
            id={id}
            parent={parentId}
            fillingMethod={fillingMethod}
          />
          <EditableProTable<DetailedTableContainerDataSourceType>
            style={{ marginTop: 20, padding: 0 }}
            rowKey="id"
            scroll={{
              x: 1200,
            }}
            bordered
            loading={false}
            columns={[
              ...columns,
              {
                title: "操作",
                valueType: "option",
                align: "center",
                fixed: "right",
                width: 200,
                render: (text, record, _, action) => [
                  <a
                    key="editable"
                    onClick={() => {
                      action?.startEditable?.(record.id);
                    }}
                  >
                    编辑
                  </a>,
                  <a
                    key="delete"
                    onClick={() => {
                      setDataSource(
                        dataSource.filter(item => item.id !== record.id)
                      );
                    }}
                  >
                    删除
                  </a>,
                ],
              },
            ]}
            value={dataSource as DetailedTableContainerDataSourceType[]}
            onChange={(val: DetailedTableContainerDataSourceType[]) =>
              setDataSource(val)
            }
            editable={{
              type: "single",
            }}
            recordCreatorProps={
              platform === platformMap.pc
                ? {
                    position: "bottom",
                    record: () => ({
                      id: (Math.random() * 1000000).toFixed(0),
                    }),
                  }
                : ({
                    position: "bottom",
                    onClick: () => {
                      if (platform === platformMap.移动端) {
                        return setPopupVisiable(true);
                      }
                      return setPopupVisiable(false);
                    },
                  } as any)
            }
          />
          <PopupM
            visible={popupVisiable}
            onClose={() => setPopupVisiable(false)}
            showCloseButton
            bodyStyle={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              minHeight: "40vh",
            }}
            getContainer={dom}
          >
            <div style={{ padding: 15 }}>
              <TableHeaderContainerComponent
                title={name}
                id={id}
                parent={parentId}
                fillingMethod={fillingMethod}
              />
              {React.Children.map(
                children?.props?.children,
                (child: React.ReactElement) => child
              )}
              <ButtonM
                block
                color="primary"
                size="large"
                onClick={() => {
                  const objectKeys = {
                    id: (Math.random() * 1000000).toFixed(0),
                  };
                  nodePairs.forEach(item => {
                    objectKeys[item.id] = currentFormValueState[item.id];
                  });
                  setDataSource(old => [...old, objectKeys]);
                  setPopupVisiable(false);
                }}
              >
                保存
              </ButtonM>
            </div>
          </PopupM>
        </>
      );
    }

    return (
      <>
        <TableHeaderContainerComponent
          title={name}
          id={id}
          parent={parentId}
          fillingMethod={fillingMethod}
        />
        {React.Children.map(
          (children as React.ReactElement)?.props?.children,
          (child: React.ReactElement) => {
            if (childLength === 1 && tipContainerIds.includes(child.props.id))
              return (
                <>
                  {child}
                  <DropTipShowNode />
                </>
              );
            return !tipContainerIds.includes(child.props.id) && child;
          }
        )}
        <DetailedTableContainerCardBottom onClick={onClick} {...restProps} />
      </>
    );
  }, [
    fillingMethod,
    enabled,
    name,
    id,
    parentId,
    children,
    onClick,
    restProps,
    query,
    dataSource,
    platform,
    popupVisiable,
    dom,
    currentFormValueState,
    childLength,
    tipContainerIds,
  ]);

  return (
    <BaseContainer id={id} {...props}>
      {renderNode}
    </BaseContainer>
  );
};

DetailedTableContainerRenderView.craft = {
  displayName: DetailedTableContainerNAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveOut: () => true,
    canMoveIn: (props: Node[]) => props[0].data.custom.tags.includes("form"),
  },
  related: {
    settings: DetailedTableContainerSetting,
  },
};

export const DetailedTableContainer: CommonButtonTypes = {
  ...generateWidgetOptions(DetailedTableContainerNAME, "form"),
  icon: "table",
  tags: [DetailedTableContainerNAME],
  preview: (
    <img
      src={
        "https://img.alicdn.com/imgextra/i3/O1CN015dMvae1aoiKS76YP1_!!6000000003377-2-tps-411-329.png"
      }
      style={{
        width: 300,
      }}
    />
  ),
  render: (
    <Element
      canvas
      is={DetailedTableContainerRenderView}
      custom={{
        displayName: DetailedTableContainerNAME,
        tags: [DetailedTableContainerNAME],
      }}
    >
      <Element is={DropTip} />
    </Element>
  ),
};
