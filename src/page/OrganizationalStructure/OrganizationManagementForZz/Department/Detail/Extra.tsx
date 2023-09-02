/*
 * @Date: 2022-11-17 15:21:32
 * @LastEditTime: 2023-05-04 10:20:35
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 扩展属性
 */
import { Button, Table, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

export const Extra = () => {
  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <Button type={"primary"}>设置扩展属性</Button>
      <Data />
    </Space>
  );
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>,
  },
  {
    title: "用户编号",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <a title="用户明细">
          <InfoCircleOutlined />
        </a>
        <a title="编辑">
          <EditOutlined />
        </a>
        <a title="删除">
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Data = () => <Table size={"small"} columns={columns} dataSource={data} />;
