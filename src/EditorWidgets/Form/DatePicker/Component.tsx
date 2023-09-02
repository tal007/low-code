/**
 * @author 梁强
 * @filename Component.tsx
 * @date 2023-05-23 星期二
 * @description 日期Date组件
 */
import {
  FormWidgetContainerProps,
  FormWidgetContainer,
} from "@/EditorWidgets/Common/FormWidgetContainer";
import { DatePicker as DatePickerPC } from "antd";
import {
  DatePicker as DatePickerMobile,
  DatePickerProps as DatePickerMobileProps,
} from "antd-mobile";
import { useCallback, useMemo, useState } from "react";
import {
  disOptionalTimeRange,
  getFormat,
  pickerTypeMap,
  pickerTypeMapData,
} from "./hooks";
import styled from "styled-components";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import moment from "moment";
import dayjs from "dayjs";

export interface DatePickerProps extends FormWidgetContainerProps {
  name: string;
  type: string;
  //
  format: string;
  defaultValueType: number;
  defaultExtraValue: string;
  optionalTimeRange: number;
  noRangeStart: string;
  noRangeEnd: string;
}

const RenderChild = styled.div`
  height: 40px;
  line-height: 40px;
  color: gray;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Component = (props: Partial<DatePickerProps>) => {
  const { platform, format: formatProps, defaultExtraValue } = props;

  const dom = useMobilePopupContainer();
  const type = pickerTypeMapData.find(v => v.label === formatProps)
    ?.value as string;

  const [visible, setVisible] = useState(false);

  const format = useMemo(() => {
    return getFormat(type, platform);
  }, [type, platform]);

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case "year":
        return data + "年";
      case "month":
        return data + "月";
      case "day":
        return data + "日";
      case "hour":
        return data + "时";
      case "minute":
        return data + "分";
      case "second":
        return data + "秒";
      default:
        return data;
    }
  }, []);

  const renderNode = useMemo(() => {
    if (platform === "mobile") {
      return (
        <DatePickerMobile
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onConfirm={val => {
            console.log(val.toDateString());
          }}
          precision={format as DatePickerMobileProps["precision"]}
          renderLabel={labelRenderer}
          getContainer={dom}
          style={{ width: "100%" }}
        >
          {value => {
            return (
              <RenderChild
                className="render-child"
                onClick={() => setVisible(true)}
              >
                {value ? moment(value).format(formatProps) : "请选择"}
              </RenderChild>
            );
          }}
        </DatePickerMobile>
      );
    }

    const datePickerPCProps: any = {
      format: formatProps,
      showTime: formatProps.indexOf("mm") ? true : false,
      onChange: (v, dateString) => {
        console.log(v, dateString);
      },
      style: { width: "100%" },
      picker: pickerTypeMap[type] as "time" | "year",
      defaultValue: dayjs(defaultExtraValue).isValid()
        ? dayjs(defaultExtraValue)
        : undefined,
      ...disOptionalTimeRange(props),
    };

    return <DatePickerPC {...datePickerPCProps} />;
  }, [
    defaultExtraValue,
    dom,
    format,
    formatProps,
    labelRenderer,
    platform,
    props,
    type,
    visible,
  ]);

  const Node = (...formProps) => renderNode;

  return (
    <FormWidgetContainer {...props}>
      <Node />
    </FormWidgetContainer>
  );
};

export default Component;
