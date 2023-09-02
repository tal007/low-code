/*
 * @Date: 2022-11-07 09:17:07
 * @LastEditTime: 2023-05-16 18:24:41
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Description: Header
 */

import { Layout, Space, Dropdown } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import React, { forwardRef } from "react";
import { DarkLightChange, ThemeChange } from "@/component/ThemeChange";
import storage from "@/utils/storage";

const { Header } = Layout;

export interface LayoutHeaderProps {
  collapsed: boolean;
}

export const LayoutHeader = forwardRef(() => {
  const loginOut = () => {
    storage.clearAll();
    window.location.href = "/login";
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "rgba(82, 136, 249, 1)",
  };
  const items = [
    {
      key: 1,
      label: "个人中心",
    },
  ];
  return (
    <Header
      className="site-layout-background layout-header"
      style={headerStyle}
    >
      <div className="menus">
        <h1>XX低代码平台</h1>
      </div>
      <Space className="configs">
        <ThemeChange />
        <DarkLightChange />
        <LogoutOutlined onClick={loginOut} />
        <Dropdown menu={{ items }}>
          <a onClick={e => e.preventDefault()} style={{ color: "white" }}>
            <Space>
              管理员
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Space>
    </Header>
  );
});
