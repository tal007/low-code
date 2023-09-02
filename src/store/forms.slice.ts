/*
 * @Date: 2022-12-22 11:13:04
 * @LastEditTime: 2023-01-30 10:38:10
 * @LastEditors: 刘玉田
 * @Description: 编辑器中所有的表单容器
 */

import { ProFormInstance } from "@ant-design/pro-components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import React from "react";

export interface FormState {
  id: string;
  ref: () => React.MutableRefObject<ProFormInstance<any>>;
}

const initialState: FormState[] = [];

export const forms = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormState>) {
      state.push(action.payload);
    },
    removeForm(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.findIndex(item => item.id === id);
      state.splice(index, 1);
    },
  },
});

export const currentFormsActions = forms.actions;

export const currentForms = (state: RootState) => state.forms;
