/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-13 15:51:21
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-19 11:29:24
 * @Description: 日期区间
 */

import {
  FormWidgetContainerProps,
  FormWidgetContainer,
} from "@/EditorWidgets/Common/FormWidgetContainer";
import { DatePicker as DatePickerPC, Space } from "antd";
import {
  DatePicker as DatePickerMobile,
  DatePickerProps as DatePickerMobileProps,
} from "antd-mobile";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import { fillDate } from "@/utils/helper";
import { pickerTypeMapData } from "../DatePicker/hooks";

export const formatDate = (
  date: Date,
  type: DatePickerMobileProps["precision"]
) => {
  let res = "";
  if (!date) return res;
  const year = date.getFullYear();
  const month = fillDate(date.getMonth() + 1);
  const day = fillDate(date.getDate());
  const hour = fillDate(date.getHours());
  const min = fillDate(date.getMinutes());
  const seconds = fillDate(date.getSeconds());

  if (type === "day") res = `${year}-${month}-${day}`;
  if (type === "minute") res = `${year}-${month}-${day} ${hour}:${min}`;
  if (type === "second")
    res = `${year}-${month}-${day} ${hour}:${min}:${seconds}`;

  return res;
};

export interface DateRangePickerProps extends FormWidgetContainerProps {
  name: string;
  defaultValue: string;
  type: string;
}

const getFormat = (
  type: string,
  platform: FormWidgetContainerProps["platform"]
) => {
  if (platform === "mobile") {
    return type;
  }
  return pickerTypeMapData.find(v => v.value === type).label as string;
};

export const Component = (props: Partial<DateRangePickerProps>) => {
  const { platform, type } = props;

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
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const format = useCallback(() => {
    return getFormat(type, platform);
  }, [type, platform]);

  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const dom = useMobilePopupContainer();

  return platform === "mobile" ? (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <FormWidgetContainer {...props} name="开始时间">
        <DatePickerMobile
          visible={startVisible}
          onClose={() => {
            setStartVisible(false);
          }}
          onConfirm={val => {
            setStart(val);
          }}
          max={end}
          precision={format() as DatePickerMobileProps["precision"]}
          renderLabel={labelRenderer}
          getContainer={dom}
        >
          {value => {
            return (
              <RenderChild
                className="render-child"
                onClick={() => setStartVisible(true)}
              >
                {value
                  ? formatDate(
                      value,
                      type as DatePickerMobileProps["precision"]
                    )
                  : "请选择"}
                <RightOutlined />
              </RenderChild>
            );
          }}
        </DatePickerMobile>
      </FormWidgetContainer>
      <FormWidgetContainer {...props} name="结束时间">
        <DatePickerMobile
          visible={endVisible}
          onClose={() => {
            setEndVisible(false);
          }}
          min={start}
          onConfirm={val => {
            setEnd(val);
          }}
          precision={format() as DatePickerMobileProps["precision"]}
          renderLabel={labelRenderer}
          getContainer={dom}
        >
          {value => {
            return (
              <RenderChild
                className="render-child"
                onClick={() => setEndVisible(true)}
              >
                {value
                  ? formatDate(
                      value,
                      type as DatePickerMobileProps["precision"]
                    )
                  : "请选择"}
                <RightOutlined />
              </RenderChild>
            );
          }}
        </DatePickerMobile>
      </FormWidgetContainer>
    </Space>
  ) : (
    <FormWidgetContainer {...props}>
      <DatePickerPC.RangePicker
        format={format()}
        showTime={type !== "day"}
        onChange={(date, dateString) => {
          console.log(date, dateString);
        }}
      />
    </FormWidgetContainer>
  );
};

export default Component;

const RenderChild = styled.div`
  height: 40px;
  line-height: 40px;
  color: gray;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
