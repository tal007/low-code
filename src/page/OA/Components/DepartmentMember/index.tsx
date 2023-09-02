/*
 * @Date: 2023-05-17 14:10:46
 * @LastEditTime: 2023-05-22 14:05:08
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 选择部门与人员
 */
import { useState, useRef, useEffect } from "react";
import { Modal, Button, RadioChangeEvent, Tag } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseCircleOutlined } from "@ant-design/icons";
import { FlexBox } from "@/style";
import { DepartmentMemberProps } from "./index.d";
import { memberTypeOptions, postTreeData, roleTreeData } from "./constant";
import CheckboxComponent from "./CheckboxComponent";
import OrgStructureTree, {
  DepartMentAndUserTreeItem,
  OrgStructureTreeRef,
} from "@/SettingPanelSchema/TabsRadioBox/OrgStructureTree";
import { Enum } from "@/SettingPanelSchema/Select";
import RadioGroup from "@/component/RadioGroup";

const OrganizeStructContainer = styled.div`
  padding: 10px;
  width: 50%;
  height: 100%;
  border-right: 1px solid #ccc;
  .mrg-b {
    margin-bottom: 20px;
  }
`;

const SelectMemberContainer = styled.div`
  padding: 10px;
  width: 50%;
  height: 100%;
  .name {
    margin-left: 5px;
  }
`;

const DepartmentMember = (props: DepartmentMemberProps) => {
  const { show, onCancel, onConfirm } = props;
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState<string>("gatt");
  const [roleOptions, setRoleOptions] = useState<Partial<Enum>[]>(roleTreeData);
  const [postOptions, setPostOptions] = useState<Partial<Enum>[]>(postTreeData);
  const [departmentOptions, setDepartmentOptions] = useState<
    DepartMentAndUserTreeItem[]
  >([]);
  const [allSelectOptions, setAllSelectOptions] = useState<
    (Partial<Enum> | DepartMentAndUserTreeItem)[]
  >([]);
  const [roleCount, setRoleCount] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [departmentCount, setDepartmentCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [selectCountTip, setSelectCountTip] = useState<string>();
  const structureTreeRef: OrgStructureTreeRef = useRef();

  // 合并选中的部门架构、角色、岗位用于右侧显示
  useEffect(() => {
    setAllSelectOptions([
      ...roleOptions.filter(item => item.checked),
      ...postOptions.filter(item => item.checked),
      ...departmentOptions,
    ]);
  }, [roleOptions, postOptions, departmentOptions]);
  // 根据选中的部门架构、角色、岗位输出对应数量提示
  useEffect(() => {
    const roleTips =
      roleCount > 0 ? roleCount + t("settings.start.role", { ns: "flow" }) : "";
    const postTips =
      postCount > 0 ? postCount + t("settings.start.post", { ns: "flow" }) : "";
    const departmentTips =
      departmentCount > 0
        ? departmentCount + t("settings.start.department", { ns: "flow" })
        : "";
    const memberTips =
      memberCount > 0
        ? memberCount + t("settings.start.member", { ns: "flow" })
        : "";
    setSelectCountTip(
      [roleTips, postTips, departmentTips, memberTips]
        .filter(item => item)
        .join(",")
    );
  }, [roleCount, postCount, departmentCount, memberCount, t]);

  // 单选框切换
  const onChange = (e: RadioChangeEvent) => {
    const selectValue = e.target.value;
    setSelectValue(selectValue);
  };
  // 选中部门架构成员
  const onSelectStructure = (
    nodes: DepartMentAndUserTreeItem[],
    removeNodes?: DepartMentAndUserTreeItem[]
  ) => {
    const departmentType = "Department";
    let _departmentCount = departmentCount;
    let _memberCount = memberCount;
    if (removeNodes && removeNodes.length) {
      const removeNodeIDs = [];
      removeNodes.forEach(item => {
        removeNodeIDs.push(item.id);
        item.type === departmentType ? _departmentCount-- : _memberCount--;
      });
      setDepartmentOptions(
        departmentOptions.filter(item => !removeNodeIDs.includes(item.id))
      );
    } else {
      const options = [];
      nodes.forEach(item => {
        const has = departmentOptions.some(_item => _item.id === item.id);
        if (!has) {
          const { type } = item;
          options.push(item);
          type === departmentType ? _departmentCount++ : _memberCount++;
        }
      });
      setDepartmentOptions([...departmentOptions, ...options]);
    }
    setDepartmentCount(_departmentCount);
    setMemberCount(_memberCount);
  };
  const changeOptions = (
    options: Partial<Enum>[],
    list: (string | number)[]
  ): Partial<Enum>[] => {
    return options.map(item => {
      item.checked = list.includes(item.id) ? true : false;
      return item;
    });
  };
  // 删除某一个选中的角色或岗位时将对应的checked置为false
  const deleteChangeOptions = (
    options: Partial<Enum>[],
    key: string | number
  ): Partial<Enum>[] => {
    return options.map(item => {
      item.checked = item.id === key ? false : item.checked;
      return item;
    });
  };
  // 删除所有角色或岗位时将对应的checked置为false
  const deleteAllChangeOptions = (
    options: Partial<Enum>[]
  ): Partial<Enum>[] => {
    return options.map(item => {
      item.checked = false;
      return item;
    });
  };
  // 选中角色或岗位
  const onCheck = (list: (string | number)[], type: string) => {
    const count = list.length;
    if (type === "role") {
      setRoleCount(count);
      setRoleOptions(changeOptions(roleOptions, list));
    } else {
      setPostCount(count);
      setPostOptions(changeOptions(postOptions, list));
    }
  };
  // 清空所有选中数据
  const onClearSelectData = () => {
    setRoleCount(0);
    setPostCount(0);
    setDepartmentCount(0);
    setMemberCount(0);
    setRoleOptions(deleteAllChangeOptions(roleOptions));
    setPostOptions(deleteAllChangeOptions(postOptions));
    structureTreeRef.current?.removeNodes(departmentOptions);
    setDepartmentOptions([]);
  };

  // 删除某一行选中数据
  const onDelete = (node: any) => {
    const { id, type } = node;
    switch (type) {
      case "role":
        {
          let _roleCount = roleCount;
          setRoleCount(--_roleCount);
          setRoleOptions(deleteChangeOptions(roleOptions, id));
        }
        break;
      case "post":
        {
          let _postCount = postCount;
          setPostCount(--_postCount);
          setPostOptions(deleteChangeOptions(postOptions, id));
        }
        break;
      default:
        {
          const _departmentOptions = departmentOptions.filter(
            item => item.id !== id
          );

          if (node.type === "Department") {
            let _departmentCount = departmentCount;
            setDepartmentCount(--_departmentCount);
          } else {
            let _memberCount = memberCount;
            setMemberCount(--_memberCount);
          }
          structureTreeRef.current?.removeNodes([node]);
          setDepartmentOptions(_departmentOptions);
        }
        break;
    }
  };

  return (
    <Modal
      width="900px"
      open={show}
      title={t("common.departmentMemberTitle", { ns: "flowPath" })}
      closable={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("common.cancel")}
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={() => {
            onConfirm(allSelectOptions);
          }}
        >
          {t("common.ok")}
        </Button>,
      ]}
    >
      <FlexBox
        border="1px solid #ccc"
        height="500px"
        justify="space-between"
        alignItems="flex-start"
      >
        <OrganizeStructContainer>
          <RadioGroup
            className="mrg-b"
            ns="flowPath"
            options={memberTypeOptions}
            value={selectValue}
            onChange={onChange}
          />
          {selectValue === "gatt" ? (
            <OrgStructureTree
              ref={structureTreeRef}
              mode="Department"
              onChange={onSelectStructure}
              hasMultiple={true}
              style={{ width: "100%", borderRightWidth: "0" }}
            />
          ) : (
            <CheckboxComponent
              options={selectValue === "role" ? roleOptions : postOptions}
              title={t("start." + selectValue, { ns: "flowPath" })}
              onCheck={onCheck}
              type={selectValue}
              search={true}
            />
          )}
        </OrganizeStructContainer>
        <SelectMemberContainer>
          <FlexBox
            height="40px"
            justify="space-between"
            alignItems="flex-start"
          >
            <label>已选：{selectCountTip}</label>
            <span onClick={onClearSelectData}>清空</span>
          </FlexBox>
          {allSelectOptions.map((item: Enum) => {
            return (
              <FlexBox
                height="40px"
                justify="space-between"
                alignItems="flex-start"
                key={item.id + "-select-list"}
              >
                <div>
                  <FontAwesomeIcon
                    icon={item.type === "User" ? "user" : "folder-closed"}
                    style={{ color: "#5488fa" }}
                  />
                  <label className="name">{item.name}</label>
                  {item.isCommander && <Tag color="magenta">负责人</Tag>}
                </div>
                <CloseCircleOutlined onClick={() => onDelete(item)} />
              </FlexBox>
            );
          })}
        </SelectMemberContainer>
      </FlexBox>
    </Modal>
  );
};
export default DepartmentMember;
