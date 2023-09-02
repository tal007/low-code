/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Date: 2023-04-26 11:04:50
 * @LastEditTime: 2023-05-04 10:29:32
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { PortalProps } from "./index.d";
import { CloseOutlined } from "@ant-design/icons";
import cx from "classnames";
// import "./index.less";

export const Component = (props: PortalProps) => {
  console.log("portal");
  const { children, id, show, onClose, showCloseButton } = props;
  const dom = document.getElementById(id);
  if (!dom) return;
  const [popupClassName, setPopupClassName] = useState<string>("adm-popup");
  useEffect(() => {
    if (show) {
      setPopupClassName("adm-popup");
    } else {
      const timer = setTimeout(() => {
        setPopupClassName("adm-popup adm-hide");
        clearTimeout(timer);
      }, 501);
    }
  }, [show]);
  return ReactDom.createPortal(
    <div className={popupClassName}>
      <div
        className={cx([
          {
            "adm-mask": true,
            "adm-hide": !show,
          },
        ])}
        style={{ background: "rgba(0, 0, 0, 0.55)" }}
        onClick={onClose}
      >
        <div
          className="adm-mask-aria-button"
          role="button"
          aria-label="背景蒙层"
        ></div>
        <div className="adm-mask-content"></div>
      </div>
      <div
        className={cx([
          {
            "adm-popup-body": true,
            "adm-popup-body-position-bottom": true,
            "adm-hide": !show,
          },
        ])}
        style={{ height: "40vh" }}
      >
        {showCloseButton ? (
          <CloseOutlined className="close-icon" onClick={onClose} />
        ) : (
          ""
        )}
        <div className="adm-cascader-header">
          <a className="adm-cascader-header-button" onClick={onClose}>
            取消
          </a>
          <a className="adm-cascader-header-button" onClick={onClose}>
            确定
          </a>
        </div>
        <div className="adm-cascader-body">{children}</div>
      </div>
    </div>,
    dom
  );
};
