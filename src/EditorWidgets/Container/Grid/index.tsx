/*
 * @Date: 2022-10-18 09:12:21
 * @LastEditTime: 2023-05-25 17:18:41
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: grid 布局容器 兼容移动 与 PC
 */
import { Element } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { GridSetting } from "./setting";
import { marginAndPaddingDefault } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { merge } from "lodash";
import { backgroundDefault } from "@/SettingPanelSchema/settingRender/background";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { DropTip } from "@/EditorWidgets/Common/DropTip";
import { GridRenderViewProps } from "./index.d";
import Component from "./Component";
import { ComponentTitle } from "@/EditorWidgets/Common/ComponentShowWhenConfig/ComponentTitle";

const defaultProps = merge({
  ...marginAndPaddingDefault,
  ...backgroundDefault,
  horizontalGutter: 8,
  verticalGutter: 8,
  justify: "flex-start",
  align: "flex-start",
  xs: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 2,
  xxl: 2,
});

export const GridComponent = Component;
export const GridRenderView = (props: Partial<GridRenderViewProps>) => {
  const { t } = useTranslation();

  return (
    <BaseContainer>
      <>
        <ComponentTitle
          title={t("container.Grid.name", { ns: "editorWidget" })}
        />
        <Component {...props} />
      </>
    </BaseContainer>
  );
};

GridRenderView.craft = {
  displayName: "Grid",
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
  related: {
    settings: GridSetting,
  },
};

export const Grid: CommonButtonTypes = {
  ...generateWidgetOptions("Grid", "container"),
  icon: "table-cells",
  tags: ["container"],
  render: (
    <Element
      canvas
      is={GridRenderView}
      custom={{
        displayName: "栅格",
        tags: ["container"],
        componentName: "GridComponent",
      }}
    >
      <Element is={DropTip} canvas />
    </Element>
  ),
};
