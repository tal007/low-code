/*
 * @Date: 2022-09-21 10:31:07
 * @LastEditTime: 2023-05-25 15:18:47
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Description: redux 管理，有趣的是，文件夹名字必须命名为 store
 */

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { currentUIStateSlice } from "./useMobileUI.slice";
import { editorConfigState } from "./editor.slice";
import { scrollData } from "./scroll.slice";
import { language } from "./language.slice";
import { pageTabs } from "./pageTabs.slice";
import { theme } from "./theme.slice";
import { forms } from "./forms.slice";
import { modals } from "./modal.slice";
import { flow } from "./flow.slice";
import { formValue } from "./formValue.slice";
import { tipContainerIds } from "./tipContainer.slice";
import { flowSolutionAllGroup } from "./flowSolutionAllGroup.slice";
import { condition } from "./conditionFrom.slice";

export const rootReducer = combineReducers({
  currentUIState: currentUIStateSlice.reducer,
  editorConfigState: editorConfigState.reducer,
  scrollData: scrollData.reducer,
  language: language.reducer,
  pageTabs: pageTabs.reducer,
  theme: theme.reducer,
  forms: forms.reducer,
  modals: modals.reducer,
  flow: flow.reducer,
  formValue: formValue.reducer,
  tipContainerIds: tipContainerIds.reducer,
  flowSolutionAllGroup: flowSolutionAllGroup.reducer,
  condition: condition.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // FIX https://blog.csdn.net/weixin_42380024/article/details/124819200
      // https://redux-toolkit.js.org/api/getDefaultMiddleware
      serializableCheck: false,
    }),
});

export const publishStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
