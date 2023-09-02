/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-24 15:03:17
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-24 15:21:21
 * @Description: tip容器，这部分容器将不会在页面展示，起提示用户拖拽的作用
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import update from "immutability-helper";

const initialState: string[] = [];

export const tipContainerIds = createSlice({
  name: "editorConfigState",
  initialState,
  reducers: {
    pushNode(state, action: PayloadAction<string>) {
      console.log(111);
      state.push(action.payload);
    },
    removeNode(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload);
      update(state, {
        $splice: [[index, 1]],
      });
    },
  },
});

export const currentTipContainerIdsAction = tipContainerIds.actions;

export const currentTipContainerIds = (state: RootState) =>
  state.tipContainerIds;
