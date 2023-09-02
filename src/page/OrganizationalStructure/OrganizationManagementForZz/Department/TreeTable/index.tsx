/*
 * @Date: 2022-11-07 14:11:50
 * @LastEditTime: 2023-05-04 10:19:47
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns, ActionType } from "@ant-design/pro-components";
import { EditableProTable, useRefFunction } from "@ant-design/pro-components";
import React, { useState, useEffect, useRef } from "react";
import update from "immutability-helper";
import { Space, Typography } from "antd";
import { TreeTableHandler } from "./Handler";

const { Link } = Typography;

const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id?: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: "活动名称一",
    decs: "这个活动真好玩",
    state: "open",
    created_at: "1590486176000",
    update_at: "1590486176000",
    children: [
      {
        id: 6246912293,
        title: "活动名称二",
        decs: "这个活动真好玩",
        state: "closed",
        created_at: "1590481162000",
        update_at: "1590481162000",
        children: [
          {
            id: 6246912294,
            title: "活动名称二",
            decs: "这个活动真好玩",
            state: "closed",
            created_at: "1590481162000",
            update_at: "1590481162000",
          },
        ],
      },
    ],
  },
  {
    id: 624691229,
    title: "活动名称二",
    decs: "这个活动真好玩",
    state: "closed",
    created_at: "1590481162000",
    update_at: "1590481162000",
  },
];

const loopDataSourceFilter = (
  data: DataSourceType[],
  id: React.Key | undefined
): DataSourceType[] => {
  return data
    .map(item => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as DataSourceType[];
};

export const TreeTable = () => {
  const { t } = useTranslation();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );
  const actionRef = useRef<ActionType>();

  const removeRow = useRefFunction((record: DataSourceType) => {
    setDataSource(loopDataSourceFilter(dataSource, record.id));
  });
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: t("orgStructure.groupName"),
      dataIndex: "title",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 2 ? [{ required: true, message: "此项为必填项" }] : [],
        };
      },
      width: 300,
    },
    {
      title: t("orgStructure.groupKey"),
      key: "state",
      dataIndex: "state",
      valueType: "select",
      width: 160,
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
    {
      title: t("orgStructure.groupLevel"),
      dataIndex: "decs",
      width: 160,
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "title"]) === "不好玩") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: t("orgStructure.order"),
      dataIndex: "order",
      width: 160,
      render: (_, record, index) => {
        return index;
      },
    },
    {
      title: t("common.action"),
      valueType: "option",
      align: "center",
      fixed: "right",
      width: 200,
      render: (text, record) => [
        <Link
          key="delete"
          onClick={() => {
            removeRow(record);
          }}
        >
          <DeleteOutlined />
        </Link>,
        <Link
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(record.id);
          }}
        >
          <EditOutlined />
        </Link>,
        <Link
          key="add"
          onClick={() => {
            const id = (Math.random() * 1000000).toFixed(0);
            actionRef.current?.addEditRecord(
              {
                id: id,
              },
              {
                parentKey: record.id,
                newRecordType: "dataSource",
              }
            );

            setExpandedRowKeys(
              update(expandedRowKeys, {
                $push: [record.id],
              })
            );
          }}
        >
          <PlusOutlined />
        </Link>,
      ],
    },
  ];

  const [scrollY, setScrollY] = useState(99999);
  useEffect(() => {
    const windowResize = () => {
      const antTabsContent = document.querySelector(".ant-tabs-content-holder");

      if (antTabsContent) {
        const { height } = antTabsContent.getBoundingClientRect();
        setScrollY(height - 64);
      }
    };
    windowResize();

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <TreeTableHandler />
      <EditableProTable<DataSourceType>
        expandable={{
          // 使用 request 请求数据时无效
          defaultExpandAllRows: true,
          fixed: true,
          expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys(
                update(expandedRowKeys, {
                  $push: [record.id],
                })
              );
            } else {
              const index = expandedRowKeys.findIndex(r => {
                return r === record.id;
              });
              setExpandedRowKeys(
                update(expandedRowKeys, {
                  $splice: [[index, 1]],
                })
              );
            }
          },
          // indentSize: 5
        }}
        scroll={{
          x: 600,
          y: scrollY,
        }}
        actionRef={actionRef}
        rowKey="id"
        headerTitle=""
        recordCreatorProps={false}
        columns={columns}
        value={dataSource}
        // onChange={setDataSource}
        onRow={record => {
          return {
            onClick: event => {
              console.log(event, record);
            },
          };
        }}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
          saveText: null,
          deleteText: null,
          cancelText: null,
        }}
      />
    </Space>
  );
};

export default TreeTable;
