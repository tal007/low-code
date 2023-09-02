/*
 * @Date: 2022-12-26 15:19:58
 * @LastEditTime: 2022-12-28 16:08:21
 * @LastEditors: 刘玉田
 * @Description: HTTP设置
 */

import {
  ProFormInstance,
  ProFormSwitch,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Space } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import update from "immutability-helper";
import { RequestHeaderProps } from "../settingRender/querySetting";
import styled from "styled-components";

const headerMap = [
  { label: "Content-Encoding", value: "Content-Encoding" },
  { label: "Content-Type", value: "Content-Type" },
];

export interface HTTPSettingProps {
  formRef:
    | React.MutableRefObject<ProFormInstance<any>>
    | React.RefObject<ProFormInstance<any>>;
}

export const HTTPSetting = (props: HTTPSettingProps) => {
  const { formRef } = props;
  const requestHeaderValues: RequestHeaderProps =
    formRef.current.getFieldValue("requestHeader");
  const { t } = useTranslation();
  const [headerConfig, setHeaderConfig] = useState<
    { label: string; value: string }[]
  >(requestHeaderValues.configs || []);
  const [requestHeader, setRequestHeader] = useState(requestHeaderValues.open);

  const createNew = () => {
    setHeaderConfig(
      update(headerConfig, {
        $push: [{ label: "", value: "" }],
      })
    );
  };

  const removeConfig = (index: number) => {
    setHeaderConfig(update(headerConfig, { $splice: [[index, 1]] }));
  };

  return (
    <>
      <ProFormSwitch
        name={["requestHeader", "open"]}
        label={t("querySetting.requestHeader")}
        fieldProps={{
          onChange: checked => {
            setRequestHeader(checked);
          },
        }}
      ></ProFormSwitch>
      <Space
        hidden={!requestHeader}
        direction={"vertical"}
        style={{ marginLeft: 124 }}
      >
        <Space direction={"vertical"}>
          {headerConfig.map((config, index) => {
            return (
              <SpaceContainer key={index}>
                <ProFormSelect
                  style={{ width: 200 }}
                  name={["requestHeader", "configs", index, "label"]}
                  options={headerMap}
                ></ProFormSelect>
                <ProFormText
                  name={["requestHeader", "configs", index, "value"]}
                />
                <CloseCircleFilled
                  className="cursor-pointer"
                  onClick={() => removeConfig(index)}
                />
              </SpaceContainer>
            );
          })}
        </Space>
        {headerConfig.length < 2 && (
          <Button onClick={createNew}>
            <PlusOutlined />
          </Button>
        )}
      </Space>
    </>
  );
};

const SpaceContainer = styled(Space)`
  .ant-form-item {
    margin-bottom: 0;
  }
`;
