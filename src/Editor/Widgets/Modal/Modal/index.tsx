/*
 * @Date: 2023-01-16 15:47:50
 * @LastEditTime: 2023-05-04 11:02:05
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: Modal 对话框
 */

import { displayName } from "@/i18n/widgetDisplayName";
import { Element, useNode } from "@craftjs/core";
import { Button, Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { ModalSetting } from "./ModalSetting";
import { CraftContainer } from "./../../Common/CraftContainer/index";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { useState, useEffect } from "react";
import { Root } from "../../Container/Root";
import { useEditorAction } from "../../hooks";
import { useDispatch } from "react-redux";
import { currentModalsActions } from "@/store/modal.slice";

export interface ModalProps extends AntdModalProps {
  height: string;
  showTitle: boolean;
}

const NAME = "Modal";
const widgetName = displayName(NAME);
const defaultProps = {
  ...setCommonDefaults(),
  width: "60%",
  height: "auto",
  showTitle: true,
  okText: "确定",
  cancelText: "取消",
  footer: true,
};

export const ModalRenderView = (props: Partial<ModalProps>) => {
  const { t } = useTranslation();
  const {
    children,
    width,
    height,
    showTitle,
    title,
    footer,
    okText,
    cancelText,
  } = props;
  const { enabled } = useEditorAction();
  const { id, store } = useNode();
  const nodeData = store.query.getNodes()[id].data;
  const name = nodeData?.custom?.displayName || nodeData?.displayName;
  const [modalOpen, setModalOpen] = useState(enabled);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentModalsActions.addModal({ id, cb: openModal }));
    return () => {
      dispatch(currentModalsActions.removeModal(id));
    };
  }, [dispatch, id]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <CraftContainer>
      {enabled && (
        <Button onClick={openModal} block type={"primary"}>
          {t("common.config")}
          {name}({t("common.showOnlyEdit")})
        </Button>
      )}
      <AntdModal
        open={modalOpen}
        onCancel={closeModal}
        onOk={closeModal}
        getContainer={".editor-render-page"}
        title={showTitle ? title || name : null}
        width={width}
        bodyStyle={{ height, overflow: "auto" }}
        cancelText={cancelText}
        okText={okText}
        footer={
          footer ? (
            <>
              <Button onClick={closeModal}>{cancelText}</Button>
              <Button onClick={closeModal} type={"primary"}>
                {okText}
              </Button>
            </>
          ) : null
        }
      >
        <Element
          id={id}
          canvas
          is={Root}
          custom={{ displayName: displayName("Root") }}
        >
          {children}
        </Element>
      </AntdModal>
    </CraftContainer>
  );
};

ModalRenderView.craft = {
  displayName: NAME,
  props: defaultProps,
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: ModalSetting,
  },
  custom: { displayName: widgetName, tags: ["modal"] },
};

export const Modal: CommonButtonTypes = {
  ...generateWidgetOptions(NAME, "modal"),
  icon: "qrcode",
  tags: ["modal"],
  preview: <AntdModal />,
  render: <Element canvas is={ModalRenderView}></Element>,
};
