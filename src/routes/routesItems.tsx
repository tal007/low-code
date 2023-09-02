import type { MenuProps } from "antd";
import { PieChartOutlined, ClusterOutlined } from "@ant-design/icons";

export const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "/",
    icon: <PieChartOutlined />,
  },
  {
    label: "表单管理",
    key: "/list",
    icon: <PieChartOutlined />,
  },
  // {
  //   label: "实例管理",
  //   key: "/example",
  //   icon: <PieChartOutlined />,
  // },
  // {
  //   label: "自定义列表",
  //   key: "/custom",
  //   icon: <PieChartOutlined />,
  // },
  // {
  //   label: "系统管理",
  //   key: "/sys",
  //   icon: <PieChartOutlined />,
  //   children: [
  //     {
  //       label: "机构",
  //       key: "/dept-type",
  //       type: "group",
  //       children: [
  //         {
  //           label: "机构类型",
  //           key: "/dept-type",
  //           icon: <PieChartOutlined />,
  //         },
  //         {
  //           label: "机构列表",
  //           key: "/dept-list",
  //           icon: <PieChartOutlined />,
  //         },
  //         {
  //           label: "加入机构审批",
  //           key: "/dept-join-approval",
  //           icon: <PieChartOutlined />,
  //         },
  //       ],
  //     },
  //     {
  //       label: "组织",
  //       key: "/org-dimension",
  //       type: "group",
  //       children: [
  //         {
  //           label: "组织维度",
  //           key: "/org-dimension",
  //           icon: <PieChartOutlined />,
  //         },
  //         {
  //           label: "组织部门",
  //           key: "/org-department",
  //           icon: <PieChartOutlined />,
  //         },
  //       ],
  //     },
  //     {
  //       label: "用户",
  //       key: "/org-user-type",
  //       type: "group",
  //       children: [
  //         {
  //           label: "用户类型",
  //           key: "/org-user-type",
  //           icon: <PieChartOutlined />,
  //         },
  //         {
  //           label: "用户列表",
  //           key: "/org-user-list",
  //           icon: <PieChartOutlined />,
  //         },
  //       ],
  //     },
  //     {
  //       label: "权限",
  //       key: "/limit",
  //       type: "group",
  //       children: [
  //         {
  //           label: "权限分级",
  //           key: "/limit",
  //           icon: <PieChartOutlined />,
  //         },
  //       ],
  //     },
  //     {
  //       label: "扩展",
  //       key: "/relationship",
  //       type: "group",
  //       children: [
  //         {
  //           label: "关系定义",
  //           key: "/relationship",
  //           icon: <PieChartOutlined />,
  //         },
  //         {
  //           label: "扩展属能",
  //           key: "/extend",
  //           icon: <PieChartOutlined />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: "高级设置",
  //   key: "/advanced-set",
  //   icon: <ClusterOutlined />,
  //   children: [
  //     {
  //       label: "第三方API",
  //       key: "/third-API",
  //       icon: <PieChartOutlined />,
  //     },
  //     {
  //       label: "自定义SQL",
  //       key: "/custom-SQL",
  //       icon: <PieChartOutlined />,
  //     },
  //     {
  //       label: "脚本管理",
  //       key: "/scriptManager",
  //       icon: <PieChartOutlined />,
  //     },
  //     {
  //       label: "脚本调用",
  //       key: "/scriptUse",
  //       icon: <PieChartOutlined />,
  //     },
  //     {
  //       label: "系统流水号",
  //       key: "/acount",
  //       icon: <PieChartOutlined />,
  //     },
  //     {
  //       label: "自定义对话框",
  //       key: "/customDialog",
  //       icon: <PieChartOutlined />,
  //     },
  //   ],
  // },
];
