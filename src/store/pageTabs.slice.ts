/*
 * @Date: 2022-11-04 16:51:23
 * @LastEditTime: 2022-11-07 09:11:10
 * @LastEditors: 刘玉田
 * @Description:
 */
import { RootState } from ".";
import { createSlice } from "@reduxjs/toolkit";
import type { Tab } from "rc-tabs/lib/interface";

export interface PageTabsState {
  activeKey: string;
  items: Tab[];
}

const initialState: PageTabsState = {
  activeKey: "/",
  items: [
    {
      label: "主页",
      key: "/",
      closable: false,
    },
  ],
};

export const pageTabs = createSlice({
  name: "pageTabs",
  initialState: initialState,
  reducers: {
    setActiveKey(state, action) {
      state.activeKey = action.payload.newActiveKey;
    },
    addTab(state, action) {
      const { items } = state;
      const { label, key } = action.payload;

      const newPanes = [...items];
      newPanes.push({
        label,
        key: key,
      });
      state.items = newPanes;
      state.activeKey = key;
    },
    removeTab(state, action) {
      const { items, activeKey } = state;
      const { targetKey } = action.payload;

      let newActiveKey = activeKey;
      let lastIndex = -1;
      items.forEach((item, i) => {
        if (item.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newPanes = items.filter(item => item.key !== targetKey);
      if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = newPanes[0].key;
        }
      }
      state.items = newPanes;
      state.activeKey = newActiveKey;
    },
  },
});

export const currentPageTabsAction = pageTabs.actions;

export const currentPageTabs = (state: RootState) => state.pageTabs;
