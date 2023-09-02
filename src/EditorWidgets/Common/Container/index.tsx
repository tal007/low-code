/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-12 15:13:24
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-16 13:48:02
 * @Description: 组件基础容器
 */
import styled from "styled-components";
import { CraftContainer, CraftContainerProps } from "../CraftContainer";
import { StyleContainerProps } from "../StyleContainer";
import { ROOT_NODE, getRandomId } from "@craftjs/utils";
import { useNode, useEditor, NodeTree, Node } from "@craftjs/core";
import { Col, Space, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo } from "react";
import { usePlatform } from "@/hooks/usePlatform";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";
import { hasGridContainer } from "@/EditorWidgets/CommonSettings";
import { nanoid } from "@/utils/helper";

export interface BaseContainerProps<T>
  extends Omit<StyleContainerProps, "children">,
    CraftContainerProps<T> {
  common: Record<string, any>;
  children: React.ReactElement;
  id?: string; // 预览的时候可以删除
  colSpan?: number; // 判断节点width
}

export const BaseContainer = <T extends Error>(
  props: Partial<BaseContainerProps<T>>
) => {
  const { children, loading, error, id: childNodeId, colSpan } = props;
  const { id } = useNode();
  const { actions, query, isActive, enabled } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
    enabled: _.options.enabled,
  }));
  const {
    isHover,
    moveable,
    deletable,
    connectors: { drag, connect },
    parent,
  } = useNode(node => {
    return {
      isHover: node.events.hovered,
      dom: node.dom,
      displayName: node.data.custom.displayName || node.data.displayName,
      moveable: query.node(node.id).isDraggable(),
      deletable: query.node(node.id).isDeletable(),
      parent: node.data.parent,
      props: node.data.props,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (isActive) {
      dispatch(currentEditorConfigActions.setActiveNodeId(id));
    }
  }, [dispatch, id, isActive]);

  const { t } = useTranslation();

  const fromEntries = pairs => {
    if (Object.fromEntries) {
      return Object.fromEntries(pairs);
    }
    return pairs.reduce(
      (accum: object, [id, value]) => ({
        ...accum,
        [id]: value,
      }),
      {}
    );
  };
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

  // to save as a template
  const handleSaveTemplate = useCallback(() => {
    const tree = query.node(id).toNodeTree();
    const nodePairs = Object.keys(tree.nodes).map(id => [
      id,
      query.node(id).toSerializedNode(),
    ]);
    const serializedNodesJSON = JSON.stringify(fromEntries(nodePairs));
    const saveData = {
      rootNodeId: tree.rootNodeId,
      nodes: serializedNodesJSON,
    };
    // save to your database
    sessionStorage.setItem("template", JSON.stringify(saveData));
  }, [id, query]);

  // add templates where you want
  const handleAdd = useCallback(
    (parent: string, index: number) => {
      // get the template from your database
      const data = JSON.parse(sessionStorage.getItem("template"));
      const newNodes = JSON.parse(data.nodes);
      const nodePairs = Object.keys(newNodes).map(id => {
        const nodeId = id;

        return [
          nodeId,
          query
            .parseSerializedNode(newNodes[id])
            .toNode(node => (node.id = nodeId)),
        ];
      });
      const tree = {
        rootNodeId: data.rootNodeId,
        nodes: fromEntries(nodePairs),
      };
      const newTree = getCloneTree(tree);

      // add templates where you want
      actions.addNodeTree(newTree, parent, index);
      actions.selectNode(newTree.rootNodeId);
      actions.setProp(newTree.rootNodeId, props => (props.id = nanoid()));
    },
    [actions, getCloneTree, query]
  );

  const platform = usePlatform();

  /**
   * @author 梁强
   * @date 2023-05-08 Monday
   * @function 计算col span
   * @param {}
   * @return {}
   */
  const renderColSpan = useMemo(() => {
    const parentNode = query.node(parent).toSerializedNode();
    if (hasGridContainer(parentNode.custom.tags, "container") && !colSpan) {
      return Number(import.meta.env.VITE_APP_GRID_COLSPAN);
    }
    return colSpan;
  }, [colSpan, parent, query]);

  return (
    <Col span={renderColSpan} style={{ width: "100%" }}>
      <EditContainer
        isActive={isActive}
        isHover={isHover}
        enabled={enabled}
        ref={ref => connect(drag(ref))}
        id={childNodeId}
      >
        <CraftContainer
          loading={loading}
          error={error ? error : null}
          // hidden={common?.hidden}
        >
          {enabled && (
            <CoverNode>
              {moveable && <div className="grab-node"></div>}
              {(isHover || isActive) && (
                <Space className="icons">
                  {id !== ROOT_NODE && (
                    <Tooltip title={t("common.copy")}>
                      <FontAwesomeIcon
                        icon={"copy"}
                        onClick={() => {
                          handleSaveTemplate();
                          const index = query.node(parent).toSerializedNode()
                            .nodes.length;
                          handleAdd(parent, index);

                          dispatch(currentEditorConfigActions.setNodeRandom());
                        }}
                      />
                    </Tooltip>
                  )}
                  {deletable && (
                    <Tooltip title={t("common.delete")}>
                      <FontAwesomeIcon
                        icon={"trash"}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          actions.delete(id);
                        }}
                      />
                    </Tooltip>
                  )}
                </Space>
              )}
            </CoverNode>
          )}
          {React.cloneElement(children, {
            platform,
            parentNodeId: id,
            colSpan: renderColSpan,
            enabled,
          })}
        </CraftContainer>
      </EditContainer>
    </Col>
  );
};

const EditContainer = styled.div<{
  isActive: boolean;
  isHover: boolean;
  enabled: boolean;
  id?: string;
}>`
  position: relative;
  min-height: 38px;
  transition: 0.3s all ease;
  background: #fff;
  box-shadow: ${props =>
    props.enabled ? "0 1px 10px 0 rgba(226, 226, 226, 0.5)" : "none"};
  border-left: ${props => (props.enabled ? "3px" : "none")} solid
    ${props => {
      let color = "#fff";
      if (props.isHover) color = "#bfc1c2";
      if (props.isActive) color = props.theme.token.colorPrimary;
      return color;
    }};
`;

const CoverNode = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: transparent;

  &:active {
    background-color: #f6f7f8;
    opacity: 0.3;
  }

  .grab-node {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: transparent;
    cursor: grab;
  }

  .icons {
    position: absolute;
    right: 4px;
    top: 4px;
    padding: 4px 10px;
    background-color: #f6f6f7;
    border-radius: 4px;

    svg {
      /* margin-left: 10px; */

      &:hover {
        color: ${props => props.theme.token.colorPrimary};
        cursor: pointer;
      }
    }
  }
`;
