/*
 * @Date: 2022-12-22 11:13:04
 * @LastEditTime: 2023-04-17 16:04:41
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 表单值
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface FormValueState {
  [key: string]: any;
}

const initialState: FormValueState = {};

export const formValue = createSlice({
  name: "formValue",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<{ id: string; value: any }>) {
      const { id, value } = action.payload;
      state[id] = value;
    },
    removeValue(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      delete state[id];
    },
  },
});

export const currentFormValueActions = formValue.actions;

export const currentFormValue = (state: RootState) => state.formValue;
