/*
 * @Date: 2023-05-12 15:02:21
 * @LastEditTime: 2023-05-15 12:28:04
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 下拉选择组件
 */

import { ProFormSelect } from "@ant-design/pro-components";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { SelectRenderViewProps } from "./index.d";

const Component = (props: Partial<SelectRenderViewProps>) => {
  const { fieldProps, formItemProps, dataSource, enabled } = props;
  const { staticData } = dataSource;

  // TODO 处理数据
  // console.log('dataSource', dataSource);

  const onChange = (value: string) => {
    console.log(value);
  };

  return (
    <FormWidgetContainer {...props}>
      <ProFormSelect.SearchSelect
        {...formItemProps}
        fieldProps={{
          ...fieldProps,
          onChange,
          options: staticData,
          disabled: enabled || fieldProps.disabled,
        }}
        hidden={false}
      ></ProFormSelect.SearchSelect>
    </FormWidgetContainer>
  );
};
export default Component;
