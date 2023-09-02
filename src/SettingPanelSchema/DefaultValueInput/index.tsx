/*
 * @Date: 2023-05-04 17:12:33
 * @LastEditTime: 2023-05-10 12:06:12
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 自动计算公式设置弹框
 */
import { useState, ChangeEvent } from "react";
import { Input, RadioChangeEvent } from "antd";
import { SchemaProps, DefaultValueProps } from "./index.d";
import { SchemaItem } from "../SchemaItem";
import { setValue } from "../helper";
import styled from "styled-components";
import { FormulaButton } from "../FormulaModal";
import { RadioGroup } from "../RadioGroup";
import { useTranslation } from "react-i18next";
import { radioOptions } from "./constant";

const RadioGroupContainer = styled.div`
  .radioGroup {
    margin-bottom: 10px;
    white-space: nowrap;
  }
  .noSupportTip {
    color: #888;
  }
`;
export const DefaultValueInput = (props: DefaultValueProps) => {
  const { t } = useTranslation();
  const { setProp, propName, defaultValue } = props;
  const [selectValue, setSelectValue] = useState<string>(defaultValue[0]);
  const [inputValue, setInputValue] = useState<string>(defaultValue[1]);
  const setPropValue = (selectValue: string, inputValue: string) => {
    setProp(props => {
      setValue(props, propName, selectValue, 0);
      setValue(props, propName, inputValue, 1);
    }, 500);
  };
  // 单选框切换
  const onChange = (e: RadioChangeEvent) => {
    const selectValue = e.target.value;
    setSelectValue(selectValue);
    setInputValue("");
    setPropValue(selectValue, "");
  };
  // 输入框内容变化
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    setPropValue(selectValue, value);
  };
  return (
    <RadioGroupContainer>
      <RadioGroup
        className="radioGroup"
        mapData={radioOptions}
        onChange={onChange}
        defaultValue={selectValue}
        optionType="default"
        paddingLeft="0"
        paddingRight="0"
      />
      {selectValue === "custom" && (
        <Input
          placeholder={t("common.pleaseInput")}
          onChange={inputChange}
          value={inputValue}
        />
      )}
      {selectValue === "dataLink" && (
        <span className="noSupportTip">{t("antdPropDesc.noSupport")}</span>
      )}
      {selectValue === "formula" && <FormulaButton {...props} />}
    </RadioGroupContainer>
  );
};

export const DefaultValueInputSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <DefaultValueInput {...childProps} />
    </SchemaItem>
  );
};
