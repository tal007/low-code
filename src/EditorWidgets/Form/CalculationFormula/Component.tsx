/*
 * @Date: 2023-05-04 11:07:50
 * @LastEditTime: 2023-05-10 10:32:26
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 自动计算组件
 */
import { useFormValue, useEditorAction } from "@/EditorWidgets/hooks";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { InputNumber as InputNumberPC } from "antd";
import { NumberKeyboard, VirtualInput } from "antd-mobile";
import { useState, useEffect } from "react";
import { numberToUpperCase } from "../../helper";
import { CalculationFormulaProps, UpperCaseProps } from "./index.d";
import { useSelector } from "react-redux";
import { currentFormValue } from "@/store/formValue.slice";

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
const Component = (props: Partial<CalculationFormulaProps>) => {
  const { platform, placeholder, precision, upperCase, readOnly, formula } =
    props;
  const { t } = useTranslation();
  const [setValue] = useFormValue();
  const [inputValue, setInputValue] = useState<number>();
  const { enabled } = useEditorAction();
  const formValue = useSelector(currentFormValue);
  useEffect(() => {
    if (formula && !enabled) setInputValue(eval(formula[1]));
  }, [formula, enabled, formValue]);
  const onChange = (value: number): void => {
    if (precision !== undefined) {
      const mul = Math.pow(10, precision);
      value = mul === 0 ? Math.round(value) : Math.round(value * mul) / mul;
    }
    setValue(value);
    setInputValue(value);
  };
  const onInput = (value: string): void => {
    setInputValue(parseFloat((inputValue || 0) + value));
  };
  const onClear = () => {
    setInputValue(undefined);
  };
  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        <>
          <VirtualInput
            placeholder={placeholder}
            value={inputValue?.toString()}
            disabled={readOnly}
            onClear={onClear}
            keyboard={
              <NumberKeyboard
                confirmText={t("common.ok")}
                customKey={"."}
                onInput={onInput}
                onConfirm={() => {
                  onChange(inputValue);
                }}
              />
            }
            clearable
          />
        </>
      ) : (
        <InputNumberPC
          placeholder={placeholder}
          style={{ width: "100%" }}
          value={inputValue}
          readOnly={readOnly}
          onChange={e => {
            onChange(e);
          }}
        />
      )}
      {upperCase ? <UpperCaseComponent num={inputValue} /> : ""}
    </FormWidgetContainer>
  );
};
export default Component;
