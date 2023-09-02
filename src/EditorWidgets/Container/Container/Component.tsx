/*
 * @Date: 2023-05-12 17:49:36
 * @LastEditTime: 2023-05-12 18:00:44
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 容器组件
 */

import { DropTipShowNode } from "@/EditorWidgets/Common/DropTip";
import { ComponentTitle } from "@/EditorWidgets/Common/ComponentShowWhenConfig/ComponentTitle";
import React from "react";
import { useSelector } from "react-redux";
import { currentTipContainerIds } from "@/store/tipContainer.slice";
import { ContainerRenderViewProps } from "./index.d";

const Component = (props: Partial<ContainerRenderViewProps>) => {
  const { children, enabled } = props;

  const tipContainerIds = useSelector(currentTipContainerIds);
  const childLength =
    (children as React.ReactElement)?.props?.children?.length || 0;

  return (
    <>
      {enabled && <ComponentTitle title="容器" />}
      {React.Children.map(
        (children as React.ReactElement)?.props?.children,
        (child: React.ReactElement) => {
          if (childLength === 1 && tipContainerIds.includes(child.props.id))
            return (
              <>
                {child}
                <DropTipShowNode />
              </>
            );
          return !tipContainerIds.includes(child.props.id) && child;
        }
      )}
    </>
  );
};
export default Component;
