/*
 * @Date: 2022-09-30 11:41:55
 * @LastEditTime: 2023-01-09 10:32:20
 * @LastEditors: 刘玉田
 * @Description: 根节点
 */
import { useNode } from "@craftjs/core";
import { Layout } from "antd";
import { RootSettings } from "./RootSettings";
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
  const { children } = props;

  const {
    connectors: { connect, drag },
  } = useNode();

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
