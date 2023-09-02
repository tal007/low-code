/*
 * @Date: 2022-09-26 15:51:37
 * @LastEditTime: 2023-05-04 11:07:30
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 通用公共组件
 */

import { Form, Button, Popover, Space, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import { useEditor } from "@craftjs/core";

export type CommonButtonTypes = {
  renderName: string;
  name: string;
  icon: string;
  description: string;
  docLink: string;
  tags: string[];
  preview: ReactNode;
  render: React.ReactElement;
};

export const CommonButton = (props: CommonButtonTypes) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  let { name, description } = props;
  const { icon, preview, docLink, tags, render } = props;

  name = t(name);
  description = t(description);

  const dealName = (n: number) => {
    const len = name.length;
    return len > n ? `${name.slice(0, n)}...` : name;
  };

  const generatePreview = (): ReactNode => {
    const handleClick = (e: React.MouseEvent) => e.stopPropagation();
    return (
      <Space
        onClick={handleClick}
        direction={"vertical"}
        size={20}
        style={{ width: 300 }}
      >
        <Typography.Text>
          {description}
          {docLink && (
            <Button type={"link"}>
              {t("leftPanel.doc", { ns: "editor" })}
            </Button>
          )}
        </Typography.Text>

        {tags.includes("form") ? (
          <Form labelCol={{ span: 8 }}>
            <Form.Item label={name}>{preview}</Form.Item>
          </Form>
        ) : (
          preview
        )}
      </Space>
    );
  };

  const { connectors, actions, query } = useEditor();
  return (
    <Button
      ref={(ref: HTMLElement) => connectors.create(ref, render)}
      style={{
        position: "relative",
        width: 113,
        margin: 2,
        textAlign: "left",
      }}
      icon={
        <FontAwesomeIcon
          icon={icon as IconProp}
          style={{ width: 14, height: 14, marginRight: 4 }}
        />
      }
      onClick={() => {
        const nodeTree = query.parseReactElement(render).toNodeTree();
        const index = query.node("ROOT").toSerializedNode().nodes.length;
        actions.addNodeTree(nodeTree, "ROOT", index);
        actions.selectNode(nodeTree.rootNodeId);
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && preview ? dealName(3) : dealName(5)}
      {isHover && preview && (
        <Popover
          placement="right"
          title={name}
          content={generatePreview()}
          trigger={"hover"}
        >
          <QuestionCircleOutlined
            style={{
              position: "absolute",
              right: 10,
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
            }}
          />
        </Popover>
      )}
    </Button>
  );
};
