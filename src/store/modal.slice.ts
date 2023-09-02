/*
 * @Date: 2023-01-30 10:38:06
 * @LastEditTime: 2023-01-30 10:38:07
 * @LastEditors: 刘玉田
 * @Description: 弹窗
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ModalState {
  id: string;
  cb: () => void;
}

const initialState: ModalState[] = [];

export const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addModal(state, action: PayloadAction<ModalState>) {
      state.push(action.payload);
    },
    removeModal(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.findIndex(item => item.id === id);
      state.splice(index, 1);
    },
  },
});

export const currentModalsActions = modals.actions;

export const currentModals = (state: RootState) => state.modals;
