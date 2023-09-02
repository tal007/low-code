/*
 * @Date: 2022-11-17 13:53:58
 * @LastEditTime: 2023-05-04 10:19:22
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 用户组维度 树
 */
import { Tree, Typography, Button } from "antd";
import type { TreeProps } from "antd/es/tree";
import styled from "styled-components";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { FlexBox } from "@/style";
import { useState } from "react";
import { LoadingContainer } from "@/component/LoadingContainer";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

export const DimensionTree = () => {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const [collapsed, setCollapsed] = useState(false);
  const WIDTH = 140;

  const isLoading = false;

  const { t } = useTranslation();

  return (
    <LoadingContainer loading={isLoading}>
      <TreeContainer style={{ width: collapsed ? 0 : WIDTH }}>
        <Paragraph className="title">
          {t("orgStructure.userGroupDimension")}
        </Paragraph>
        <FlexBox justify={"space-around"} style={{ marginBottom: 10 }}>
          <Button type="primary">{t("common.create")}</Button>
          <Button type="primary">{t("common.refresh")}</Button>
        </FlexBox>
        <Tree
          defaultExpandedKeys={["0-0-0", "0-0-1"]}
          defaultSelectedKeys={["0-0-0", "0-0-1"]}
          defaultCheckedKeys={["0-0-0", "0-0-1"]}
          showIcon={false}
          showLine
          onSelect={onSelect}
          onCheck={onCheck}
          // treeData={(data || [])?.map(item => ({
          //   key: item.dimKey,
          //   title: item.name,
          // }))}
          treeData={[]}
        />
        <Collapse
          style={{ left: collapsed ? 0 : WIDTH }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        </Collapse>
      </TreeContainer>
    </LoadingContainer>
  );
};

const TreeContainer = styled.div`
  /* position: relative; */
  text-align: center;
  height: 100%;
  overflow: hidden;
  transition: all 0.1s ease-in-out;

  .title {
    border-bottom: 1px solid #ddd;
    padding: 0 0 10px 0;
  }
`;

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
