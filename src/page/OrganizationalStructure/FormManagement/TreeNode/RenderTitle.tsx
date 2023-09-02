import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Popover, Space, Button, Modal } from "antd";
import { Group } from "./index.d";
import { useState } from "react";
import { useDeleteGroupById, useUpdateGroup } from "@/api/formManage";
import { useQuery } from "@tanstack/react-query";

export const RenderTitle = (
  props: Pick<Group, "name" | "id"> & { refetch: () => void }
) => {
  const [isEdit, setIsEdit] = useState(false);
  const { name, id, refetch } = props;
  const [value, setValue] = useState(name);

  const deleteClient = useDeleteGroupById();
  const { refetch: doDelete } = useQuery(
    ["deleteGroupById", id],
    () => deleteClient(id),
    {
      enabled: false,
      onSuccess() {
        refetch();
      },
    }
  );

  const updateClient = useUpdateGroup();
  const { refetch: doUpdate } = useQuery(
    ["updateGroup", id],
    () => updateClient(id, value),
    {
      enabled: false,
      onSuccess() {
        setIsEdit(false);
      },
      onError() {
        setValue(name);
      },
    }
  );

  const { t } = useTranslation();

  if (id === "0") return <>{name}</>;

  const onCancel = () => {
    setIsEdit(false);
    setValue(name);
  };

  const onDelete = () => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      content: t("common.deleteConfirm", { name }),
      onOk() {
        doDelete();
      },
    });
  };

  if (isEdit) {
    return (
      <div>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ width: "80px" }}
        />

        <CloseOutlined
          style={{ marginLeft: 10, color: "#a3abb5" }}
          onClick={onCancel}
        />

        <CheckOutlined
          style={{ marginLeft: 10, color: "#1677ff" }}
          onClick={() => doUpdate()}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "130px",
      }}
    >
      <span>{value || name}</span>
      <span>
        <Popover
          placement="bottomRight"
          content={
            <Space direction={"vertical"}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                修改
              </Button>
              <Button type="text" icon={<DeleteOutlined />} onClick={onDelete}>
                {t("common.delete")}
              </Button>
            </Space>
          }
        >
          <MoreOutlined style={{ marginLeft: 10 }} />
        </Popover>
      </span>
    </div>
  );
};
