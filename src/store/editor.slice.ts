/*
 * @Date: 2022-09-22 16:10:55
 * @LastEditTime: 2023-05-25 10:44:30
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 编辑器的配置
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface BasicFormValue {
  processName: string;
  groupId: string;
  processRemark?: string;
}
export interface EditorState {
  nodes: any;
  activeNodeId: string;
  addNodeRandom: number;
  basicFormValue: BasicFormValue;
}

const initialState: EditorState = {
  nodes: {},
  activeNodeId: "ROOT",
  addNodeRandom: Math.random(),
  basicFormValue: {
    processName: "",
    groupId: "",
  },
};

export const editorConfigState = createSlice({
  name: "editorConfigState",
  initialState,
  reducers: {
    setEditorState(state, action: PayloadAction<{ nodes: string }>) {
      state.nodes = action.payload.nodes;
    },
    setActiveNodeId(state, action) {
      state.activeNodeId = action.payload;
    },
    setNodeRandom(state) {
      state.addNodeRandom = Math.random();
    },
    setBasicFormValue(
      state,
      action: PayloadAction<{ key: keyof BasicFormValue; value: string }>
    ) {
      const { key, value } = action.payload;
      state.basicFormValue[key] = value;
    },
    initialBasicFormValue(state) {
      state.basicFormValue = {
        processName: "",
        groupId: "",
      };
    },
  },
});

export const currentEditorConfigActions = editorConfigState.actions;

export const currentEditorConfig = (state: RootState) =>
  state.editorConfigState;
