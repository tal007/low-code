/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-09 16:18:57
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-05-18 16:53:27
 * @Description: 表单列表
 */
import { Button, Space, Modal } from "antd";
import { AntdTree } from "../GroupTree/index";
import AntdProTable from "@/component/AntdPro/AntdProTable";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RightOutlined, HddFilled, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQueryAllFlowSolution } from "@/api/formManage/index";
import { Result, ResultItem } from "./index.d";
import {
  Publish,
  EditProcess,
  StopOrStart,
  Move,
  RemoveProcess,
  RenderGroup,
  ColumnTitle,
} from "./Common";

const Status = styled.span<{ color: string }>`
  color: ${props => props.color};
`;

const columns: ProColumns<ResultItem>[] = [
  {
    title: () => <ColumnTitle titleI18n="title" />,
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
    search: false,
  },
  {
    title: "表单名称",
    dataIndex: "processName",
    copyable: true,
    ellipsis: true,
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
    title: "所属分组",
    dataIndex: "processId",
    filters: true,
    onFilter: true,
    ellipsis: true,
    search: false,
    renderText(text, record) {
      return <RenderGroup record={record} />;
    },
  },
  {
    disable: true,
    title: "表单状态",
    dataIndex: "processStatus",
    ellipsis: true,
    valueType: "select",
    valueEnum: {
      1: {
        text: <Status color="#61c131">已发布</Status>,
        status: "1",
        color: "#61c131",
      },
      0: {
        text: <Status color="#f8817f">未发布</Status>,
        status: "0",
        color: "#f8817f",
      },
      2: {
        text: <Status color="#7f7f7f">已停用</Status>,
        status: "2",
        color: "#7f7f7f",
      },
    },
  },
  {
    title: "创建时间",
    key: "createTime",
    dataIndex: "createTime",
    valueType: "dateTime",
    search: false,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record) => [
      <Publish key="publish" record={record} />,
      <EditProcess key="edit" record={record} />,
      <StopOrStart key="stopOrStart" record={record} />,
      <Move key="move" record={record} />,
      <RemoveProcess key="remove" record={record} />,
    ],
  },
];

export const OrgFormList = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [groupId, setGroupId] = useState<undefined | string>(undefined);

  const navigate = useNavigate();
  const jumpOa = () => {
    navigate(`/oa`);
  };

  useEffect(() => {
    actionRef.current.reload();
  }, [groupId]);

  const allFlowSolutionClient = useQueryAllFlowSolution();

  return (
    <Container>
      <div className="tree">
        <AntdTree setGroupId={setGroupId} />
      </div>
      <div className="table">
        <AntdProTable<ResultItem, Record<string, any>>
          id="form-list"
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async params => {
            const result: Result = await allFlowSolutionClient({
              keyword: params.processName,
              processStatus: params.processStatus,
              groupId: groupId,
              size: params.pageSize,
              current: params.current,
            });
            console.log(params, result);
            return {
              data: result.records.map(record => ({
                ...record,
                actionRef,
              })),
              success: true,
              total: result.total,
            };
          }}
          columnsState={{
            persistenceKey: "pro-table-singe-demos",
            persistenceType: "localStorage",
            onChange(value) {
              console.log("value: ", value);
            },
          }}
          rowKey="processId"
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
              <Button
                key="button"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                创建新表单
              </Button>
            </Space>
          }
        />
      </div>
      <Modal
        title="新增"
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[]}
        style={{ marginTop: "200px" }}
      >
        <Space style={{ overflow: "auto" }}>
          <Wrap onClick={jumpOa}>
            <HddFilled
              style={{ fontSize: "30px", color: "green", marginRight: "5px" }}
            />
            <div>
              <p className="title">流程表单</p>
              <p className="des">适用于需要审批的场景</p>
            </div>
            <RightOutlined />
          </Wrap>
          <Wrap>
            <HddFilled style={{ fontSize: "30px", color: "blue" }} />
            <div>
              <p className="title">数据表单</p>
              <p className="des">适用于数据收集无需审批的场景</p>
            </div>
            <RightOutlined />
          </Wrap>
        </Space>
      </Modal>
    </Container>
  );
};

const Wrap = styled.div`
  border: 1px #dfd9d9 solid;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: auto;
  .title {
    color: #000;
    height: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .des {
    color: lightgray;
    height: 10px;
  }
`;

const Container = styled.div`
  background-color: rgb(242 244 245);
  overflow: hidden;

  .tree {
    float: left;
    height: 100%;
  }
  .table {
    float: right;
    width: calc(100% - 200px);
  }
`;

export default OrgFormList;
