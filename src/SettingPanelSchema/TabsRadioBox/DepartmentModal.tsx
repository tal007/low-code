/**
 * @author 梁强
 * @filename DepartmentModal.tsx
 * @date 2023-05-11 星期四
 * @description DepartmentModal
 */
import { Button, Modal, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import DepartMentAndUser from "./DuComponent";
import { useRef } from "react";
import { DepartMentAndUserTreeItem } from "./OrgStructureTree";

export interface AcademyComponentViewProps {
  academyOptions: DefaultOptionType[];
  placeholder: string;
  optionalNumber: number;
  academyOptionsMode: number;
  mainGate: boolean;
}

export interface ICommonModalProps {
  visible: boolean;
  onOk: (val: DepartMentAndUserTreeItem[]) => void;
  onCancel: () => void;
  multiple?: boolean;
}

interface IDepartmentModalProps extends ICommonModalProps {
  nodeProps: AcademyComponentViewProps;
}

const DepartmentModal = (props: IDepartmentModalProps) => {
  const treeNodesRef: {
    current: {
      selectNodes: DepartMentAndUserTreeItem[];
    };
  } = useRef();
  const { t } = useTranslation();
  const { visible, onCancel, onOk, nodeProps, multiple } = props;

  return (
    <Modal
      maskClosable
      width={"70%"}
      open={visible}
      title={t("form.Academy.selectDepartment", { ns: "editorWidget" })}
      onCancel={onCancel}
      onOk={onCancel}
      destroyOnClose
      footer={
        <Space>
          <Button type="default" onClick={() => onCancel()}>
            {t("form.Academy.cancel", { ns: "editorWidget" })}
          </Button>
          <Button
            type="primary"
            onClick={() => onOk(treeNodesRef.current?.selectNodes)}
          >
            {t("form.Academy.ok", { ns: "editorWidget" })}
          </Button>
        </Space>
      }
    >
      <DepartMentAndUser
        ref={treeNodesRef}
        multiple={multiple}
        nodeProps={nodeProps}
      />
    </Modal>
  );
};

export default DepartmentModal;
