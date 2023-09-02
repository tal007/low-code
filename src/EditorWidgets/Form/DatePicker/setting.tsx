/*
 * @Date: 2022-10-25 09:12:34
 * @LastEditTime: 2023-05-16 11:09:26
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";
import { DatePicker, Space } from "antd";
import { setValue } from "@/SettingPanelSchema/helper";
import moment from "moment";

const optionalTimeRange: Enum[] = [
  {
    label: ["form.DatePicker.noLimit", { ns: "editorWidget" }],
    value: 1,
    translate: true,
  },
  {
    label: ["form.DatePicker.afterToday", { ns: "editorWidget" }],
    value: 2,
    translate: true,
  },
  {
    label: ["form.DatePicker.beforeToday", { ns: "editorWidget" }],
    value: 3,
    translate: true,
  },
  {
    label: ["form.DatePicker.noRange", { ns: "editorWidget" }],
    value: 4,
    translate: true,
  },
];

export const dateType: Enum[] = [
  {
    label: ["form.DatePicker.YYYY", { ns: "editorWidget" }],
    value: "YYYY",
    translate: true,
  },
  {
    label: ["form.DatePicker.YYYYMM", { ns: "editorWidget" }],
    value: "YYYY-MM",
    translate: true,
  },
  {
    label: ["form.DatePicker.YYYYMMDD", { ns: "editorWidget" }],
    value: "YYYY-MM-DD",
    translate: true,
  },
  {
    label: ["form.DatePicker.YYYYMMDDHHmm", { ns: "editorWidget" }],
    value: "YYYY-MM-DD HH:mm",
    translate: true,
  },
  {
    label: ["form.DatePicker.YYYYMMDDHHmmss", { ns: "editorWidget" }],
    value: "YYYY-MM-DD HH:mm:ss",
    translate: true,
  },
];

const defaultValue: Enum[] = [
  {
    label: ["form.DatePicker.fillThatTime", { ns: "editorWidget" }],
    value: 1,
    translate: true,
  },
  {
    label: ["form.DatePicker.custom", { ns: "editorWidget" }],
    value: 2,
    translate: true,
  },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "SelectSchema",
      {
        label: ["form.DatePicker.dateType", { ns: "editorWidget" }],
        direction: "column",
      },
      "format",
      {
        mapData: dateType,
      }
    ),
    createSchema(
      "SelectSchema",
      {
        label: ["form.DatePicker.defaultValueType", { ns: "editorWidget" }],
        direction: "column",
      },
      "defaultValueType",
      {
        mapData: defaultValue,
        renderextraNode: props => {
          const { defaultValueType, format, setProp } = props;

          if (defaultValueType === 1) {
            setProp(
              props =>
                setValue(props, "defaultExtraValue", moment().format(format)),
              500
            );
            return;
          }

          // defaultExtraValue
          return (
            <DatePicker
              format={"YYYY-MM-DD HH:mm:ss"}
              showTime={format.indexOf("hh") ? true : false}
              onChange={(e, dateString) => {
                setProp(
                  props => setValue(props, "defaultExtraValue", dateString),
                  500
                );
              }}
              style={{ width: "100%", marginTop: 10 }}
            />
          );
        },
      }
    ),
    createSchema(
      "SelectSchema",
      {
        label: ["form.DatePicker.optionalTimeRange", { ns: "editorWidget" }],
        direction: "column",
      },
      "optionalTimeRange",
      {
        mapData: optionalTimeRange,
        renderextraNode: props => {
          const { optionalTimeRange, format, setProp } = props;

          if (optionalTimeRange !== 4) {
            return;
          }

          // noRangeStart\noRangeEnd
          return (
            <div style={{ marginTop: 10 }}>
              <Space>
                <div style={{ padding: "4px 0px" }}>开始时间</div>
                <DatePicker
                  format={"YYYY-MM-DD HH:mm:ss"}
                  showTime={format.indexOf("hh") ? true : false}
                  onChange={(e, dateString) => {
                    setProp(
                      props => setValue(props, "noRangeStart", dateString),
                      500
                    );
                  }}
                  style={{ width: "205px" }}
                />
              </Space>
              <Space>
                <div style={{ padding: "4px 0px" }}>结束时间</div>
                <DatePicker
                  format={"YYYY-MM-DD HH:mm:ss"}
                  showTime={format.indexOf("hh") ? true : false}
                  onChange={(e, dateString) => {
                    setProp(
                      props => setValue(props, "noRangeEnd", dateString),
                      500
                    );
                  }}
                  style={{ width: "205px", marginTop: 5 }}
                />
              </Space>
            </div>
          );
        },
      }
    ),
    createSchema(
      "SwitchSchema",
      { label: "antdPropDesc.required", direction: "column" },
      "required"
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["rightPanel.i18n.vertical", { ns: "editor" }],
        direction: "column",
      },
      "vertical"
    ),
  ]),
};

export const DatePickerSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]:
          SettingProvider(propsSetting),
      }}
    />
  );
};
