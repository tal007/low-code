/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-09-26 13:48:41
 * @LastEditTime: 2023-05-08 09:25:12
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 组件
 */

import { Collapse, Input } from "antd";
import { useTranslation } from "react-i18next";
import { CommonButton, CommonButtonTypes } from "@/EditorWidgets/Common";
import { WidgetsT, widgets } from "../resolver";
import { ReactNode, useState } from "react";
import { getArrDifference } from "@/utils/helper";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";
import { headerHeight } from "../constant";
import { FlexBox, MPContainer } from "@/style";
import { getVersion } from "./../../utils/helper";

const { Panel } = Collapse;

type Group = Partial<WidgetsT<string[]>>;

type WidgetsProps = {
  except?: Group;
  contain?: Group | "all";
  custom?: ReactNode[];
};

export const Widgets = (props: WidgetsProps) => {
  const { t } = useTranslation();
  const { except, contain } = props;
  const [renderWidgets, setRenderWidgets] = useState(widgets);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSearchWidget = (searchText: string) => {
    const newWidgets: { [key: string]: { [key: string]: CommonButtonTypes } } =
      {};

    Object.entries(widgets).forEach(([key, value]) => {
      newWidgets[key] = {};
      const child: { [key: string]: CommonButtonTypes } = {};
      const res = Object.entries(value).filter(
        ([, childValue]: [string, CommonButtonTypes]) => {
          const name = t(childValue.name);
          return name.match(searchText);
        }
      );
      res.forEach(([widgetName, widget]: [string, CommonButtonTypes]) => {
        child[widgetName] = widget;
      });

      newWidgets[key] = child;
    });

    setRenderWidgets(newWidgets as any);
  };

  const renderWidget = (groupType: keyof Group) => {
    // 加载全部组建
    if (contain === "all") {
      return Object.keys(renderWidgets[groupType]).map(
        (key: string): ReactNode => (
          <CommonButton key={key} {...renderWidgets[groupType][key]} />
        )
      );
    }
    // 加载配置的组件
    if (contain) {
      return contain[groupType]?.map(
        (key: string): ReactNode => (
          <CommonButton key={key} {...renderWidgets[groupType][key]} />
        )
      );
    }
    // 加载除了所选组件以外的文件
    if (except) {
      const different = getArrDifference<string>(
        Object.keys(renderWidgets[groupType]),
        except[groupType]
      );
      return different.map(
        (key: string): ReactNode => (
          <CommonButton key={key} {...renderWidgets[groupType][key]} />
        )
      );
    }
  };

  return (
    <WidgetsContainer>
      {/* <FlexBox
        direction={"column"}
        alignItems={"flex-start"}
        padding={"0 10px 10px 10px"}
        height={"50px"}
      >
        <MPContainer margin={"0 0 0 0"} padding={0} style={{ width: "100%" }}>
          <Input.Search
            style={{ width: "100%" }}
            placeholder={t("leftPanel.searchWidget", {ns: "editor"})}
            onSearch={onSearchWidget}
            onChange={e => onSearchWidget(e.target.value)}
            enterButton
          />
        </MPContainer>
      </FlexBox> */}
      <ScrollContainerParent>
        <ScrollContainer style={{ padding: 0 }}>
          <Collapse
            defaultActiveKey={Object.keys(widgets)}
            expandIconPosition={"end"}
            style={{ width: "100%" }}
            ghost
            size={"small"}
          >
            {Object.keys(renderWidgets).map((key: keyof Group) => {
              if (Object.keys(renderWidgets[key]).length === 0) return null;
              return (
                <Panel
                  header={t(`leftPanel.group.${key}`, { ns: "editor" })}
                  key={key}
                >
                  {renderWidget(key)}
                </Panel>
              );
            })}
          </Collapse>
        </ScrollContainer>
      </ScrollContainerParent>
      {/* <FlexBox height="30px">版本号：{getVersion()}</FlexBox> */}
    </WidgetsContainer>
  );
};

const WidgetsContainer = styled.div`
  width: 280px;
  height: ${() => `calc(100% - ${headerHeight} - 50px)`};
`;

const ScrollContainerParent = styled.div`
  height: calc(100% - 35px);

  .ant-collapse-header {
    padding: 4px 16px !important;
  }

  .ant-collapse-content-box {
    padding: 4px 16px 12px !important;
  }
`;
