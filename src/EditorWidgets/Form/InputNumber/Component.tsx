/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-12 17:33:01
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-12 11:20:44
 * @Description: 数字输入框
 */

import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { InputNumber as InputNumberPC } from "antd";
import { Input as InputMobile } from "antd-mobile";
import { InputNumberProps } from "./index.d";

const Component = (props: Partial<InputNumberProps>) => {
  const { platform, placeholder } = props;

  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        <InputMobile type="number" placeholder={placeholder} />
      ) : (
        <InputNumberPC placeholder={placeholder} style={{ width: "100%" }} />
      )}
    </FormWidgetContainer>
  );
};

export default Component;
