/*
 * @Date: 2022-12-07 10:16:35
 * @LastEditTime: 2023-05-04 10:47:03
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: antd 树
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import styled from "styled-components";

const { Search } = Input;

const x = 6;
const y = 5;
const z = 4;
const defaultData: DataNode[] = [];

const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: DataNode[]
) => {
  const preKey = _preKey || "0";
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export interface AntdTreeProps {
  width: number | string;
  height: number | string;
}

export const AntdTree = (props: Partial<AntdTreeProps>) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map(item => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [searchValue]);

  const { width, height } = props;
  const container = useRef<HTMLDivElement>(null);
  const [defaultHeight, setDefaultHeight] = useState("100vh");

  useEffect(() => {
    if (container.current) {
      const { top } = container.current.getBoundingClientRect();
      setDefaultHeight(`calc(100vh - ${top + 30}px)`);
    }
  }, []);

  return (
    <AntdTreeContainer
      ref={container}
      width={width}
      height={height}
      defaultHeight={defaultHeight}
    >
      <Search
        className="search-box"
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
      />
    </AntdTreeContainer>
  );
};

interface AntdTreeContainerProps extends AntdTreeProps {
  defaultHeight: number | string;
}
const AntdTreeContainer = styled.div<AntdTreeContainerProps>`
  width: ${props => props.width || "200px"};
  height: ${props => props.height || props.defaultHeight};
  overflow: auto;
  position: relative;

  .search-box {
    position: sticky;
    top: 0px;
    z-index: 99;
  }
`;

export default AntdTree;
