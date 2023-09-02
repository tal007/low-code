/*
 * @Date: 2023-05-22 09:46:59
 * @LastEditTime: 2023-05-22 13:52:01
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */
/**
 * @author 梁强
 * @filename RadioFormItemComponent.tsx
 * @date 2023-05-17 星期三
 * @description Radio 某一项需要添加用户、部门、角色
 */
import { Form, RadioChangeEvent } from "antd";
import { useSetState } from "ahooks";
import AddMembersOrDepartment from "./AddMembersOrDepartment";
import { DepartMentAndUserTreeItemType } from "@/SettingPanelSchema/TabsRadioBox/OrgStructureTree";
import RadioGroup from "@/component/RadioGroup";

export interface OptionType {
  label: string | [string, object];
  value: number | string;
  mode?: "Role" | "Department" | "User";
}

interface RadioDepartmentOrUserFormItemProps {
  value?: any[];
  onChange?: (val) => void;
  options: OptionType[];
  extraFormName: string;
  multiple?: boolean;
}

const RadioFormItemComponent = (props: RadioDepartmentOrUserFormItemProps) => {
  const { options, extraFormName, value, onChange, multiple = false } = props;
  const [{ mode }, setState] = useSetState({
    mode: undefined,
  });
  const onChangeRadio = (e: RadioChangeEvent) => {
    const [filterItem] = options.filter(
      (item: OptionType) => item?.value === e.target.value
    );
    if (filterItem) {
      setState({
        mode: filterItem?.mode,
      });
    }
    onChange(e.target.value);
  };

  return (
    <>
      <RadioGroup
        options={options}
        ns="flowPath"
        direction="vertical"
        optionType="default"
        onChange={onChangeRadio}
        value={value}
      />
      <div style={{ marginTop: 5, marginLeft: 20 }}>
        {mode && (
          <Form.Item name={extraFormName} style={{ margin: 0 }}>
            <AddMembersOrDepartment
              mode={mode as DepartMentAndUserTreeItemType}
              multiple={multiple}
            />
          </Form.Item>
        )}
      </div>
    </>
  );
};

export default RadioFormItemComponent;
