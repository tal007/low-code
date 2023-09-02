/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-11 15:38:42
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-18 10:04:22
 * @Description:
 */
import { FlowItem } from "./Item";
import { End } from "./End";
import { currentFlow, currentFlowActions } from "@/store/flow.slice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useQueryProcessBinaryId } from "@/api/formManage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const FlowDesign = styled.div`
  width: 100%;
  background-color: #f5f5f7;
  overflow: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`;

const FlowBox = styled.div`
  transform: scale(1);
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 70px 0;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  min-width: min-content;
  background-color: #f5f5f7;
  transform-origin: 50% 0px 0px;
`;
export const Flow = () => {
  const flowState = useSelector(currentFlow);

  return (
    <FlowDesign>
      <FlowBox className="scale-box">
        <FlowItem {...flowState.json["start-event"]} />
        <End></End>
      </FlowBox>
    </FlowDesign>
  );
};

export default Flow;
