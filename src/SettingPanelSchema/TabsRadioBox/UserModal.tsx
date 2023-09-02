/**
 * @author 梁强
 * @filename UserModal.tsx
 * @date 2023-05-11 星期四
 * @description UserModal
 */
import { ICommonModalProps } from "./DepartmentModal";
import { Button, Modal, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import DepartMentAndUser from "./DuComponent";
import { useRef } from "react";
import { DepartMentAndUserTreeItem } from "./OrgStructureTree";

interface IUserModalProps extends ICommonModalProps {
  nodeProps: UserComponentViewProps;
}

export interface UserComponentViewProps {
  userOptions: DefaultOptionType[];
  placeholder: string;
  optionalRange: number;
  userOptionsMode: number;
  mainGate: boolean;
}

const UserModal = (props: IUserModalProps) => {
  const treeNodesRef: {
    current: {
      selectNodes: DepartMentAndUserTreeItem[];
    };
  } = useRef();
  const { t } = useTranslation();
  const { visible, onCancel, onOk, nodeProps, multiple = false } = props;

  return (
    <Modal
      maskClosable
      width={"70%"}
      open={visible}
      title={t("form.User.selectUser", { ns: "editorWidget" })}
      onCancel={onCancel}
      onOk={onCancel}
      destroyOnClose
      cancelText={t("form.User.cancel", { ns: "editorWidget" })}
      okText={t("form.User.ok", { ns: "editorWidget" })}
      footer={
        <Space>
          <Button type="default" onClick={() => onCancel()}>
            {t("form.User.cancel", { ns: "editorWidget" })}
          </Button>
          <Button
            type="primary"
            onClick={() => onOk(treeNodesRef.current?.selectNodes)}
          >
            {t("form.User.ok", { ns: "editorWidget" })}
          </Button>
        </Space>
      }
    >
      <DepartMentAndUser
        ref={treeNodesRef}
        multiple={multiple}
        nodeProps={nodeProps}
        mode="User"
      />
    </Modal>
  );
};

export default UserModal;
