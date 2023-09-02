/**
 * @author 梁强
 * @filename Component.tsx
 * @date 2023-05-22 星期一
 * @description
 */
import { TimePicker as PcTimePicker } from "antd";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { TimeComponentViewProps } from ".";
import dayjs from "dayjs";

const Component = (props: Partial<TimeComponentViewProps>) => {
  const { format, defaultValue } = props;

  console.log("Time defaultValue:", defaultValue);

  return (
    <FormWidgetContainer {...props}>
      <PcTimePicker
        format={format}
        defaultValue={
          dayjs(defaultValue, format).isValid()
            ? dayjs(defaultValue, format)
            : undefined
        }
        style={{ width: "100%" }}
      />
    </FormWidgetContainer>
  );
};

export default Component;
