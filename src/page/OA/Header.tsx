import { LeftOutlined } from "@ant-design/icons";
import { Modal, Button, Space, FormInstance } from "antd";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { tabMenu, indexMap } from "./constant";
import { useSaveData } from "./useSaveData";
import { currentEditorConfig } from "@/store/editor.slice";
import { useSelector } from "react-redux";
import { useCheckEditorIsValid } from "./helper";

export const OAHeader = ({
  activeTab,
  setActiveTab,
  submit,
  form,
  isFetching,
  success,
  formTitle,
}: {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  submit: () => void;
  form: FormInstance<any>;
  isFetching: boolean;
  success: boolean;
  formTitle: string;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLeaveSave, setIsLeaveSave] = useState(false);

  const trans = useCallback(
    (string: string) => {
      return t(string, { ns: "tip" });
    },
    [t]
  );

  const handlePreview = () => {
    navigate("/editor-view");
  };

  const [open, setOpen] = useState(false);

  const goBack = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (success && isLeaveSave) {
      navigate("/");
    }
  }, [navigate, success, isLeaveSave]);

  const canPublish = useCheckEditorIsValid();
  const { refetch, isFetching: publishIsFetching } = useSaveData("publish");
  const publish = () => {
    if (!canPublish()) {
      refetch();
    }
  };

  return (
    <OAHeaderContainer className="oa-header">
      <div className="back">
        {/* <Button
          type={"text"}
          icon={<LeftOutlined size={60} />}
          onClick={goBack}
        >
          {formTitle || form.getFieldValue("processName")}
        </Button> */}
      </div>
      <nav className="tabs">
        {tabMenu.map((v, i) => (
          <div
            className={`tab ${i === activeTab ? "active" : null}`}
            onClick={() => setActiveTab(i)}
            key={v}
          >
            <span className="num">{indexMap[i]}</span>
            <span className="text">{v}</span>
          </div>
        ))}
      </nav>
      <div className="publish">
        <Space>
          {activeTab === 1 && (
            <Button type="primary" onClick={handlePreview}>
              {t("preview", { ns: "common" })}
            </Button>
          )}
          <Button className="saveBtn" onClick={submit} disabled={isFetching}>
            {t("save", { ns: "common" })}
          </Button>
          {activeTab === 2 && (
            <Button
              type="primary"
              onClick={publish}
              disabled={publishIsFetching}
            >
              {t("publish", { ns: "common" })}
              {t("flow", { ns: "common" })}
            </Button>
          )}
        </Space>
      </div>
      <Modal
        open={open}
        title={trans("tip")}
        destroyOnClose
        closable
        okButtonProps={{ disabled: isFetching }}
        onCancel={() => setOpen(false)}
        footer={
          <Space>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              {trans("notSave")}
            </Button>
            <Button
              onClick={() => {
                setIsLeaveSave(true);
                submit();
              }}
              type={"primary"}
            >
              {trans("saveAndLeave")}
            </Button>
          </Space>
        }
      >
        {trans("willLeave")}
      </Modal>
    </OAHeaderContainer>
  );
};

const OAHeaderContainer = styled.header`
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: row;
  height: 54px;
  line-height: 54px;
  background-color: #fff;

  .back,
  .publish {
    padding: 0 20px;
    flex: 1;
    .saveBtn {
      color: #1677ff;
      border-color: #1677ff;
    }
  }

  .publish {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .tabs {
    width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;

    .tab {
      font-size: 14px;
      padding: 0 10px;
      margin: 0 10px;
      cursor: pointer;
      vertical-align: middle;
      F .num,
      .text {
        vertical-align: middle;
      }
      .num {
        margin-right: 10px;
      }

      &.active {
        color: #1677ff;
      }
    }
  }
`;
