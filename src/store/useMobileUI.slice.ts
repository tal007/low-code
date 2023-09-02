/*
 * @Date: 2022-09-22 10:39:04
 * @LastEditTime: 2023-04-14 15:40:02
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 设置是否使用移动端UI
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface State {
  useMobileUI: boolean;
}

const initialState: State = { useMobileUI: false };

export const currentUIStateSlice = createSlice({
  name: "currentUIState",
  initialState,
  reducers: {
    setUseMobileUI(state, action) {
      state.useMobileUI = action.payload;
    },
  },
});

export const currentUIStateActions = currentUIStateSlice.actions;

export const currentUIState = (state: RootState) =>
  state.currentUIState.useMobileUI;
