/*
 * @Date: 2022-09-26 13:48:41
 * @LastEditTime: 2023-05-22 10:36:00
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 组件
 */

import { Typography, Input, Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { FlexBox, MPContainer } from "@/style";
import { CommonButton, CommonButtonTypes } from "./../Widgets/Common";
import { WidgetsT, widgets } from "../Widgets";
import { ReactNode, useState } from "react";
import { getArrDifference } from "@/utils/helper";
import { ScrollContainer } from "@/component/ScrollContainer";
import styled from "styled-components";

const { Text } = Typography;
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
    <>
      <FlexBox
        direction={"column"}
        alignItems={"flex-start"}
        padding={"0 10px 10px 10px"}
        height={"74px"}
      >
        <Text>{t("leftPanel.widget", { ns: "editor" })}</Text>
        <MPContainer margin={"10px 0 0 0"} padding={0}>
          <Input.Search
            style={{ width: "100%" }}
            placeholder={t("leftPanel.searchWidget", { ns: "editor" })}
            onSearch={onSearchWidget}
            enterButton
          />
        </MPContainer>
      </FlexBox>
      <ScrollContainerParent>
        <ScrollContainer style={{ padding: 0 }}>
          <Collapse
            defaultActiveKey={Object.keys(widgets)}
            expandIconPosition={"end"}
            style={{ width: "100%" }}
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
    </>
  );
};

const ScrollContainerParent = styled.div`
  height: calc(100% - 74px);
`;
