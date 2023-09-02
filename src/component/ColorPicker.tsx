/*
 * @Date: 2022-11-25 10:25:44
 * @LastEditTime: 2022-11-25 11:48:03
 * @LastEditors: 刘玉田
 * @Description: 颜色选择
 */

import { ColorResult, SketchPicker } from "react-color";
import styled from "styled-components";

const ColorPickerContainer = styled.div<{ backgroundColor: string }>`
  line-height: 1;
  .addOn {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background-color: ${props => props.backgroundColor};
    cursor: pointer;
  }

  .mask {
    position: absolute;
    z-index: 2;
    right: 0;
  }

  .mask-inner {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
  }
`;

export const ColorPicker = ({
  chooseColorVisible,
  setChooseColorVisible,
  handleChange,
  defaultColor,
}: {
  chooseColorVisible: boolean;
  setChooseColorVisible: any;
  handleChange: (color: ColorResult) => void;
  defaultColor: string;
}) => {
  return (
    <ColorPickerContainer backgroundColor={defaultColor}>
      <div className="addOn" onClick={() => setChooseColorVisible(true)}></div>
      {chooseColorVisible && (
        <div className="mask">
          <div
            className="mask-inner"
            onClick={() => setChooseColorVisible(false)}
          />
          <SketchPicker color={defaultColor} onChange={handleChange} />
        </div>
      )}
    </ColorPickerContainer>
  );
};
