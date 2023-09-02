/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-12 17:33:01
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-15 13:36:00
 * @Description: 数字输入框
 */
import {
  FormWidgetContainerProps,
  FormWidgetContainer,
} from "@/EditorWidgets/Common/FormWidgetContainer";
import { Input as InputPC } from "antd";
import { Input as InputMobile } from "antd-mobile";

export interface IDNumberComponentProps extends FormWidgetContainerProps {
  name: string;
  placeholder: string;
  defaultValue: string;
}

const isIDNumber = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const Component = (props: Partial<IDNumberComponentProps>) => {
  const { platform, placeholder } = props;

  const checkIDCard = (_: any, value: string) => {
    if (!isIDNumber.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("身份证号码格式不正确"));
  };

  return (
    <FormWidgetContainer {...props} rules={[{ validator: checkIDCard }]}>
      {platform === "mobile" ? (
        <InputMobile placeholder={placeholder} maxLength={18} minLength={18} />
      ) : (
        <InputPC
          placeholder={placeholder}
          style={{ width: "100%" }}
          maxLength={18}
          minLength={18}
        />
      )}
    </FormWidgetContainer>
  );
};

export default Component;
