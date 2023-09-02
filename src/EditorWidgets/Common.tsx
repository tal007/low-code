/*
 * @Date: 2022-09-26 15:51:37
 * @LastEditTime: 2023-05-19 09:11:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 通用公共组件
 */

import { Form, Button, Space, Typography } from "antd";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import { useEditor } from "@craftjs/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";
import { throttle } from "lodash";
import { nanoid } from "@/utils/helper";

export type CommonButtonTypes = {
  renderName: string;
  name: string;
  icon: string;
  description: string;
  docLink: string;
  tags: string[];
  render: React.ReactElement;
  preview?: ReactNode;
};

export const CommonButton = (props: CommonButtonTypes) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  let { name, description } = props;
  const { icon, preview, docLink, tags, render } = props;

  name = t(name, { ns: "editorWidget" });
  description = t(description, { ns: "editorWidget" });

  const dealName = (n: number) => {
    const len = name.length;
    return len > n ? `${name.slice(0, n)}...` : name;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const dispatch = useDispatch();
  return (
    <NewButton
      ref={(ref: HTMLElement) => {
        connectors.create(ref, render, {
          onCreate(nodeTree) {
            actions.selectNode(nodeTree.rootNodeId);
            actions.setProp(
              nodeTree.rootNodeId,
              props => (props.id = nanoid())
            );
          },
        });
      }}
      icon={
        <FontAwesomeIcon
          icon={icon as IconProp}
          style={{ width: 12, height: 12, marginRight: 8 }}
        />
      }
      onClick={throttle(() => {
        const nodeTree = query.parseReactElement(render).toNodeTree();
        const index = query.node("ROOT").toSerializedNode().nodes.length;
        actions.addNodeTree(nodeTree, "ROOT", index);
        actions.selectNode(nodeTree.rootNodeId);
        actions.setProp(nodeTree.rootNodeId, props => (props.id = nanoid()));
        dispatch(currentEditorConfigActions.setNodeRandom());
      }, 500)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && preview ? dealName(5) : dealName(10)}
      {/* {isHover && preview && (
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
      )} */}
    </NewButton>
  );
};

const NewButton = styled(Button)`
  position: relative;
  width: 48%;
  margin-right: 4%;
  margin-bottom: 10px;
  text-align: left;
  box-sizing: border-box;
  height: 38px;
  font-size: 12px;

  &:nth-child(2n) {
    margin-right: 0;
  }
`;
