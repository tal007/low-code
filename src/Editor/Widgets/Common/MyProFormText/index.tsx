/*
 * @Date: 2022-12-08 16:44:23
 * @LastEditTime: 2022-12-08 16:58:34
 * @LastEditors: 刘玉田
 * @Description:
 */

import { ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import type {
  FieldProps,
  ProFormFieldItemProps,
} from "@ant-design/pro-form/es/typing";
import type { InputProps } from "antd";
import type { PasswordProps, TextAreaProps } from "antd/lib/input";

interface IProps {
  isShow?: boolean;
  fieldProps?: FieldProps<any> & InputProps & PasswordProps & TextAreaProps;
  type?: "password" | "textArea";
  formItemProps?: ProFormFieldItemProps<InputProps>;
  className?: string;
  disabled?: boolean;
}
const MyProFormText: React.FC<IProps> = props => {
  const createEl = () => {
    const { formItemProps, fieldProps, className } = props;
    if (props.isShow === false) {
      return null;
    }
    let el = (
      <ProFormText
        // 文本框去除首位空格  有name属性生效
        getValueFromEvent={e => {
          return e.target.value.toString().replace(/(^\s*)|(\s*$)/g, "");
        }}
        {...formItemProps}
        fieldProps={{
          className: `${className}`,
          disabled: props.disabled,
          ...fieldProps,
        }}
      />
    );

    if (props.type === "password") {
      el = (
        <ProFormText.Password
          {...formItemProps}
          fieldProps={{ ...fieldProps }}
        />
      );
    }
    if (props.type === "textArea") {
      el = (
        <ProFormTextArea {...formItemProps} fieldProps={{ ...fieldProps }} />
      );
    }
    return el;
  };

  return createEl();
};

export default MyProFormText;
