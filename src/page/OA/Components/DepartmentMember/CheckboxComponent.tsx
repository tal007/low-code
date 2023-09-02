/*
 * @Date: 2023-05-17 16:12:10
 * @LastEditTime: 2023-05-22 14:05:22
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 树形组件
 */
import { useState, useEffect } from "react";
import { Input, Checkbox, Space } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { CheckboxComponentProps } from "./index.d";

const CheckboxComponentContainer = styled.div`
  padding: 20px;
  .checkAll {
  }
  .checkList {
    display: block;
  }
  /* .list {
    margin-top: 10px;
  } */
  .listLabel {
    margin-left: 6px;
  }
`;

const CheckboxComponent = (props: CheckboxComponentProps) => {
  const { type, options, title, onCheck, search = false } = props;
  const { t } = useTranslation();
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkedValue, setCheckedValue] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  useEffect(() => {
    const checkedOptions = options
      .filter(item => item.checked)
      .map(item => item.id);
    const checkCount = checkedOptions.length;
    const total = options.length;
    setCheckedValue(checkedOptions);
    setIndeterminate(!!checkCount && checkCount < total);
    setCheckAll(checkCount === total);
  }, [options]);
  // 全选
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const checkedList = checked ? options : [];
    const checkedValue = checkedList.map(item => item.id);
    setCheckedValue(checkedValue);
    setIndeterminate(false);
    setCheckAll(checked);
    onCheck(checkedValue, type);
  };
  // 选择某一行
  const onChange = (list: (string | number)[]) => {
    setCheckedValue(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    onCheck(list, type);
  };
  return (
    <CheckboxComponentContainer>
      {search && (
        <Input
          className="mrg-b"
          prefix={<SearchOutlined />}
          placeholder={t("common.searchPlaceHolder", {
            ns: "flowPath",
            name: title,
          })}
        />
      )}

      <p>{title}</p>
      <Checkbox
        className="checkAll"
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        全选
      </Checkbox>
      <Checkbox.Group
        className="checkList"
        name={type}
        value={checkedValue}
        onChange={onChange}
      >
        <Space direction="vertical">
          {options.map(item => {
            return (
              <Checkbox value={item.id} key={item.id + "-checkbox"}>
                <UserOutlined />
                <label className="listLabel">{item.name}</label>
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    </CheckboxComponentContainer>
  );
};
export default CheckboxComponent;
