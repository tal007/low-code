/*
 * @Date: 2023-05-15 09:20:54
 * @LastEditTime: 2023-05-15 10:32:06
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 栅格容器组件
 */
import { Row, Col } from "antd";
import React from "react";
import { DropTipShowNode } from "@/EditorWidgets/Common/DropTip";
import { useSelector } from "react-redux";
import { currentTipContainerIds } from "@/store/tipContainer.slice";
import { GridRenderViewProps } from "./index.d";

const justifyMap = new Map();
justifyMap.set("flex-start", "start");
justifyMap.set("center", "center");
justifyMap.set("flex-end", "end");
justifyMap.set("space-between", "space-between");
justifyMap.set("space-around", "space-around");

const alignMap = new Map();
alignMap.set("flex-start", "top");
alignMap.set("center", "middle");
alignMap.set("flex-end", "bottom");

const Component = (props: Partial<GridRenderViewProps>) => {
  const { children, horizontalGutter, verticalGutter, justify, align } = props;

  const tipContainerIds = useSelector(currentTipContainerIds);
  const childLength =
    (children as React.ReactElement)?.props?.children?.length || 0;

  return (
    <>
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: justifyMap.get(justify),
          alignItems: alignMap.get(align),
        }}
        gutter={[horizontalGutter, verticalGutter]}
      >
        {React.Children.map(
          (children as React.ReactElement)?.props?.children,
          child => {
            if (childLength === 1 && tipContainerIds.includes(child.props.id))
              return (
                <Col span={24}>
                  {child}
                  <DropTipShowNode />
                </Col>
              );
            return !tipContainerIds.includes(child.props.id) && <>{child}</>;
          }
        )}
      </Row>
    </>
  );
};
export default Component;
