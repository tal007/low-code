/**
 * @author 梁强
 * @filename Component.tsx
 * @date 2023-05-11 星期四
 * @description AcademyComponent
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Select } from "antd";
import { AcademyComponentViewProps } from "./index.d";

export const AcademyComponent = (props: Partial<AcademyComponentViewProps>) => {
  const {
    academyOptions,
    placeholder,
    setSubmitFormValue,
    setDeriveSubmitFormValue,
  } = props;

  const onChange = (value: any[]) => {
    const checkedArray = academyOptions.filter(item => {
      return value.includes(item.value);
    });

    const values = checkedArray.map(checked => checked.value);
    const labels = checkedArray.map(checked => checked.label);

    setSubmitFormValue(values.join(","));
    setDeriveSubmitFormValue(labels.join(","), "name");
  };

  return (
    <FormWidgetContainer {...props}>
      <Select
        style={{ width: "100%" }}
        placeholder={placeholder}
        options={academyOptions}
        allowClear
        onChange={e => onChange(e)}
      />
    </FormWidgetContainer>
  );
};

export default AcademyComponent;
