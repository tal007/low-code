import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Group } from "@/page/OrganizationalStructure/FormManagement/TreeNode/index.d";

const initialState: { groups: Group[] } = {
  groups: [],
};

export const flowSolutionAllGroup = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
  },
});

export const currentFlowSolutionAllGroupActions = flowSolutionAllGroup.actions;

export const currentFlowSolutionAllGroup = (state: RootState) =>
  state.flowSolutionAllGroup;
