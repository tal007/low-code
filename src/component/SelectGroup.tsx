/*
 * @Date: 2023-05-19 15:01:42
 * @LastEditTime: 2023-05-22 10:01:33
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 封装Select组件，实现label文字翻译
 */
import { useMemo } from "react";
import { Select, SelectProps } from "antd";
import { Enum } from "@/SettingPanelSchema/Select";
import { useTranslation } from "react-i18next";

interface SelectComponentProps extends Omit<SelectProps, "options"> {
  options: Omit<Enum, "label">[];
  ns?: string;
  className?: string;
}

const SelectGroup = (props: SelectComponentProps) => {
  const { options, ns } = props;
  const SelectProps = { ...props };
  delete SelectProps.options;
  const { t } = useTranslation();
  const OptionRender = useMemo(() => {
    return (
      <>
        {options.map(item => {
          return (
            <Select.Option
              value={item.value}
              key={item.value}
              disabled={item.disabled}
            >
              {!ns ? t.apply(null, [...item.label]) : t(item.label, { ns: ns })}
            </Select.Option>
          );
        })}
      </>
    );
  }, [options, ns, t]);

  return <Select {...SelectProps}>{OptionRender}</Select>;
};
export default SelectGroup;
