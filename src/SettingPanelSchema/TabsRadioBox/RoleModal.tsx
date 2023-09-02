/**
 * @author 梁强
 * @filename RoleModal.tsx
 * @date 2023-05-19 星期五
 * @description RoleModal
 */

import CheckboxComponent from "@/page/OA/Components/DepartmentMember/CheckboxComponent";
import { ICommonModalProps } from "./DepartmentModal";
import { Button, Modal, Space } from "antd";
import { roleTreeData } from "@/page/OA/Components/DepartmentMember/constant";
import { useSetState } from "ahooks";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoleItem {
  //
}

interface IRoleModalProps extends ICommonModalProps {
  nodeProps: RoleComponentViewProps; // 考虑schema
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoleComponentViewProps {
  //
}

const RoleModal = (props: IRoleModalProps) => {
  const { t } = useTranslation();
  const { visible, onCancel, onOk } = props;

  const [{ selectRole }, setState] = useSetState({
    selectRole: [],
  });

  return (
    <Modal
      maskClosable
      width={"70%"}
      open={visible}
      title={"选择角色"}
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
          <Button type="primary" onClick={() => onOk(selectRole)}>
            {t("form.User.ok", { ns: "editorWidget" })}
          </Button>
        </Space>
      }
    >
      <CheckboxComponent
        title=""
        type="role"
        onCheck={e => {
          setState({
            selectRole: roleTreeData.filter(item => e.includes(item.id)),
          });
        }}
        options={roleTreeData}
      />
    </Modal>
  );
};

export default RoleModal;
