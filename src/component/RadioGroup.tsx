/*
 * @Date: 2023-05-19 09:27:42
 * @LastEditTime: 2023-05-19 17:11:23
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 封装单选框组件，实现label文字翻译
 */
import { useMemo } from "react";
import { Radio, RadioGroupProps, Space } from "antd";
import { Enum } from "@/SettingPanelSchema/Select";
import { useTranslation } from "react-i18next";

interface RadioGroupComponentProps extends Omit<RadioGroupProps, "options"> {
  options: Omit<Enum, "label">[];
  ns?: string;
  className?: string;
  direction?: "vertical" | "horizontal";
}

const RadioGroup = (props: RadioGroupComponentProps) => {
  const {
    options,
    ns,
    value,
    onChange,
    optionType,
    buttonStyle,
    defaultValue,
    disabled,
    className,
    direction,
  } = props;
  const { t } = useTranslation();
  const RadioRender = useMemo(() => {
    return (
      <>
        {options.map(item => {
          return (
            <Radio
              value={item.value}
              key={item.value}
              disabled={item.disabled || false}
            >
              {!ns ? t.apply(null, [...item.label]) : t(item.label, { ns: ns })}
            </Radio>
          );
        })}
      </>
    );
  }, [options, ns, t]);

  return (
    <Radio.Group
      className={className}
      buttonStyle={buttonStyle || "solid"}
      optionType={optionType || "button"}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled || false}
      onChange={onChange}
    >
      {direction === "vertical" ? (
        <Space direction={direction}>{RadioRender}</Space>
      ) : (
        RadioRender
      )}
    </Radio.Group>
  );
};
export default RadioGroup;
