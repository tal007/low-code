/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-03-31 11:00:01
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-25 18:00:17
 * @Description: OA审批管理后台
 */

import { Form, message } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Flow } from "./Flow";
import { Basic } from "./Basic/index";
import Editor from "@/page/Editor";
import { HighSetting } from "./High";
import { useParams } from "react-router-dom";
import { OAHeader } from "./Header";
import { useInitData } from "./useInitData";
import { useSaveData } from "./useSaveData";
import { useUrlQueryParams } from "@/hooks/useUrlQueryParams";
import { useDispatch } from "react-redux";
import {
  currentFlowActions,
  initialState as flowInitialState,
} from "@/store/flow.slice";
import { currentEditorConfigActions } from "@/store/editor.slice";

const OAContainer = styled.section`
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
`;

const Content = styled.div`
  height: calc(100% - 54px);
  overflow: hidden;
`;

export const OA = () => {
  const [params, setParams] = useUrlQueryParams(["tab"]);
  const [activeTab, setActiveTab] = useState(Number(params.tab || 0));
  const [formTitle, setFormTitle] = useState("");
  const { processId } = useParams();
  const { t } = useTranslation();
  // 初始数据请求
  const [form] = Form.useForm();
  useInitData(form);

  //保存
  const { refetch, isFetching, success } = useSaveData("save");

  useEffect(() => {
    setParams({ tab: activeTab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // 离开页面初始化流程数据
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(currentFlowActions.initFlow({ data: flowInitialState.json }));
      dispatch(currentEditorConfigActions.initialBasicFormValue());
    };
  }, [dispatch]);

  function basicSave() {
    if (activeTab === 0) {
      refetch();
    } else {
      if (processId) {
        refetch();
      } else {
        message.error(t("saveBasicFirst", { ns: "tip" }));
      }
    }
  }
  return (
    <OAContainer className="oa">
      <OAHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        submit={basicSave}
        form={form}
        isFetching={isFetching}
        success={success}
        formTitle={formTitle}
      ></OAHeader>
      <Content>
        {activeTab === 0 && <Basic form={form} setFormTitle={setFormTitle} />}
        {activeTab === 1 && <Editor />}
        {activeTab === 2 && <Flow />}
        {activeTab === 3 && <HighSetting />}
      </Content>
    </OAContainer>
  );
};

export default OA;
