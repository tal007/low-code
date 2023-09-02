/*
 * @Date: 2022-11-04 16:47:27
 * @LastEditTime: 2023-05-09 17:30:26
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { currentPageTabsAction, currentPageTabs } from "@/store/pageTabs.slice";
import { tabRender } from "@/routes/routesMap";
import React from "react";
import { ErrorBoundary } from "@/component/ErrorBoundary";

export const PageTabs = () => {
  const dispatch = useDispatch();
  const { activeKey, items } = useSelector(currentPageTabs);

  const onChange = (newActiveKey: string) => {
    dispatch(currentPageTabsAction.setActiveKey({ newActiveKey }));
  };

  const onEdit = (targetKey: string, action: "add" | "remove") => {
    if (action === "remove") {
      dispatch(currentPageTabsAction.removeTab({ targetKey }));
    }
  };

  return (
    <Tabs
      type={"editable-card"}
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      // 添加销毁 table 高度自适应
      destroyInactiveTabPane
      hideAdd
      items={items.map(item => {
        return {
          ...item,
          label: tabRender(item.key)?.label  || '',
          children: (
            <ErrorBoundary>
              {React.createElement(tabRender(item.key).render)}
            </ErrorBoundary>
          ),
        };
      })}
    />
  );
};
