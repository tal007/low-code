/**
 * @author 梁强
 * @filename index.tsx
 * @date 2023-05-11 星期四
 * @description 学院
 */
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { Element } from "@craftjs/core";
import { UserComponentSetting } from "./setting";
import { displayName } from "@/i18n/widgetDisplayName";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import Component from "./Component";
import { UserComponentViewProps } from "./index.d";
import { TabsRadioBoxTypeMap } from "@/SettingPanelSchema/TabsRadioBox";
import { useFormValue } from "@/EditorWidgets/hooks";

const NAME = "User";
const widgetName = displayName(NAME);

export const userOptionsModeMap = {
  提交人: 1,
  指定人员: 2,
};

export const UserComponent = Component;

const defaultProps = {
  name: widgetName,
  mainGate: false,
  userOptionsMode: userOptionsModeMap.提交人,
  userOptions: [],
  placeholder: "请输入",
  optionalRange: 1,
  TabsRadioBoxType: TabsRadioBoxTypeMap.用户,
  vertical: true,
};

export const UserRenderView = (props: Partial<UserComponentViewProps>) => {
  const [setSubmitFormValue, setDeriveSubmitFormValue] = useFormValue();

  return (
    <BaseContainer {...props}>
      <UserComponent
        {...props}
        setSubmitFormValue={setSubmitFormValue}
        setDeriveSubmitFormValue={setDeriveSubmitFormValue}
      />
    </BaseContainer>
  );
};

UserRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: UserComponentSetting,
  },
};

export const User: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "form"),
  icon: "user",
  tags: ["form"],
  preview: <UserRenderView />,
  render: (
    <Element
      canvas
      is={UserRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "UserComponent",
      }}
    ></Element>
  ),
};
