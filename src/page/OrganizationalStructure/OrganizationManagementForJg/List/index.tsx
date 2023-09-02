/*
 * @Date: 2022-12-05 15:21:33
 * @LastEditTime: 2023-05-04 10:24:15
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 机构列表
 */

import AntdProTable from "@/component/AntdPro/AntdProTable";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { TableDropdown } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import { useRef } from "react";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: "维度名称",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    tip: "标题过长会自动收缩",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    disable: true,
    title: "维度业务主键",
    dataIndex: "labels",
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    disable: true,
    title: "状态",
    dataIndex: "state",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      all: { text: "超长".repeat(50) },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
        disabled: true,
      },
      processing: {
        text: "解决中",
        status: "Processing",
      },
    },
  },
  {
    title: "是否缺省",
    key: "showTime1",
    dataIndex: "created_at",
    valueType: "date",
    sorter: true,
    search: false,
  },
  {
    title: "排序号",
    key: "showTime2",
    dataIndex: "created_at",
    valueType: "date",
    search: false,
  },
  {
    title: "数据展示类型",
    key: "showTime3",
    dataIndex: "created_at",
    valueType: "date",
    search: false,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        明细
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        等级管理
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "维度关系定义" },
          { key: "delete", name: "维度权限" },
        ]}
      />,
    ],
  },
];

export const OrgList = () => {
  const actionRef = useRef<ActionType>();
  const { t } = useTranslation();

  return (
    <AntdProTable<GithubIssueItem, Record<string, any>>
      id="org-list"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        return fetch("https://proapi.azurewebsites.net/github/issues", {}).then(
          response => response.json()
        );
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        onChange: page => console.log(page),
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle={
        <Space>
          <Button key="button" type="primary">
            {t("common.create")}
          </Button>
          <Button key="button" type="primary">
            {t("common.edit")}
          </Button>
          <Button key="button" type="primary" danger>
            {t("common.delete")}
          </Button>
        </Space>
      }
    />
  );
};

export default OrgList;
