/*
 * @Date: 2022-11-18 11:43:16
 * @LastEditTime: 2022-11-24 16:12:05
 * @LastEditors: 刘玉田
 * @Description: 操作项 按钮
 */

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";

export const TreeTableHandler = () => {
  const { t } = useTranslation();

  const handleMenuClick: MenuProps["onClick"] = e => {
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: t("orgStructure.open"),
      key: "1",
    },
    {
      label: t("orgStructure.close"),
      key: "2",
    },
    {
      label: t("orgStructure.manageUsers"),
      key: "3",
    },
    {
      label: t("orgStructure.manageUserGroupRelationships"),
      key: "4",
    },
  ];

  return (
    <Space style={{ padding: "0 24px" }}>
      <Button type={"primary"}>{t("common.save")}</Button>
      <Button type={"primary"}>{t("common.create")}</Button>
      <Button type={"primary"}>{t("orgStructure.createChildGroup")}</Button>
      <Button type={"primary"} danger>
        {t("common.delete")}
      </Button>
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <Button>
          <Space>
            {t("common.more")}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};
