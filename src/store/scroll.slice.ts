/*
 * @Date: 2022-10-13 10:09:34
 * @LastEditTime: 2022-10-25 11:34:05
 * @LastEditors: 刘玉田
 * @Description: 滚动数据
 */

import { createSlice } from "@reduxjs/toolkit";
import { ScrollStatus } from "smooth-scrollbar/interfaces";
import { RootState } from ".";

type ScrollDataState = {
  status: ScrollStatus;
};

const initialState: ScrollDataState = {
  status: {
    limit: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  },
};

export const scrollData = createSlice({
  name: "scrollData",
  initialState,
  reducers: {
    setScrollData(state, action) {
      state.status = action.payload.status;
    },
  },
});

export const currentScrollDataAction = scrollData.actions;

export const currentScrollData = (state: RootState) => state.scrollData;
