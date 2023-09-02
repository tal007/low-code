/*
 * @Date: 2022-10-10 17:56:50
 * @LastEditTime: 2023-05-04 11:45:45
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 编辑器工具栏
 */

import { Input, Button, Tooltip, message, Modal, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import copy from "copy-to-clipboard";
import cx from "classnames";
import { useEditorAction } from "@/EditorWidgets/hooks";
import { useDispatch, useSelector } from "react-redux";
import { currentUIStateActions } from "@/store/useMobileUI.slice";
import storage from "@/utils/storage";
import { Select } from "antd";
import { languageMap } from "@/constant";
import { currentLanguage, currentLanguageAction } from "@/store/language.slice";

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 20px;
  background-color: #fafafb;

  transition: all 0.1s linear;

  &.visible {
    height: 32px;
    opacity: 1;
  }

  &.hidden {
    height: 0;
    opacity: 0;
  }
`;

export const Toolbar = () => {
  const { actions, query, enabled, canUndo, canRedo } = useEditorAction();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const copyState = () => {
    let json = query.serialize();
    const LZUTF8 = (window as any).LZUTF8;
    json = LZUTF8.encodeBase64(LZUTF8.compress(json));
    copy(json);
    message.success(t("copyAndPaste.copySuccess"));
    return json;
  };

  const [pasteModalVisible, setPasteModalVisible] = useState(false);
  const [stateToLoad, setStateToLoad] = useState("");
  const pasteState = () => {
    if (stateToLoad) {
      const LZUTF8 = (window as any).LZUTF8;
      const json = LZUTF8.decompress(LZUTF8.decodeBase64(stateToLoad));
      actions.deserialize(json);
      setPasteModalVisible(false);
    } else {
      message.error(t("copyAndPaste.loadStateTip"));
    }
  };

  const sessionPlatform = storage.getSession("platform");
  const [platform, setPlatform] = useState(sessionPlatform || "desktop");
  const changeViewPlatform = (v: string) => {
    storage.setSession("platform", v);
    setPlatform(v);
    dispatch(currentUIStateActions.setUseMobileUI(v === "mobile"));
  };

  const lang = useSelector(currentLanguage);

  return (
    <ToolbarContainer
      className={cx([
        {
          visible: enabled,
          hidden: !enabled,
        },
      ])}
    >
      <Space>
        <Tooltip title={t("common.back")}>
          <Button
            type={"text"}
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
            icon={<FontAwesomeIcon icon={"undo"} />}
          ></Button>
        </Tooltip>
        <Tooltip title={t("common.forward")}>
          <Button
            type={"text"}
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
            icon={<FontAwesomeIcon icon={"redo"} />}
          ></Button>
        </Tooltip>
      </Space>
      <Space>
        <Select
          options={Object.entries(languageMap).map(([key, value]) => ({
            label: value.label,
            value: key,
          }))}
          bordered={false}
          defaultValue={lang.lang}
          onChange={e => {
            dispatch(currentLanguageAction.setLanguage(e));
          }}
        ></Select>
        <Tooltip title={t("common.PCView")}>
          <Button
            type={"text"}
            onClick={() => changeViewPlatform("desktop")}
            icon={
              <FontAwesomeIcon
                icon={"desktop"}
                color={platform === "desktop" ? "var(--colorPrimary)" : ""}
              />
            }
          />
        </Tooltip>
        <Tooltip title={t("common.mobileView")}>
          <Button
            type={"text"}
            onClick={() => changeViewPlatform("mobile")}
            icon={
              <FontAwesomeIcon
                icon={"mobile"}
                color={platform === "mobile" ? "var(--colorPrimary)" : ""}
              />
            }
          />
        </Tooltip>
        <Tooltip title={t("common.copy")}>
          <Button
            type={"text"}
            onClick={copyState}
            icon={<FontAwesomeIcon icon={"copy"} />}
          />
        </Tooltip>
        <Tooltip title={t("common.paste")}>
          <Button
            type={"text"}
            onClick={() => setPasteModalVisible(true)}
            icon={<FontAwesomeIcon icon={"paste"} />}
          />
        </Tooltip>
      </Space>
      <Modal
        title={t("copyAndPaste.modalTitle")}
        open={pasteModalVisible}
        onOk={pasteState}
        onCancel={() => setPasteModalVisible(false)}
        okText={t("common.ok")}
        cancelText={t("common.cancel")}
      >
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 18 }}
          allowClear
          onChange={e => setStateToLoad(e.target.value.trim())}
        />
      </Modal>
    </ToolbarContainer>
  );
};
