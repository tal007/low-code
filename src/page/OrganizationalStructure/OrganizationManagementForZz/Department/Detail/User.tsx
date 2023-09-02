/*
 * @Date: 2022-11-08 15:38:31
 * @LastEditTime: 2023-05-04 10:20:13
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 用户关系
 */

import { Button, Input, Tabs, Table, Space, Typography } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Tab } from "rc-tabs/lib/interface";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { CreateOrEditUser } from "./CreateOrEditUser";

export const User = () => {
  const { t } = useTranslation();
  const tabItems: Tab[] = [
    { label: t("orgStructure.userInGroup"), key: "user" },
    { label: t("orgStructure.teamLeader"), key: "manager" },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  const [userModalVisible, setUserModalVisible] = useState(false);
  const createNewUser = () => {
    setUserModalVisible(true);
  };

  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <CreateOrEditUser
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
      ></CreateOrEditUser>
      <Space>
        <Input
          placeholder={`${t("common.pleaseInput")}${t("userInfo.name")}`}
        />
        <Input
          placeholder={`${t("common.pleaseInput")}${t("userInfo.name")}`}
        />
        <Button icon={<SearchOutlined />} type={"primary"}>
          {t("common.search")}
        </Button>
      </Space>
      <Space>
        <Button type={"primary"} onClick={createNewUser}>
          {t("common.create")}
        </Button>
        <Button type={"primary"}>{t("orgStructure.join")}</Button>
        <Button type={"primary"} danger>
          {t("common.delete")}
        </Button>
      </Space>
      <Tabs
        onChange={onChange}
        type="card"
        items={tabItems.map(item => ({
          ...item,
          children: <Data />,
        }))}
      />
      {/* <Data /> */}
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

const Data = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = [
    {
      title: t("userInfo.name"),
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>,
    },
    {
      title: t("orgStructure.userOrder"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: t("common.action"),
      key: "action",
      render: () => (
        <Space size="middle">
          <Typography.Link title={t("orgStructure.userDetAnchoril")}>
            <InfoCircleOutlined />
          </Typography.Link>
          <Typography.Link title={t("common.edit")}>
            <EditOutlined />
          </Typography.Link>
          <Typography.Link title={t("common.delete")}>
            <DeleteOutlined />
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return <Table size={"small"} columns={columns} dataSource={data} />;
};
