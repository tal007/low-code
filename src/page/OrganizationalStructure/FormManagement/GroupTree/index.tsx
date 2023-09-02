import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input, Space, Button, Modal } from "antd";
import type { DataNode } from "antd/es/tree";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { TreeDemo } from "../TreeNode/index";
import { useAddGroup } from "@/api/formManage";
import { useQuery } from "@tanstack/react-query";
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
  for (const element of data) {
    const node = element;
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

export interface AntdTreeProps {
  width: number | string;
  height: number | string;
  setGroupId: Dispatch<SetStateAction<string>>;
}

export const AntdTree = (props: Partial<AntdTreeProps>) => {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const { width, height } = props;
  const container = useRef<HTMLDivElement>(null);
  const [defaultHeight, setDefaultHeight] = useState("100vh");

  useEffect(() => {
    if (container.current) {
      const { top } = container.current.getBoundingClientRect();
      setDefaultHeight(`calc(100vh - ${top + 30}px)`);
    }
  }, []);

  //新增分组弹窗
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const showModal = () => {
    setOpen(true);
  };

  const addGroup = useAddGroup();
  const { refetch } = useQuery(["addGroup"], () => addGroup(groupName), {
    enabled: false,
    onSuccess() {
      setGroupName("");
      ChildRef.current.onAdd();
    },
  });

  const ChildRef = React.useRef(null);
  const hideModal = () => {
    refetch();
    setOpen(false);
  };

  const groupChange = (value: string) => {
    setGroupName(value);
  };
  return (
    <AntdTreeContainer
      ref={container}
      width={width}
      height={height}
      defaultHeight={defaultHeight}
    >
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <span>分组列表</span>
        <Button type="link" icon={<PlusOutlined />} onClick={showModal}>
          新增分组
        </Button>
      </Space>
      <Search
        className="search-box"
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
        value={searchValue}
      />
      {<TreeDemo onRef={ChildRef} setGroupId={props.setGroupId}></TreeDemo>}
      <Modal
        title="新建分组"
        open={open}
        onOk={hideModal}
        onCancel={() => {
          setOpen(false);
        }}
        okText="新建"
        cancelText="取消"
      >
        <p>上级分组：表单分组（顶级）</p>
        <Input
          type="text"
          placeholder="请输入分组名称"
          value={groupName}
          onChange={e => {
            groupChange(e.target.value);
          }}
        />
      </Modal>
    </AntdTreeContainer>
  );
};

interface AntdTreeContainerProps
  extends Pick<AntdTreeProps, "height" | "width"> {
  defaultHeight: number | string;
}
const AntdTreeContainer = styled.div<AntdTreeContainerProps>`
  width: ${props => props.width || "200px"};
  height: ${props => props.height || props.defaultHeight};
  overflow: auto;
  position: relative;
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 6px;
  background-color: #ffff;
  .search-box {
    position: sticky;
    top: 0px;
    z-index: 99;
  }
`;

export default AntdTree;
