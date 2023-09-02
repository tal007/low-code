/*
 * @Date: 2022-11-04 17:29:06
 * @LastEditTime: 2023-09-02 15:02:58
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 路由组件映射
 */

import type { SubMenuType } from "antd/es/menu/hooks/useItems";
import Home from "@/page/Home";
import { OrgDepartment } from "@/page/OrganizationalStructure/OrganizationManagementForZz/Department";
import { OrgDimension } from "@/page/OrganizationalStructure/OrganizationManagementForZz/Dimension";
import { OrgJoinApproval } from "@/page/OrganizationalStructure/OrganizationManagementForJg/JoinApproval";
import { OrgList } from "@/page/OrganizationalStructure/OrganizationManagementForJg/List";
import { OrgType } from "@/page/OrganizationalStructure/OrganizationManagementForJg/Type";
import { OrgUserType } from "@/page/OrganizationalStructure/UserManagement/Type";
import { OrgUserList } from "@/page/OrganizationalStructure/UserManagement/List";
import { OrgFormList } from "@/page/OrganizationalStructure/FormManagement/List";
import OA from "@/page/OA";
import { PieChartOutlined } from "@ant-design/icons";

interface RouteItem extends Omit<SubMenuType, "children"> {
  render?: (props?: any) => JSX.Element;
  children?: RouteItem[];
}

export const routes: RouteItem[] = [
  {
    label: "首页",
    key: "/",
    render: Home,
    icon: <PieChartOutlined />,
  },
  {
    label: "编辑器",
    key: "/oa",
    render: OA,
    icon: <PieChartOutlined />,
  },
  {
    label: "表单管理",
    key: "/list",
    icon: <PieChartOutlined />,
    render: OrgFormList,
  },
  {
    label: "实例管理",
    key: "/example",
    icon: <PieChartOutlined />,
    render: Home,
  },
  {
    label: "自定义列表",
    key: "/custom",
    icon: <PieChartOutlined />,
    render: Home,
  },
  {
    label: "系统管理",
    key: "/sys",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "机构类型",
        key: "/dept-type",
        icon: <PieChartOutlined />,
        render: OrgType,
      },
      {
        label: "机构列表",
        key: "/dept-list",
        icon: <PieChartOutlined />,
        render: OrgList,
      },
      {
        label: "加入机构审批",
        key: "/dept-join-approval",
        icon: <PieChartOutlined />,
        render: OrgJoinApproval,
      },
      {
        label: "组织维度",
        key: "/org-dimension",
        icon: <PieChartOutlined />,
        render: OrgDimension,
      },
      {
        label: "组织部门",
        key: "/org-department",
        icon: <PieChartOutlined />,
        render: OrgDepartment,
      },
      {
        label: "用户类型",
        key: "/org-user-type",
        icon: <PieChartOutlined />,
        render: OrgUserType,
      },
      {
        label: "用户列表",
        key: "/org-user-list",
        icon: <PieChartOutlined />,
        render: OrgUserList,
      },
      {
        label: "权限分级",
        key: "/limit",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "关系定义",
        key: "/relationship",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "扩展属能",
        key: "/extend",
        icon: <PieChartOutlined />,
        render: Home,
      },
    ],
  },
  {
    label: "高级设置",
    key: "/advanced-set",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "第三方API",
        key: "/third-API",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "自定义SQL",
        key: "/custom-SQL",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "脚本管理",
        key: "/scriptManager",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "脚本调用",
        key: "/scriptUse",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "系统流水号",
        key: "/acount",
        icon: <PieChartOutlined />,
        render: Home,
      },
      {
        label: "自定义对话框",
        key: "/customDialog",
        icon: <PieChartOutlined />,
        render: Home,
      },
    ],
  },
];

export const tabMaps = (routes: RouteItem[], parentKey: string) => {
  const result: RouteItem[] = [];
  routes.forEach(r => {
    if (r.children) {
      result.push(...tabMaps(r.children, r.key));
    } else {
      result.push({
        ...r,
        key: `${parentKey}${r.key}`,
      });
    }
  });
  return result;
};

const tabs = tabMaps(routes, "");
export const tabRender = (key: string) => tabs.find(item => item.key === key);
