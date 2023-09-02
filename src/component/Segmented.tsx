/*
 * @Date: 2022-10-17 16:12:41
 * @LastEditTime: 2023-05-23 15:03:27
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 分段控制器
 */

import { Segmented as AntdSegmented, Typography } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MPContainer } from "@/style";
import { ScrollContainer } from "./ScrollContainer";
import { useNode, useEditor } from "@craftjs/core";

export interface SegmentedProps {
  options: string[];
  renderMap: {
    [keys: string]: () => JSX.Element;
  };
}

export const Segmented = ({ options, renderMap }: SegmentedProps) => {
  const { t, i18n } = useTranslation();

  const [segmented, setSegmented] = useState<string | number>(
    t(`rightPanel.segmented.${options[0]}`, { ns: "editor" })
  );

  useEffect(() => {
    setSegmented(t(`rightPanel.segmented.${options[0]}`, { ns: "editor" }));
  }, [i18n.language, options, t]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Element = useMemo(() => renderMap[segmented], [segmented]);

  const { query } = useEditor();
  const { id } = useNode();
  const nodeData = query.getNodes()[id]?.data;
  const displayName =
    nodeData?.custom?.displayName || nodeData?.displayName || "";

  return (
    <>
      <Typography.Title level={4} style={{ margin: 10 }} ellipsis={{ rows: 1 }}>
        {displayName || ""}
      </Typography.Title>
      <AntdSegmented
        block
        value={segmented}
        onChange={setSegmented}
        options={options.map(item =>
          t(`rightPanel.segmented.${item}`, { ns: "editor" })
        )}
      />
      <MPContainer
        padding={0}
        margin={"10px 0 0 0"}
        style={{ height: `calc(100% - 90px)` }}
      >
        <ScrollContainer>{Element && <Element />}</ScrollContainer>
      </MPContainer>
    </>
  );
};
