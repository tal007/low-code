/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-09-30 11:41:55
 * @LastEditTime: 2023-01-09 10:32:20
 * @LastEditors: 刘玉田
 * @Description: 根节点
 */
/*
 * @Date: 2022-09-27 15:06:04
 * @LastEditTime: 2022-10-10 09:07:46
 * @LastEditors: 刘玉田
 * @Description: 容器
 */

import { useNode } from "@craftjs/core";
import { Layout } from "antd";
import { RootSettings } from "./RootSettings";
import { useEditorAction } from "../../hooks";
import { EventItemProps } from "@/SettingPanelSchema/EventHandler/EventItem";
import {
  StyleContainer,
  StyleContainerProps,
  styleDefault,
} from "../../Common/StyleContainer";
import { ChildrenRender } from "../../Common/ChildrenRender";
import { Children } from "../../types";
const { Content } = Layout;

export interface RootProps
  extends Omit<StyleContainerProps, "children">,
    Children {
  onEvent: {
    [key: string]: EventItemProps[];
  };
}

const defaultProps = {
  ...styleDefault,
  onEvent: {},
};

export const Root = (props: Partial<RootProps>) => {
  const {
    children,
    onEvent,
    border,
    borderRadius,
    marginAndPadding,
    background,
    ...rest
  } = props;

  const {
    connectors: { connect, drag },
  } = useNode();

  const { enabled } = useEditorAction();
  const loadHandlers = onEvent["load"];

  return (
    <StyleContainer {...props}>
      <Content ref={ref => connect(drag(ref))}>
        <ChildrenRender>{children}</ChildrenRender>
      </Content>
    </StyleContainer>
  );
};

Root.craft = {
  displayName: "ROOT",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: RootSettings,
  },
};
