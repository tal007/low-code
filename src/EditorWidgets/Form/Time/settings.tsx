/**
 * @author 梁强
 * @filename settings.tsx
 * @date 2023-05-22 星期一
 * @description Time settings
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
import { TimePicker } from "antd";
import { setValue } from "@/SettingPanelSchema/helper";
import moment from "moment";

const timeType: Enum[] = [
  {
    label: ["form.Time.hhmm", { ns: "editorWidget" }],
    value: "HH:mm",
    translate: true,
  },
  {
    label: ["form.Time.hhmmss", { ns: "editorWidget" }],
    value: "HH:mm:ss",
    translate: true,
  },
];

const intervalMinutes: Enum[] = [
  {
    label: ["form.Time.1", { ns: "editorWidget" }],
    value: 1,
    translate: true,
  },
  {
    label: ["form.Time.5", { ns: "editorWidget" }],
    value: 5,
    translate: true,
  },
  {
    label: ["form.Time.10", { ns: "editorWidget" }],
    value: 10,
    translate: true,
  },
  {
    label: ["form.Time.15", { ns: "editorWidget" }],
    value: 15,
    translate: true,
  },
  {
    label: ["form.Time.30", { ns: "editorWidget" }],
    value: 30,
    translate: true,
  },
  {
    label: ["form.Time.60", { ns: "editorWidget" }],
    value: 60,
    translate: true,
  },
];

const defaultValue: Enum[] = [
  {
    label: ["form.Time.fillThatTime", { ns: "editorWidget" }],
    value: 1,
    translate: true,
  },
  {
    label: ["form.Time.custom", { ns: "editorWidget" }],
    value: 2,
    translate: true,
  },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "SelectSchema",
      {
        label: ["form.Time.timeType", { ns: "editorWidget" }],
        direction: "column",
      },
      "format",
      {
        mapData: timeType,
      }
    ),
    createSchema(
      "SelectSchema",
      {
        label: ["form.Time.defaultValue", { ns: "editorWidget" }],
        direction: "column",
      },
      "defaultValueType",
      {
        mapData: defaultValue,
        renderextraNode: props => {
          const { defaultValueType, setProp, format } = props;

          if (defaultValueType === 1) {
            setProp(
              props => setValue(props, "defaultValue", moment().format(format)),
              500
            );
            return;
          }

          // defaultValue
          return (
            <TimePicker
              format={"HH:mm:ss"}
              onChange={(e, dateString) =>
                setProp(
                  props =>
                    setValue(
                      props,
                      "defaultValue",
                      moment(
                        `${moment().format("YYYY-MM-DD")} ${dateString}`
                      ).format(format)
                    ),
                  500
                )
              }
              style={{ width: "100%", marginTop: 10 }}
            />
          );
        },
      }
    ),
    createSchema(
      "SelectSchema",
      {
        label: ["form.Time.defaultIntervalMinutes", { ns: "editorWidget" }],
        direction: "column",
      },
      "intervalMinutes",
      {
        mapData: intervalMinutes,
      }
    ),
    createSchema(
      "SwitchSchema",
      {
        label: ["form.Time.initialCurrentTime", { ns: "editorWidget" }],
        direction: "column",
      },
      "initialTime"
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

const TimeRenderViewSettings = () => {
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

export default TimeRenderViewSettings;
