/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-19 15:31:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-25 17:04:05
 * @Description:
 */
import { usePublishFlow, useSaveFlow } from "@/api/formManage";
import { currentEditorConfig } from "@/store/editor.slice";
import { currentFlow } from "@/store/flow.slice";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FlowSolution, FormSetting, ProcessBinary } from "./index.d";

export const useSaveData = (key: "save" | "publish") => {
  const { processId } = useParams();
  const { t } = useTranslation();
  const saveSuccess = t("success", {
    prefix: t("save", { ns: "common" }),
    ns: "common",
  });

  const navigate = useNavigate();
  const currentEditorState = useSelector(currentEditorConfig);
  const flowState = useSelector(currentFlow);
  const flowSaveClient = useSaveFlow();
  const formPublishClient = usePublishFlow();

  const { refetch, isFetching, status } = useQuery<string, Error>(
    [`${key}-flow`, processId],
    () => {
      const data: {
        flowSolution: FlowSolution;
        processBinary: ProcessBinary;
        formSetting: FormSetting;
      } = {
        flowSolution: {
          ...currentEditorState.basicFormValue,
          processType: "0",
          processId: processId ? processId : null,
        },
        processBinary: {
          processId,
          processData: JSON.stringify(flowState.json),
        },
        formSetting: {
          processId,
          structureJson: currentEditorState.nodes,
        },
      };

      return key === "save"
        ? flowSaveClient<FlowSolution, ProcessBinary, FormSetting>(data)
        : formPublishClient<FlowSolution, ProcessBinary, FormSetting>(data);
    },
    {
      enabled: false,
      onSuccess(data) {
        message.success(saveSuccess);
        if (!processId) {
          navigate(`/oa/${data}`, {
            replace: true,
          });
        }
      },
    }
  );

  return { refetch, isFetching, success: status === "success" };
};
