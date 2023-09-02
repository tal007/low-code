/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-19 15:23:43
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-25 11:22:23
 * @Description： OA 初始化数据请求
 */
import {
  useQueryFormSettingById,
  useQueryProcessBinaryId,
  useQuerySolutionById,
} from "@/api/formManage";
import { currentEditorConfigActions } from "@/store/editor.slice";
import { currentFlowActions } from "@/store/flow.slice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { FormSettingResult, ProcessResult, Solution } from "./index.d";
import { useParams } from "react-router-dom";
import { FormInstance } from "antd";

export const useInitData = (form: FormInstance<any>) => {
  const { processId } = useParams();

  // 初始数据请求
  const dispatch = useDispatch();
  const queryFormSettingClient = useQueryFormSettingById();

  const querySolutionById = useQuerySolutionById();

  useQuery<Solution>(
    ["querySolutionById", processId],
    () => querySolutionById(processId),
    {
      enabled: !!processId,
      onSuccess(data) {
        form.setFieldValue("processName", data.processName);
        form.setFieldValue("groupId", data.groupId);
        form.setFieldValue("processRemark", data.processRemark);
        dispatch(
          currentEditorConfigActions.setBasicFormValue({
            key: "processName",
            value: data.processName,
          })
        );
        dispatch(
          currentEditorConfigActions.setBasicFormValue({
            key: "groupId",
            value: data.groupId,
          })
        );
        dispatch(
          currentEditorConfigActions.setBasicFormValue({
            key: "processRemark",
            value: data.processRemark,
          })
        );
      },
    }
  );

  useQuery<FormSettingResult, Error>(
    ["query-form-setting", processId],
    () => queryFormSettingClient(processId),
    {
      enabled: !!processId,
      onSuccess(data) {
        if (data.structureJson) {
          dispatch(
            currentEditorConfigActions.setEditorState({
              nodes: data.structureJson,
            })
          );
        }
      },
    }
  );
  const queryProcessBinaryIdClient = useQueryProcessBinaryId();
  useQuery<ProcessResult, Error>(
    ["queryProcessBinaryId", processId],
    () => queryProcessBinaryIdClient(processId),
    {
      enabled: !!processId,
      onSuccess(data) {
        dispatch(
          currentFlowActions.initFlow({ data: JSON.parse(data.processData) })
        );
      },
    }
  );
};
