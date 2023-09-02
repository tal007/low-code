/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-03 16:20:30
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-09 11:23:48
 * @Description: 流程设计store
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { typeColor } from "@/page/OA/constant";
import { cloneDeep } from "lodash";
import { nanoid } from "@/utils/helper";

export type FlowJson = {
  type: keyof typeof typeColor;
  id: string;
  parentId?: string;
  name: string;
  properties: Record<string, any>;
  conditionDefinition?: Record<string, any>;
  conditions?: string[];
  childNode: string[];
  isDefaultCondition?: boolean;
};

export interface FlowState {
  selected: string;
  json: {
    [key: string]: FlowJson;
  };
}

export const initialState: FlowState = {
  selected: "",
  json: {
    "start-event": {
      type: "start",
      name: "发起人",
      id: "start-event",
      properties: {},
      childNode: [],
    },
  },
};

const generateCondition = (parentId: string, isDefault?: boolean) => {
  return {
    name: isDefault ? "默认条件" : "",
    type: "condition",
    parentId: parentId,
    id: nanoid(10),
    properties: {},
    conditionDefinition: {},
    childNode: [],
    isDefaultCondition: !!isDefault,
  } as FlowJson;
};

const cloneChild = (id: string, state: FlowState, parentId: string) => {
  const newId = nanoid(10);
  const cloneItem = cloneDeep(state.json[id]);
  cloneItem.id = newId;
  cloneItem.parentId = parentId;

  if (state.json[id].type !== "condition") {
    state.json[parentId].childNode = [newId];
  }
  state.json[newId] = cloneItem;

  // 克隆子节点ID处理
  const childNode = cloneItem.childNode;
  const children = [];
  childNode?.forEach(node => {
    const id = cloneChild(node, state, newId);
    children.push(id);
  });
  cloneItem.childNode = children;

  // 克隆子条件ID处理
  const conditions = cloneItem.conditions;
  const conditionIds = [];
  conditions?.forEach(condition => {
    const id = cloneChild(condition, state, newId);
    conditionIds.push(id);
  });
  cloneItem.conditions = conditionIds;
  return newId;
};

// 条件分支和普通分支单独处理
export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    initFlow(
      state,
      action: PayloadAction<{ data: { [key: string]: FlowJson } }>
    ) {
      state.json = action.payload.data;
    },
    setActive(state, action: PayloadAction<{ id: string }>) {
      state.selected = action.payload.id;
    },
    updateFlow(
      state,
      action: PayloadAction<{ id: string; attr: string; newValue: any }>
    ) {
      const { id, attr, newValue } = action.payload;
      console.log(id, attr, newValue);
      state.json[id][attr] = newValue;
      console.log(state.json[id]);
    },
    addFlow(state, action: PayloadAction<FlowJson>) {
      // 添加
      const id = action.payload.id;
      const parentId = action.payload.parentId;
      const json = state.json;
      json[id] = action.payload;
      const children = cloneDeep(json[parentId].childNode);
      json[parentId].childNode = [id];
      // 处理ID
      children.forEach(child => (json[child].parentId = id));
      json[id].childNode = children;
    },
    removeFlow(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const removeNode = state.json[id];
      const removeNodeChild = removeNode.childNode;
      const removeNodeParent = removeNode.parentId;
      removeNodeChild.forEach(
        item => (state.json[item].parentId = removeNodeParent)
      );
      state.json[removeNodeParent].childNode = removeNodeChild;
      delete state.json[id];
    },
    // 创建分支
    createCondition(state, action: PayloadAction<{ parentId: string }>) {
      const parentId = action.payload.parentId;
      const id = nanoid(10);
      const data: FlowJson = {
        type: "route",
        name: "条件连接器",
        parentId,
        id,
        properties: {},
        childNode: [],
        conditions: [],
      };

      const firstCondition = generateCondition(id);
      const defaultCondition = generateCondition(id, true);
      data.conditions.push(firstCondition.id, defaultCondition.id);
      const json = state.json;
      firstCondition.name = `条件${1}`;
      json[id] = data;
      const children = cloneDeep(json[parentId].childNode);
      json[parentId].childNode = [id];
      // 处理ID
      children.forEach(child => (json[child].parentId = id));
      json[id].childNode = children;

      json[firstCondition.id] = firstCondition;
      json[defaultCondition.id] = defaultCondition;
    },
    // 添加分支
    addCondition(state, action: PayloadAction<{ parentId: string }>) {
      const parentId = action.payload.parentId;
      const data = generateCondition(parentId);
      const parent = state.json[parentId];
      const conditions = parent.conditions;
      const len = conditions.length;
      data.name = `条件${len}`;
      conditions.splice(len - 1, 0, data.id);
      state.json[data.id] = data;
    },
    removeCondition(
      state,
      action: PayloadAction<{ parentId: string; id: string }>
    ) {
      const id = action.payload.id;
      const parentId = action.payload.parentId;
      const parent = state.json[parentId];
      const conditions = parent.conditions;
      const index = conditions.findIndex(n => n === id);
      if (conditions.length > 2) {
        conditions.splice(index, 1);
        delete state.json[id];
      } else {
        const grandParent = state.json[parent.parentId];
        const removeChild = [...parent.childNode];
        delete state.json[parentId];
        conditions.forEach(item => {
          delete state.json[item];
        });
        grandParent.childNode = removeChild;
      }
    },
    sortCondition(
      state,
      action: PayloadAction<{
        direction: "left" | "right";
        index: number;
        parentId: string;
      }>
    ) {
      const { direction, index, parentId } = action.payload;
      const conditions = state.json[parentId].conditions;
      const to = direction === "left" ? index - 1 : index + 1;
      const start = Math.min(to, index);
      const end = Math.max(to, index);
      const temp = conditions[start];
      conditions[start] = conditions[end];
      conditions[end] = temp;
    },
    copyCondition(
      state,
      action: PayloadAction<{ index: number; parentId: string }>
    ) {
      const { index, parentId } = action.payload;
      const conditions = state.json[parentId].conditions;
      const id = conditions[index];
      const cloneCondition = cloneDeep(state.json[id]);
      const cloneConditionId = nanoid(10);
      cloneCondition.id = cloneConditionId;
      cloneCondition.name = state.json[id].name + "（复制）";
      const childNode = cloneCondition.childNode;
      state.json[cloneConditionId] = cloneCondition;
      state.json[parentId].conditions.splice(index + 1, 0, cloneConditionId);

      childNode.forEach(node => {
        cloneChild(node, state, cloneConditionId);
      });
    },
  },
});

export const currentFlowActions = flow.actions;

export const currentFlow = (state: RootState) => state.flow;
