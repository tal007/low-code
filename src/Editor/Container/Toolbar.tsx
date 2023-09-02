/*
 * @Date: 2022-10-10 17:56:50
 * @LastEditTime: 2023-01-04 14:03:56
 * @LastEditors: 刘玉田
 * @Description: 编辑器工具栏
 */

import { Input, Button, Tooltip, message, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import copy from "copy-to-clipboard";
import cx from "classnames";
import { useEditorAction } from "../Widgets/hooks";

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 20px;

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

  return (
    <ToolbarContainer
      className={cx([
        {
          visible: enabled,
          hidden: !enabled,
        },
      ])}
    >
      <Tooltip title={t("common.back")}>
        <Button
          type={"primary"}
          disabled={!canUndo}
          onClick={() => actions.history.undo()}
          icon={<FontAwesomeIcon icon={"undo"} />}
        ></Button>
      </Tooltip>
      <Tooltip title={t("common.forward")}>
        <Button
          type={"primary"}
          disabled={!canRedo}
          onClick={() => actions.history.redo()}
          icon={<FontAwesomeIcon icon={"redo"} />}
        ></Button>
      </Tooltip>
      <Tooltip title={t("common.copy")}>
        <Button
          type={"primary"}
          onClick={copyState}
          icon={<FontAwesomeIcon icon={"copy"} />}
        ></Button>
      </Tooltip>
      <Tooltip title={t("common.paste")}>
        <Button
          type={"primary"}
          onClick={() => setPasteModalVisible(true)}
          icon={<FontAwesomeIcon icon={"paste"} />}
        ></Button>
      </Tooltip>
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
