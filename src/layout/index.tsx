/*
 * @Date: 2022-09-21 14:57:37
 * @LastEditTime: 2023-09-02 14:53:08
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 布局
 */

import "./index.less";
import { Layout, Menu } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { PageTabs } from "./PageTabs";
import { currentPageTabsAction, currentPageTabs } from "@/store/pageTabs.slice";
import { useDispatch, useSelector } from "react-redux";
import { LayoutHeader } from "./Header";
import { items } from "@/routes/routesItems";
import storage from "@/utils/storage";
import { ACCESS_TOKEN } from "@/constant";

const { Sider, Content } = Layout;

export const App: React.FC = () => {
  const [collapsed] = useState(false);
  const LayoutHeaderRef = useRef();
  const dispatch = useDispatch();

  const pageTabs = useSelector(currentPageTabs).items;

  // useEffect(() => {
  //   const token = storage.getSession(ACCESS_TOKEN);
  //   if (!token) {
  //     window.location.href = "/login";
  //   }
  // }, []);

  return (
    <Layout id={"page-layout"} style={{ height: "100%" }}>
      <LayoutHeader ref={LayoutHeaderRef} />
      <Layout className="site-layout">
        <Sider
          className="sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ color: "#fff" }}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["/"]}
            defaultOpenKeys={["/sys"]}
            onClick={e => {
              const arr = [...e.keyPath].reverse();
              const keyPath = arr.join("");
              const isExist =
                pageTabs.findIndex(tab => tab.key === keyPath) >= 0;

              if (isExist) {
                dispatch(
                  currentPageTabsAction.setActiveKey({ newActiveKey: keyPath })
                );
              } else {
                dispatch(
                  currentPageTabsAction.addTab({
                    key: keyPath,
                  })
                );
              }
            }}
            items={items}
          />
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
          }}
        >
          <PageTabs />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
