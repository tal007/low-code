/*
 * @Date: 2022-11-08 15:39:48
 * @LastEditTime: 2022-11-21 15:54:52
 * @LastEditors: 刘玉田
 * @Description: 详情 编辑
 */

import { Tabs } from "antd";
import type { Tab } from "rc-tabs/lib/interface";
import { User } from "./User";
import { Org } from "./Org";
import { Extra } from "./Extra";
import styled from "styled-components";
import { useState } from "react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

export const Detail = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);
  const WIDTH = 360;

  const items: Tab[] = [
    {
      label: t("orgStructure.userRelationship"),
      key: "user",
      children: <User />,
    },
    {
      label: t("orgStructure.groupRelationship"),
      key: "org",
      children: <Org />,
    },
    {
      label: t("orgStructure.extraAttribute"),
      key: "extra",
      children: <Extra />,
    },
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      <Tabs
        type={"card"}
        defaultActiveKey="user"
        style={{
          width: collapsed ? WIDTH : 0,
        }}
        items={items}
        moreIcon={null}
      />
      <Collapse
        style={{ right: collapsed ? WIDTH : 0 }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </Collapse>
    </div>
  );
};

const Collapse = styled.div`
  position: absolute;
  top: 50%;
  width: 16px;
  padding: 10px 0;
  z-index: 10;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  background-color: #ddd;
`;
