/**
 * @author 梁强
 * @filename Component.tsx
 * @date 2023-05-11 星期四
 * @description UserComponent
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { Select } from "antd";
import { UserComponentViewProps } from "./index.d";

export const UserComponent = (props: Partial<UserComponentViewProps>) => {
  const {
    userOptions,
    placeholder,
    setSubmitFormValue,
    setDeriveSubmitFormValue,
  } = props;
  const onChange = (value: any[]) => {
    const checkedArray = userOptions.filter(item => {
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
        options={userOptions}
        allowClear
        onChange={e => onChange(e)}
      />
    </FormWidgetContainer>
  );
};

export default UserComponent;
