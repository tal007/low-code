/*
 * @Date: 2023-05-12 14:24:04
 * @LastEditTime: 2023-05-12 14:56:14
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 验证码组件
 */
import { useRef } from "react";
import { message } from "antd";
import { CaptFieldRef, ProFormCaptcha } from "@ant-design/pro-components";
import { CaptchaRenderViewProps } from "./index.d";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";

const Component = (props: Partial<CaptchaRenderViewProps>) => {
  const { fieldProps, formItemProps, formRules, enabled } = props;
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const inputRef = useRef();

  return (
    <FormWidgetContainer {...props}>
      <ProFormCaptcha
        {...formItemProps}
        onGetCaptcha={mobile => {
          return new Promise((resolve, reject) => {
            if (mobile) {
              resolve();
            } else {
              message.info("请输入手机号");
              reject("请输入手机号");
            }
          });
        }}
        fieldRef={captchaRef}
        fieldProps={{
          ref: inputRef,
          placeholder: fieldProps.placeholder,
          disabled: enabled || fieldProps.disabled,
        }}
        rules={[formRules]}
        hidden={false}
      />
    </FormWidgetContainer>
  );
};
export default Component;
