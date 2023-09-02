/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-25 14:12:23
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-09 09:52:58
 * @FilePath: \mylcp_web\src\store\conditionFrom.slice.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@/utils/helper";
import { RootState } from ".";

interface ConditionGroup {
  groupId: string;
  connectType: "AND" | "OR";
  name: string;
  order?: number;
  conditionModel: ConditionModel[];
}

interface ConditionModel {
  modelId: string;
  order?: number;
  computeModel: ComputeModel[];
  dataOrigin: DataOrigin;
}

interface ComputeModel {
  presetsData: {
    numberData?: number;
    moreNumber?: number;
    moreCode?: string;
    lessCode?: string;
    lessNumber?: number;
  };
  operationType: string;
}

interface DataOrigin {
  dataName: string;
  dataId: string;
}

interface PresetsData {
  numberData?: number;
  moreNumber?: number;
  moreCode?: string;
  lessCode?: string;
  lessNumber?: number;
}

//初始数据
const initialState: ConditionGroup[] = [
  {
    groupId: nanoid(10),
    connectType: "AND",
    name: "条件组1",
    order: 1,
    conditionModel: [
      {
        modelId: nanoid(10),
        order: 1,
        computeModel: [
          {
            presetsData: {
              numberData: 0,
            },
            operationType: "numberLessThan",
          },
        ],
        dataOrigin: {
          dataName: "",
          dataId: "",
        },
      },
    ],
  },
];

export const condition = createSlice({
  name: "condition",
  initialState: {
    addConditionGroup: initialState,
  },
  reducers: {
    //初始化数据
    initCondition(state) {
      state.addConditionGroup.length = 0;
      state.addConditionGroup.push({
        groupId: nanoid(10),
        connectType: "AND",
        name: "条件组1",
        order: 1,
        conditionModel: [
          {
            modelId: nanoid(10),
            order: 1,
            computeModel: [
              {
                presetsData: {
                  numberData: 0,
                },
                operationType: "numberLessThan",
              },
            ],
            dataOrigin: {
              dataName: "",
              dataId: "",
            },
          },
        ],
      });
      console.log("初始化", state.addConditionGroup);
    },
    //更新数据
    updateCondition(state, action: PayloadAction<any>) {
      console.log(state.addConditionGroup);
      console.log(action.payload);
      state.addConditionGroup = action.payload.addConditionGroup;
      console.log("更新后", state.addConditionGroup);
    },
    setCardCondition(state, action: PayloadAction<any>) {
      console.log(state.addConditionGroup);
      console.log(action.payload);
      state.addConditionGroup.push(action.payload);
      console.log("设置", state.addConditionGroup);
    },
    deleteCardCondition(state, action: PayloadAction<{ id: string }>) {
      const index = state.addConditionGroup.findIndex(
        item => item.groupId == action.payload.id
      );
      state.addConditionGroup.splice(index, 1);
    },
    setFormCondition(state, action: PayloadAction<any>) {
      state.addConditionGroup.map(i => {
        if (i.groupId == action.payload.groupId) {
          i.conditionModel.push({
            modelId: nanoid(10),
            order: 2,
            computeModel: [
              {
                presetsData: {
                  numberData: 0,
                },
                operationType: "numberLessThan",
              },
            ],
            dataOrigin: {
              dataName: "",
              dataId: "",
            },
          });
        }
      });
    },
    deleteFormCondition(
      state,
      action: PayloadAction<{ groupId: string; arr: any }>
    ) {
      const index = state.addConditionGroup.findIndex(
        item => item.groupId == action.payload.groupId
      );
      state.addConditionGroup[index].conditionModel = action.payload.arr;
    },
    updateFormCondition(
      state,
      action: PayloadAction<{
        groupId: string;
        modelId: string;
        dataOrigin: DataOrigin;
      }>
    ) {
      const index = state.addConditionGroup.findIndex(
        item => item.groupId == action.payload.groupId
      );
      if (index != -1) {
        state.addConditionGroup[index].conditionModel.map(i => {
          if (i.modelId == action.payload.modelId) {
            i.dataOrigin = action.payload.dataOrigin;
          }
        });
      }
    },
    updateFormOperationType(
      state,
      action: PayloadAction<{
        groupId: string;
        modelId: string;
        operationType: string;
      }>
    ) {
      const index = state.addConditionGroup.findIndex(
        item => item.groupId == action.payload.groupId
      );
      if (index != -1) {
        state.addConditionGroup[index].conditionModel.map(i => {
          if (i.modelId == action.payload.modelId) {
            i.computeModel[0].operationType = action.payload.operationType;
          }
        });
      }
    },
    updatePresetsData(
      state,
      action: PayloadAction<{
        groupId: string;
        modelId: string;
        presetsData: PresetsData;
      }>
    ) {
      const index = state.addConditionGroup.findIndex(
        item => item.groupId == action.payload.groupId
      );
      if (index != -1) {
        state.addConditionGroup[index].conditionModel.map(i => {
          if (i.modelId == action.payload.modelId) {
            i.computeModel[0].presetsData = action.payload.presetsData;
          }
        });
      }
    },
  },
});

export const currentConditionActions = condition.actions;
export const currentCondition = (state: RootState) => state.condition;
