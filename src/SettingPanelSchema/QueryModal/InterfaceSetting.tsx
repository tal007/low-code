/*
 * @Date: 2022-12-26 14:37:46
 * @LastEditTime: 2023-01-11 14:45:12
 * @LastEditors: 刘玉田
 * @Description: 接口设置
 */
import { QueryModalProps } from ".";
import {
  ProFormText,
  ProFormRadio,
  ProFormSwitch,
  ProFormDigit,
} from "@ant-design/pro-components";
import { useState } from "react";

const sendMethods = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

const dataType = [
  { label: "JSON", value: "json" },
  { label: "FormData", value: "formData" },
  { label: "Form", value: "form" },
];

export interface InterfaceSettingProps {
  formData: QueryModalProps["defaultValue"];
}

export const InterfaceSetting = (props: InterfaceSettingProps) => {
  const { t } = useTranslation();
  const { formData } = props;

  const [openCache, setOpenCache] = useState(formData.cache);
  const [currentDataType, setCurrentDataType] = useState(formData.dataType);

  return (
    <>
      <ProFormRadio.Group
        name={"method"}
        label={t("querySetting.queryMethod")}
        options={sendMethods}
        radioType="button"
      />
      <ProFormText
        name={"url"}
        label={t("querySetting.queryUrl")}
        required={true}
        rules={[{ required: true }]}
        placeholder={"HTTP(S)://"}
      ></ProFormText>
      <ProFormText
        name={"condition"}
        label={t("querySetting.sendCondition")}
        extra={t("querySetting.sendConditionTip")}
      ></ProFormText>
      <ProFormRadio.Group
        name={"dataType"}
        label={t("querySetting.dataType")}
        options={dataType}
        radioType="button"
        fieldProps={{
          onChange(e) {
            setCurrentDataType(e.target.value);
          },
        }}
        extra={t(`querySetting.dataTypeTip.${currentDataType}`)}
      />
      <ProFormSwitch
        name={"cache"}
        label={t("querySetting.cache")}
        fieldProps={{
          onChange(value) {
            setOpenCache(value);
          },
        }}
      ></ProFormSwitch>
      {openCache && (
        <ProFormDigit
          name={"cacheTime"}
          label={t("querySetting.cacheTime")}
          extra={t("querySetting.cacheTimeTip")}
        ></ProFormDigit>
      )}
      <ProFormSwitch
        name={"fileDownload"}
        label={t("querySetting.fileDownload")}
        extra={t("querySetting.fileDownloadTip")}
      ></ProFormSwitch>
      <ProFormSwitch
        name={"dataReplace"}
        label={t("querySetting.dataReplace")}
        extra={t("querySetting.dataReplaceTip")}
      ></ProFormSwitch>
    </>
  );
};
