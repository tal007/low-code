/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-03 15:20:47
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-03 16:20:55
 * @Description: 结束流程
 */
import styled from "styled-components";

const EndNode = styled.div`
  border-radius: 50%;
  font-size: 14px;
  color: rgba(25, 31, 37, 0.4);
  text-align: left;

  .end-node-circle {
    width: 10px;
    height: 10px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc;
  }
  .end-node-text {
    margin-top: 5px;
    text-align: center;
    cursor: text;
  }
`;

export const End = () => {
  return (
    <EndNode>
      <div className="end-node-circle"></div>
      <div className="end-node-text">流程结束</div>
    </EndNode>
  );
};
