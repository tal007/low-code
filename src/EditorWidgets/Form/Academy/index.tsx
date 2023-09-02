/**
 * @author 梁强
 * @filename index.tsx
 * @date 2023-05-11 星期四
 * @description 学院
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { AcademyComponentSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component from "./Component";
import { AcademyComponentViewProps } from "./index.d";
import { TabsRadioBoxTypeMap } from "@/SettingPanelSchema/TabsRadioBox";
import { useFormValue } from "@/EditorWidgets/hooks";

const NAME = "Academy";
const widgetName = displayName(NAME);

export const AcademyComponent = Component;

export const academyOptionsModeMap = {
  提交人部门: 1,
  指定部门: 2,
};

const defaultProps = {
  name: widgetName,
  mainGate: false,
  academyOptionsMode: 1,
  academyOptions: [],
  placeholder: "请输入",
  optionalNumber: 1,
  TabsRadioBoxType: TabsRadioBoxTypeMap.部门,
  vertical: true,
};

export const AcademyRenderView = (
  props: Partial<AcademyComponentViewProps>
) => {
  const [setSubmitFormValue, setDeriveSubmitFormValue] = useFormValue();
  return (
    <BaseContainer {...props}>
      <AcademyComponent
        {...props}
        setSubmitFormValue={setSubmitFormValue}
        setDeriveSubmitFormValue={setDeriveSubmitFormValue}
      />
    </BaseContainer>
  );
};

AcademyRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: AcademyComponentSetting,
  },
};

export const Academy: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "sitemap",
  tags: ["form"],
  preview: <AcademyRenderView />,
  render: (
    <Element
      canvas
      is={AcademyRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "AcademyComponent",
      }}
    ></Element>
  ),
};
