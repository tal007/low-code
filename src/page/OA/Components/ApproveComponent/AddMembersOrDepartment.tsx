/**
 * @author 梁强
 * @date 2023-05-16 星期二
 * @function 添加成员
 * @param {}
 * @return {}
 */
import Tags from "@/SettingPanelSchema/TabsRadioBox/Tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Space } from "antd";
import { useSetState } from "ahooks";
import UserModal from "@/SettingPanelSchema/TabsRadioBox/UserModal";
import DepartmentModal from "@/SettingPanelSchema/TabsRadioBox/DepartmentModal";
import {
  DepartMentAndUserTreeItemType,
  DepartMentAndUserTreeItem,
} from "@/SettingPanelSchema/TabsRadioBox/OrgStructureTree";
import RoleModal from "@/SettingPanelSchema/TabsRadioBox/RoleModal";

interface CutormFormItemProps {
  mode: DepartMentAndUserTreeItemType;
  value?: DepartMentAndUserTreeItem[];
  onChange?: (val: DepartMentAndUserTreeItem[]) => void;
  multiple?: boolean;
}

const modalMap = {
  Department: "departmentModal",
  User: "userModal",
  Role: "roleModal",
};

interface ModalProps {
  userModal: boolean;
  departmentModal: boolean;
  roleModal: boolean;
}

const AddMembersOrDepartment = (props: CutormFormItemProps) => {
  const { value, onChange, mode = "Department", multiple = false } = props;

  const [{ userModal, departmentModal, roleModal }, setState] =
    useSetState<ModalProps>({
      userModal: false,
      departmentModal: false,
      roleModal: false,
    });

  return (
    <Row>
      <Col
        style={{
          cursor: "pointer",
          color: "#1677ff",
        }}
        span={24}
      >
        <FontAwesomeIcon
          icon={"add"}
          style={{
            fontSize: 20,
            border: "1px solid #d0d3d6",
            padding: "5px 10px",
            width: 50,
            borderRadius: 25,
          }}
          onClick={() => {
            const ModalType = modalMap[mode];
            setState({
              [ModalType]: true,
            } as unknown as ModalProps);
          }}
        />
      </Col>
      <Col span={24}>
        <Space style={{ display: "flex", flexWrap: "wrap" }}>
          {(value || []).map(item => (
            <Tags
              url={item?.url}
              label={item?.name}
              key={item?.id}
              onClose={() => {
                onChange(value.filter(nodeItem => nodeItem?.id !== item.id));
              }}
            />
          ))}
        </Space>
      </Col>
      {userModal && (
        <UserModal
          nodeProps={undefined}
          multiple={multiple}
          visible={userModal}
          onOk={(val: DepartMentAndUserTreeItem[]) => {
            onChange(val);
            setState({
              userModal: false,
            });
          }}
          onCancel={() => {
            setState({
              userModal: false,
            });
          }}
        />
      )}
      {departmentModal && (
        <DepartmentModal
          multiple={multiple}
          nodeProps={undefined}
          visible={departmentModal}
          onOk={(val: DepartMentAndUserTreeItem[]) => {
            onChange(val);
            setState({
              departmentModal: false,
            });
          }}
          onCancel={() => {
            setState({
              departmentModal: false,
            });
          }}
        />
      )}
      {roleModal && (
        <RoleModal
          multiple={multiple}
          nodeProps={undefined}
          visible={roleModal}
          onOk={(val: DepartMentAndUserTreeItem[]) => {
            onChange(val);
            setState({
              roleModal: false,
            });
          }}
          onCancel={() => {
            setState({
              roleModal: false,
            });
          }}
        />
      )}
    </Row>
  );
};

export default AddMembersOrDepartment;
