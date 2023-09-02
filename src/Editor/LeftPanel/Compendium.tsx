/*
 * @Date: 2022-09-26 13:48:57
 * @LastEditTime: 2022-10-19 09:45:52
 * @LastEditors: 刘玉田
 * @Description: 大纲
 */
import styled from "styled-components";
import { Layers } from "../Layer";

const LayerContainer = styled.div`
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(60, 186, 146)),
      color-stop(0.72, rgb(253, 187, 45)),
      color-stop(0.86, rgb(253, 187, 45))
    ); */
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
`;

export const Compendium = () => {
  return (
    <LayerContainer>
      <Layers expandRootOnLoad={true} />
    </LayerContainer>
  );
};
