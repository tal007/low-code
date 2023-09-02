import { FormWidgetContainerProps } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Enum } from "@/SettingPanelSchema/Select";
import { DatePickerProps } from "./Component";
import moment from "moment";

export const pickerTypeMapData: Enum[] = [
  { label: "YYYY", value: "year" },
  { label: "YYYY-MM", value: "month" },
  { label: "YYYY-MM-DD", value: "day" },
  { label: "YYYY-MM-DD HH:mm", value: "minute" },
  { label: "YYYY-MM-DD HH:mm:ss", value: "second" },
];

export const getFormat = (
  type: string,
  platform: FormWidgetContainerProps["platform"]
) => {
  if (platform === "mobile") {
    return type;
  }
  return pickerTypeMapData.find(v => v.value === type).label as string;
};

const optionalTimeRangeEnum = {
  不限制: 1,
  今天之后: 2,
  今天之前: 3,
  不可选区间: 4,
};

/**
 * @author 梁强
 * @date 2023-05-24 星期三
 * @function 转化一次
 * @param {}
 * @return {}
 */
export const pickerTypeMap = {
  year: "year",
  month: "month",
  day: "date",
  minute: "date",
  second: "date",
};

/**
 * @author 梁强
 * @date 2023-05-24 星期三
 * @function 限制时间
 * @param {}
 * @return {}
 */
export const disOptionalTimeRange = (props: Partial<DatePickerProps>) => {
  const { noRangeStart, noRangeEnd, format, optionalTimeRange } = props;

  const optionalTimeRangeMap = {
    // 不限制
    [optionalTimeRangeEnum.不限制]: () => {
      const formatMap = {
        YYYY: {},
        "YYYY-MM": {},
        "YYYY-MM-DD": {},
        "YYYY-MM-DD HH:mm": {},
        "YYYY-MM-DD HH:mm:ss": {},
      };
      return formatMap[format];
    },
    [optionalTimeRangeEnum.今天之后]: () => {
      const formatMap = {
        YYYY: {
          disabledDate: current =>
            current && current < moment().subtract(1, "year").endOf("year"),
        },
        "YYYY-MM": {
          disabledDate: current =>
            current && current < moment().subtract(1, "month").endOf("month"),
        },
        "YYYY-MM-DD": {
          disabledDate: current =>
            current && current < moment().subtract(1, "day").endOf("day"),
        },
        "YYYY-MM-DD HH:mm": {
          disabledDate: current =>
            current && current < moment().subtract(1, "day").endOf("day"),
        },
        "YYYY-MM-DD HH:mm:ss": {
          disabledDate: current =>
            current && current < moment().subtract(1, "day").endOf("day"),
        },
      };
      return formatMap[format];
    },
    [optionalTimeRangeEnum.今天之前]: () => {
      const formatMap = {
        YYYY: {
          disabledDate: current => current && current > moment().endOf("year"),
        },
        "YYYY-MM": {
          disabledDate: current => current && current > moment().endOf("month"),
        },
        "YYYY-MM-DD": {
          disabledDate: current => current && current > moment().endOf("day"),
        },
        "YYYY-MM-DD HH:mm": {
          disabledDate: current => current && current > moment().endOf("day"),
        },
        "YYYY-MM-DD HH:mm:ss": {
          disabledDate: current => current && current > moment().endOf("day"),
        },
      };
      return formatMap[format];
    },
    [optionalTimeRangeEnum.不可选区间]: () => {
      const formatMap = {
        YYYY: {
          disabledDate: current =>
            current &&
            (noRangeStart || noRangeEnd) &&
            current > moment(noRangeStart).endOf("year") &&
            current < moment(noRangeEnd).endOf("year"),
        },
        "YYYY-MM": {
          disabledDate: current =>
            current &&
            (noRangeStart || noRangeEnd) &&
            current > moment(noRangeStart).endOf("month") &&
            current < moment(noRangeEnd).endOf("month"),
        },
        "YYYY-MM-DD": {
          disabledDate: current =>
            current &&
            (noRangeStart || noRangeEnd) &&
            current > moment(noRangeStart).endOf("day") &&
            current < moment(noRangeEnd).endOf("day"),
        },
        "YYYY-MM-DD HH:mm": {
          disabledDate: current =>
            current &&
            (noRangeStart || noRangeEnd) &&
            current > moment(noRangeStart).endOf("day") &&
            current < moment(noRangeEnd).endOf("day"),
        },
        "YYYY-MM-DD HH:mm:ss": {
          disabledDate: current =>
            current &&
            (noRangeStart || noRangeEnd) &&
            current > moment(noRangeStart).endOf("day") &&
            current < moment(noRangeEnd).endOf("day"),
        },
      };
      return formatMap[format];
    },
  };

  return optionalTimeRangeMap[optionalTimeRange]();
};
