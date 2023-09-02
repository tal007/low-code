/*
 * @Date: 2022-09-21 17:51:17
 * @LastEditTime: 2023-05-25 16:55:19
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 左侧面板
 */

import "./index.less";
import { Tabs } from "antd";
import {
  AppstoreOutlined,
  CodeOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { Widgets } from "./Widgets";
import { Compendium } from "./Compendium";
import { useEditorAction } from "../Widgets/hooks";

const onChange = () => {
  // console.log(key);
};

export const LeftPanel: React.FC = () => {
  const { t } = useTranslation();

  const { enabled } = useEditorAction();

  const items = [
    {
      label: (
        <>
          <AppstoreOutlined />
          {t("leftPanel.widget", { ns: "editor" })}
        </>
      ),
      key: "widget",
      children: <Widgets contain={"all"} />,
      // children: <Widgets except={{ form: ["InputText"], container: ["InputText"] }} />,
    },
    {
      label: (
        <>
          <ApartmentOutlined />
          {t("leftPanel.compendium", { ns: "editor" })}
        </>
      ),
      key: "compendium",
      children: <Compendium />,
    },
    {
      label: (
        <>
          <CodeOutlined />
          {t("leftPanel.code", { ns: "editor" })}
        </>
      ),
      key: "code",
      children: <div>code</div>,
    },
  ];

  return (
    <Tabs
      className={cx([
        {
          visible: enabled,
          hidden: !enabled,
          "left-panel": true,
        },
      ])}
      size={"small"}
      onChange={onChange}
      type={"card"}
      // animated
      // tabPosition={"left"}
      items={items}
      // 不能添加销毁，否则大纲 Layer 多次初始化会有问题
      // destroyInactiveTabPane
    />
  );
};

export default LeftPanel;
