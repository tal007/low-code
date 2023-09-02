/*
 * @Date: 2022-10-18 11:47:48
 * @LastEditTime: 2023-01-04 16:16:13
 * @LastEditors: 刘玉田
 * @Description:
 */

import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { Segmented } from "@/component/Segmented";
import { useTranslation } from "react-i18next";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";
import { marginAndPaddingRender } from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { basicRender, statusRender } from "@/SettingPanelSchema/settingRender";
import { ProFormProps } from "@ant-design/pro-components";
import { flexJustify } from "@/SettingPanelSchema/settingRender/flexAlign";
import { EventHandler } from "@/SettingPanelSchema/EventHandler";

const layoutMapData: Enum[] = [
  {
    label: "direction.horizontal",
    value: "horizontal",
  },
  {
    label: "direction.vertical",
    value: "vertical",
  },
  { label: "direction.inline", value: "inline" },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "RadioGroupSchema",
      {
        label: "antdPropDesc.layout",
        labelWidth: "80px",
      },
      "proFormProps.layout",
      {
        mapData: layoutMapData,
      }
    ),
    createSchema(
      "RadioGroupSchema",
      {
        label: "proForm.footer.align",
      },
      "footer.align",
      { mapData: flexJustify.slice(0, 3) }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: "proForm.footer.showSubmit",
      },
      "footer.showSubmit"
    ),
    createSchema(
      "InputSchema",
      {
        label: "proForm.footer.showSubmitText",
        labelWidth: "200px",
      },
      "footer.showSubmitText",
      {},
      { hidden: props => !props["footer.showSubmit"] }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: "proForm.footer.showReset",
      },
      "footer.showReset"
    ),
    createSchema(
      "InputSchema",
      {
        label: "proForm.footer.showResetText",
        labelWidth: "200px",
      },
      "footer.showResetText",
      {},
      { hidden: props => !props["footer.showReset"] }
    ),
  ]),
  ...statusRender([]),
};

const interfaceSetting: SettingProviderProps = {
  interface: {
    translate: false,
    header: "请求设置",
    children: [
      createSchema(
        "QueryModalSchema",
        {
          label: "初始数据地址",
          direction: "column",
        },
        "initApi"
      ),
      createSchema(
        "QueryModalSchema",
        {
          label: "数据提交地址",
          direction: "column",
        },
        "submitApi"
      ),
    ],
  },
};

const styleSetting: SettingProviderProps = {
  ...marginAndPaddingRender(),
};

export const formPropsDefault: ProFormProps = {
  layout: "horizontal",
  grid: false,
  rowProps: { gutter: 8 },
};

export const FormSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props", "interface", "style", "events"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
        [t("editor.rightPanel.segmented.interface")]:
          SettingProvider(interfaceSetting),
        [t("rightPanel.segmented.style", { ns: "editor" })]:
          SettingProvider(styleSetting),
        [t("rightPanel.segmented.events", { ns: "editor" })]: () => (
          <EventHandler
            actionTypes={["submit" /*, "mouseEnter", "mouseLeave" */]}
          />
        ),
      }}
    />
  );
};
