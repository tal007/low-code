import {
  useDeleteFlowSolutionById,
  useMoveFlowSolution,
  useStartOrStopSolution,
} from "@/api/formManage";
import { useQuery } from "@tanstack/react-query";
import { Modal, Popconfirm, Select } from "antd";
import { ResultItem } from "./index.d";
import { useNavigate } from "react-router";
import { currentFlowSolutionAllGroup } from "@/store/flowSolutionAllGroup.slice";
import { MPContainer } from "@/style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const RemoveProcess = ({ record }: { record: ResultItem }) => {
  const { processId, actionRef } = record;
  const removeProcessBinaryIdClient = useDeleteFlowSolutionById();

  const { refetch } = useQuery(
    ["removeProcessBinaryId", processId],
    () => removeProcessBinaryIdClient(processId),
    {
      enabled: false,
      onSuccess() {
        actionRef?.current?.reload();
      },
    }
  );

  const removeItem = () => {
    refetch();
  };

  return (
    <Popconfirm
      placement={"leftBottom"}
      title="Delete the task"
      onConfirm={removeItem}
      okText="Yes"
      cancelText="No"
    >
      <a style={{ color: "#f56c6c" }}>删除</a>
    </Popconfirm>
  );
};

export const EditProcess = ({ record }: { record: ResultItem }) => {
  const navigate = useNavigate();

  const jump = () => {
    navigate(`/oa/${record.processId}`);
  };
  return <a onClick={jump}>配置</a>;
};

export const Move = ({ record }: { record: ResultItem }) => {
  const { processId, actionRef, groupId } = record;
  const flowSolutionAllGroup = useSelector(currentFlowSolutionAllGroup);
  const moveFlowSolutionClient = useMoveFlowSolution();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const { refetch } = useQuery(
    ["removeProcessBinaryId", processId],
    () => moveFlowSolutionClient(processId, id),
    {
      enabled: false,
      onSuccess() {
        actionRef?.current?.reload();
      },
    }
  );

  return (
    <>
      <a onClick={() => setOpen(true)}>移动</a>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => refetch()}
        destroyOnClose
      >
        <MPContainer margin={"0 0 10px 0"} padding={0}>
          移动到
        </MPContainer>
        <Select
          style={{ width: "100%" }}
          fieldNames={{ label: "name", value: "id" }}
          options={flowSolutionAllGroup.groups.filter(
            group => group.id !== groupId
          )}
          defaultValue={id}
          onChange={v => setId(v)}
          placeholder={"请选择"}
        />
      </Modal>
    </>
  );
};

export const StopOrStart = ({ record }: { record: ResultItem }) => {
  const { processId, processStatus } = record;
  const stopOrStartClient = useStartOrStopSolution();

  const canClick = processStatus !== 0;
  const status = processStatus === 2 ? "true" : "false";

  const { refetch } = useQuery(
    ["stopOrStartSolution", processId],
    () => stopOrStartClient(processId, status),
    {
      enabled: false,
    }
  );

  return (
    <a
      style={{
        color: canClick ? "#1677ff" : "#808080",
        cursor: canClick ? "pointer" : "not-allowed",
      }}
      onClick={() => {
        canClick && refetch();
      }}
    >
      {status === "false" ? "停用" : "启用"}
    </a>
  );
};

export const Publish = ({ record }: { record: ResultItem }) => {
  return <a>发布</a>;
};

export const RenderGroup = ({ record }: { record: ResultItem }) => {
  const flowSolutionAllGroup = useSelector(currentFlowSolutionAllGroup);
  const [name, setName] = useState(record.processId);

  useEffect(() => {
    if (flowSolutionAllGroup.groups.length) {
      const matchItem = flowSolutionAllGroup.groups.find(
        group => group.id === record.groupId
      );
      setName(matchItem.name);
    }
  }, [flowSolutionAllGroup.groups, record.groupId]);

  return <>{name}</>;
};

export const ColumnTitle = ({ titleI18n }: { titleI18n: string }) => {
  const { t } = useTranslation();

  return t(titleI18n, { ns: "common" });
};
