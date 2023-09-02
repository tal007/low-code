/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-21 17:11:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-24 15:15:12
 * @Description:
 */
import { useNode } from "@craftjs/core";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentTipContainerIdsAction } from "@/store/tipContainer.slice";

export const DropTipContainer = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddeff3;
  color: #ccc;
  min-height: 50px;
`;

export const DropTip = () => {
  const dispatch = useDispatch();
  const {
    connectors: { connect },
    id,
  } = useNode(node => ({
    parent: node.data.parent,
  }));

  useEffect(() => {
    console.log("add");
    dispatch(currentTipContainerIdsAction.pushNode(id));
    return () => {
      console.log("remove");
      dispatch(currentTipContainerIdsAction.removeNode(id));
    };
  }, [dispatch, id]);

  return <div ref={connect}></div>;
};

export const DropTipShowNode = () => (
  <DropTipContainer>拖动组件到这里</DropTipContainer>
);

DropTip.craft = {
  displayName: "DropTip",
  rules: {
    canDrag: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
};
