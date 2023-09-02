/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-14 10:39:54
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-12 13:55:27
 * @Description: 电话号码输入
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { countryPhoneNumber } from "@/constant";
import { InputNumber, Select, Space } from "antd";
import { Input as InputMobile, Picker } from "antd-mobile";
import { useState } from "react";
import { DownOutline } from "antd-mobile-icons";
import type { PickerValue } from "antd-mobile/es/components/picker";
import { PhoneNumberProps, FiledValue, FieldProps } from "./index.d";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const MobileField: React.FC<FieldProps> = ({
  value = { preValue: "+86", realValue: "" },
  onChange,
}) => {
  const [visible, setVisible] = useState(false);
  const dom = useMobilePopupContainer();

  const triggerValue = (changedValue: Partial<FiledValue>) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onRealValueChange = (value: string) => {
    triggerValue({ realValue: value });
  };

  const onPreValueChange = (value: PickerValue[]) => {
    const v = value[0];
    if (v === null) return;
    triggerValue({ preValue: v });
  };
  return (
    <>
      <Space align="center">
        <Space align="center" onClick={() => setVisible(true)}>
          <div>{value.preValue}</div>
          <DownOutline />
        </Space>
        <InputMobile
          placeholder="请输入手机号"
          value={value.realValue}
          onChange={onRealValueChange}
        />
      </Space>
      <Picker
        columns={[countryPhoneNumber]}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={[value.preValue]}
        onConfirm={onPreValueChange}
        getContainer={dom}
      />
    </>
  );
};
const PCField: React.FC<FieldProps> = ({
  value = { preValue: "+86", realValue: "" },
  onChange,
}) => {
  const triggerValue = (changedValue: Partial<FiledValue>) => {
    onChange?.({ ...value, ...changedValue });
  };
  const onRealValueChange = (value: string) => {
    triggerValue({ realValue: value });
  };

  const onPreValueChange = (value: string) => {
    triggerValue({ preValue: value });
  };
  const prefixSelector = (
    <>
      <Select
        style={{ width: 80 }}
        dropdownMatchSelectWidth={200}
        defaultValue={value.preValue}
        optionLabelProp={"code"}
        onChange={onPreValueChange}
      >
        {countryPhoneNumber.map(v => {
          return (
            <Option key={v.label} value={v.value}>
              {v.label}
            </Option>
          );
        })}
      </Select>
    </>
  );
  return (
    <InputNumber
      addonBefore={prefixSelector}
      style={{ width: "100%" }}
      onChange={onRealValueChange}
    />
  );
};
const Component = (props: Partial<PhoneNumberProps>) => {
  const { platform, name } = props;
  const { t } = useTranslation();
  const checkRequired = (_: any, value: FiledValue) => {
    if (value && value.realValue) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(t("i18n.requiredTip", { name: name, ns: "formRules" }))
    );
  };
  return (
    <FormWidgetContainer {...props} checkRequired={checkRequired}>
      {platform === "mobile" ? <MobileField /> : <PCField />}
    </FormWidgetContainer>
  );
};

export default Component;
