/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-11 09:58:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-13 16:02:41
 * @Description: 左侧边栏
 */
import React, { useState } from "react";
import { Segmented } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Widgets } from "./Widgets";
import { FlexBox } from "@/style";
import { useEditorAction } from "@/EditorWidgets/hooks";

const LeftBox = styled(FlexBox)`
  background-color: #f5f6f6;
  width: auto;
  flex: 0 0 280px;

  .ant-segmented {
    margin: 4px 0;
    background: #e5e6e8;
  }
`;
const SegmentedItem = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  cursor: default;
  padding: 0 14px;
  font-size: 14px;
  line-height: 20px;
  color: #171a1d;
  white-space: nowrap;
  z-index: 10;
  cursor: pointer;
`;

const TranslateBox = styled.div<{ index: number | string }>`
  width: ${() => `${280 * 3}px`};
  height: 100%;
  display: flex;
  transform: ${({ index }) => `translateX(${(1 - Number(index)) * 280}px)`};
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  > div {
    width: 280px;
  }
`;
export const LeftPanel: React.FC = () => {
  const [value, setValue] = useState<string | number>(0);
  const { t } = useTranslation();
  const { enabled } = useEditorAction();

  return (
    <LeftBox
      direction={"column"}
      alignItems={"center"}
      justify={"flex-start"}
      style={{ width: enabled ? 280 : 0, overflow: "hidden" }}
    >
      <Segmented
        options={[
          {
            label: (
              <SegmentedItem>
                {t("leftPanel.widget", { ns: "editor" })}
              </SegmentedItem>
            ),
            value: 0,
          },
          {
            label: (
              <SegmentedItem>
                {t("leftPanel.kit", { ns: "editor" })}
              </SegmentedItem>
            ),
            value: 1,
          },
          {
            label: (
              <SegmentedItem>
                {t("leftPanel.linkForm", { ns: "editor" })}
              </SegmentedItem>
            ),
            value: 2,
          },
        ]}
        value={value}
        onChange={setValue}
      />
      <TranslateBox index={value} className="translate-box">
        <Widgets contain={"all"} />
        <div>1</div>
        <div>2</div>
      </TranslateBox>
    </LeftBox>
  );
};

export default LeftPanel;
