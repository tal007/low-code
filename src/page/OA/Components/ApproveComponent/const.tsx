/**
 * @author 梁强
 * @filename const.ts
 * @date 2023-05-16 星期二
 * @description
 */
import { OptionType } from "./RadioFormItemComponent";

export const approvalOperateMap = {
  设置审批人: "1",
  表单操作权限: "2",
  高级设置: "3",
};

export const stateSelectMethodMap = {
  单选: 1,
  多选: 2,
};

export const approvalTypeMap = {
  人工审批: 1,
  自动通过: 2,
  自动拒绝: 3,
};

export const approverSettingsMap = {
  直属主管: "RE_USER_START",
  部门主管: "RE_GROUP_START",
  其他部门: "RE_GROUP_ANY",
  指定成员: "ASSIGN_USER",
  角色: "RE_GROUP_ANY",
  发起人自选: "CHOOSE",
};

// "Department" | "User" | "Role"
export const popupKeyMap = {
  ASSIGN_USER: "User",
  DEPT: "Department",
  ROLE: "Role",
};

export const role = [
  {
    label: "教职工",
    value: 1,
  },
  {
    label: "学生",
    value: 2,
  },
  {
    label: "访客",
    value: 3,
  },
  {
    label: "兼职老师",
    value: 4,
  },
];

export const directDepartment = new Array(20).fill({}).map((item, idx) => {
  if (idx === 0) {
    return {
      label: "直属主管",
      value: 0,
    };
  }

  return {
    label: `第${idx + 1}级主管`,
    value: idx + 1,
  };
});

export const director = new Array(20).fill({}).map((item, idx) => {
  if (idx === 0) {
    return {
      label: "直属部门负责人",
      value: 0,
    };
  }

  return {
    label: `第${idx + 1}级直属部门负责人`,
    value: idx + 1,
  };
});

export const otherApprover: OptionType[] = [
  {
    label: "approver.approvalByDepartmentHead",
    value: 1,
  },
  {
    label: "approver.departmentDesignatedPersonnelApproval",
    value: 2,
    mode: "User",
  },
];

export const multipleApprover: OptionType[] = [
  {
    label: "approver.sequentialApproval",
    value: 1,
  },
  {
    label: "approver.counterSign",
    value: 2,
  },
  {
    label: "approver.orSign",
    value: 3,
  },
];

export const noApprover: OptionType[] = [
  {
    label: "approver.automaticAdoption",
    value: "auto",
  },
  {
    label: "approver.automaticTransferToAdministrator",
    value: "admin",
  },
  {
    label: "approver.designatedPersonnelApproval",
    value: "user",
    mode: "User",
  },
];

export const approvalType = [
  {
    label: ["approver.manualApproval", { ns: "flowPath" }],
    value: 1,
  },
  {
    label: ["approver.automaticAdoption", { ns: "flowPath" }],
    value: 2,
  },
  {
    label: ["approver.automaticRejection", { ns: "flowPath" }],
    value: 3,
  },
];

export const approvalOperate = [
  {
    label: ["approver.setApprover", { ns: "flowPath" }],
    value: 1,
  },
  {
    label: ["approver.operationPermissions", { ns: "flowPath" }],
    value: 2,
  },
  {
    label: ["approver.advancedSetting", { ns: "flowPath" }],
    value: 3,
  },
];
export const approverSettings = [
  {
    label: ["approver.directDepartment", { ns: "flowPath" }],
    value: 1,
  },
  {
    label: ["approver.director", { ns: "flowPath" }],
    value: 2,
  },
  {
    label: ["approver.otherDepartments", { ns: "flowPath" }],
    value: 3,
  },
  {
    label: ["approver.designatedMembers", { ns: "flowPath" }],
    value: 4,
  },
  {
    label: ["approver.role", { ns: "flowPath" }],
    value: 5,
  },
  {
    label: ["approver.originatorChoice", { ns: "flowPath" }],
    value: 6,
  },
];

export const selectMethod = [
  {
    label: "approver.radio",
    value: 1,
  },
  {
    label: "approver.checkbox",
    value: 2,
  },
];

export const selectRange: OptionType[] = [
  {
    label: "approver.wholeCompany",
    value: 1,
  },
  {
    label: "approver.designatedMembers",
    value: 2,
    mode: "User",
  },
  {
    label: "approver.specifyRole",
    value: 3,
    mode: "Role",
  },
];

/**
 * @author 梁强
 * @date 2023-05-17 星期三
 * @function 高级设置
 * @param {}
 * @return {}
 */
export const automaticApproval = [
  {
    label: ["approver.initiator", { ns: "flowPath" }],
    value: 1,
  },
  {
    label: ["approver.adjacent", { ns: "flowPath" }],
    value: 2,
  },
];
