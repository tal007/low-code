/*
 * @Date: 2022-11-03 09:01:36
 * @LastEditTime: 2023-05-04 10:31:06
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 事件选择modal
 */

import { Modal, ModalProps, Tabs, Form } from "antd";
import { useTranslation } from "react-i18next";
import { tabItems } from "./tabItems";
import { useState, cloneElement, useEffect, ReactElement } from "react";
import { message } from "antd";

export interface CbValues {
  actionType: string;
  formData: any;
  highSetting: any;
}

export interface EventTypeModalProps extends ModalProps {
  getCbValue: (value: CbValues) => void;
  defaultFormValue: any;
  tabType: string;
}

export const EventTypeModal = (props: EventTypeModalProps) => {
  const { open, onOk, onCancel, getCbValue, defaultFormValue, tabType } = props;

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [actionType, setActionType] = useState("jump");

  const checkFormData = async (success: () => void) => {
    try {
      await form.validateFields();
      console.log("Success");
      success();
    } catch (errorInfo) {
      console.log("error", errorInfo);
    }
  };

  const makeSure = e => {
    const formData = form.getFieldsValue();
    console.log(formData);
    if (actionType === "ajax") {
      if (formData.queryApi === "") {
        message.error(`${t("common.pleaseInput")}${t("event.ajaxUrl")}`);
        return;
      }
    }

    if (actionType === "refresh" || actionType === "back") {
      onOk && onOk(e);
      getCbValue({
        actionType,
        formData: {},
        highSetting: null,
      });
    } else {
      checkFormData(() => {
        onOk && onOk(e);
        getCbValue({
          actionType,
          formData: form.getFieldsValue(),
          highSetting: null,
        });
        form.resetFields();
      });
    }
  };

  useEffect(() => {
    setActionType(tabType);
  }, [tabType]);

  return (
    <Modal
      width="60%"
      title={t("event.actionConfig")}
      open={open}
      onOk={makeSure}
      onCancel={e => {
        form.resetFields();
        onCancel(e);
      }}
      okText={t("common.ok")}
      cancelText={t("common.cancel")}
      destroyOnClose
    >
      <Tabs
        defaultActiveKey={tabType}
        tabPosition={"left"}
        style={{ height: 500 }}
        items={tabItems.map(item => ({
          ...item,
          label: typeof item.label === "string" ? t(item.label) : item.label,
          children: cloneElement(item.children as ReactElement, {
            form,
            defaultFormValue,
          }),
        }))}
        onChange={(value: string) => {
          setActionType(value);
        }}
        destroyInactiveTabPane
      />
    </Modal>
  );
};
