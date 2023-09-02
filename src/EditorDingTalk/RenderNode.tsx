/*
 * @Date: 2022-10-09 16:35:48
 * @LastEditTime: 2023-05-15 14:45:30
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 公共渲染组件
 */
import { useNode, useEditor, NodeTree, Node } from "@craftjs/core";
import { ROOT_NODE, getRandomId } from "@craftjs/utils";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, Tooltip, Typography } from "antd";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const IndicatorDiv = styled.div`
  position: fixed;
  display: flex;
  padding: 0 10px;
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;
  background: ${props => props.theme.token.colorPrimary};

  svg {
    color: white;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a<{ cursor?: string }>`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  cursor: ${props => props.cursor || "pointer"};
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

export const RenderNode = ({ render }: { render: any }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isActive) {
      dispatch(currentEditorConfigActions.setActiveNodeId(id));
    }
  }, [dispatch, id, isActive]);

  const {
    isHover,
    dom,
    displayName,
    moveable,
    deletable,
    connectors: { drag },
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

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 100 ? top : bottom + 30}px`,
      left: `${left}px`,
      display: `${top < 100 ? "none" : "flex"}`,
    };
  }, []);

  const fromEntries = pairs => {
    if (Object.fromEntries) {
      return Object.fromEntries(pairs);
    }
    return pairs.reduce(
      (accum, [id, value]) => ({
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
      console.log(tree);
      const newTree = getCloneTree(tree);

      // add templates where you want
      actions.addNodeTree(newTree, parent, index);
      actions.selectNode(newTree.rootNodeId);
    },
    [actions, getCloneTree, query]
  );

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                display: getPos(dom).display,
                zIndex: 999,
              }}
            >
              <Space>
                <Text>{displayName}</Text>
                {moveable ? (
                  <Btn cursor={"move"} ref={drag}>
                    <FontAwesomeIcon icon={"arrows-up-down-left-right"} />
                  </Btn>
                ) : null}
                {id !== ROOT_NODE && (
                  <Btn
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      actions.selectNode(parent);
                    }}
                  >
                    <Tooltip title={t("common.toUp")}>
                      <FontAwesomeIcon icon={"arrow-up"} />
                    </Tooltip>
                  </Btn>
                )}
                {id !== ROOT_NODE && deletable && (
                  <Btn
                    onClick={() => {
                      handleSaveTemplate();
                      const index = query.node(parent).toSerializedNode()
                        .nodes.length;
                      handleAdd(parent, index);
                    }}
                  >
                    <Tooltip title={t("common.copy")}>
                      <FontAwesomeIcon icon={"copy"} />
                    </Tooltip>
                  </Btn>
                )}
                {deletable ? (
                  <Btn
                    onMouseDown={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      actions.delete(id);
                    }}
                  >
                    <Tooltip title={t("common.delete")}>
                      <FontAwesomeIcon icon={"trash"} />
                    </Tooltip>
                  </Btn>
                ) : null}
              </Space>
            </IndicatorDiv>,
            document.querySelector(".page-container")
          )
        : null}
      <>{render}</>
    </>
  );
};
