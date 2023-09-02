/*
 * @Date: 2023-04-21 11:07:50
 * @LastEditTime: 2023-05-12 10:47:16
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 金额组件
 */

import { MoneyInputProps, UpperCaseProps } from "./index.d";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { InputNumber as InputNumberPC } from "antd";
import { Input as InputMobile } from "antd-mobile";
import { useState } from "react";
import { numberToUpperCase } from "../../helper";

const UpperCaseComponent = (props: UpperCaseProps) => {
  const { num } = props;
  const { t } = useTranslation();
  const upperCase = numberToUpperCase(num);
  return (
    <>
      <span className="label" style={{ marginTop: "8px", marginBottom: 0 }}>
        {t("form.MoneyInput.upperCase", { ns: "editorWidget" })}
      </span>
      <p>{upperCase}</p>
    </>
  );
};
const Component = (props: Partial<MoneyInputProps>) => {
  const { platform, placeholder, precision, upperCase } = props;
  const [inputValue, setInputValue] = useState<number>();

  const onChange = (value: string): void => {
    if (!value) return setInputValue(null);
    let _value = parseFloat(value);
    if (precision !== undefined) {
      const mul = Math.pow(10, precision);
      _value = mul === 0 ? Math.round(_value) : Math.round(_value * mul) / mul;
    }
    setInputValue(_value);
  };
  return (
    <>
      <FormWidgetContainer {...props}>
        {platform === "mobile" ? (
          <InputMobile
            type="number"
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : (
          <InputNumberPC
            placeholder={placeholder}
            style={{ width: "100%" }}
            onChange={onChange}
          />
        )}
      </FormWidgetContainer>
      {upperCase ? <UpperCaseComponent num={inputValue} /> : ""}
    </>
  );
};
export default Component;
