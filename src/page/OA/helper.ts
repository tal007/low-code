import { currentEditorConfig } from "@/store/editor.slice";
import { NodeData } from "@craftjs/core";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { omit } from "lodash";

export const useCheckEditorIsValid = () => {
  const currentEditorState = useSelector(currentEditorConfig);
  const { processName, groupId } = currentEditorState.basicFormValue;
  const nodes: Record<string, NodeData> = Object.keys(currentEditorState.nodes)
    .length
    ? JSON.parse(`${currentEditorState.nodes}`)
    : {};
  const keys = Object.keys(nodes);

  let result = 0;

  if (keys.length === 1) {
    result = 1;
    return () => {
      notification.error({
        message: "表单设计不能为空",
        placement: "topLeft",
      });
      return result;
    };
  }

  for (const element of keys) {
    const nodeData = nodes[element];
    if (nodeData.displayName === "Grid") {
      if (nodeData.nodes.length === 1) {
        result = 2;
        break;
      }
    }
  }

  return () => {
    if (!processName.trim() || !groupId.trim()) {
      notification.error({
        message: "表单基础信息不能为空",
        placement: "topLeft",
      });
      return 3;
    }

    if (result === 2) {
      notification.error({
        message: "分栏组件必须包含子组件",
        placement: "topLeft",
      });
    }
    return result;
  };
};

const mappingField = [
  "level",
  "delegate",
  "chooseType",
  "chooseRange",
  "chooseRangeApprovers",
  "approvers",
  "relationKey",
];

const formOperateAuthsMap = {
  editable: 1,
  readOnly: 2,
  hide: 3,
};

/**
 * @author 梁强
 * @date 2023-05-26 星期五
 * @function 组装审批人提交数据
 * @param {}
 * @return {}
 */
export const assemblyData = (res: any) => {
  const result: any = res;
  const formOperateAuths = [];
  Object.entries(res).forEach(([key, value]: any) => {
    const auth = key.indexOf("_");
    if (mappingField.includes(key) && !auth) {
      if (result?.settings) {
        result["settings"][key] = value;
      } else {
        result.settings = {};
        result["settings"][key] = value;
      }
    }
    if (auth > 0) {
      const node = key?.split("_");
      formOperateAuths.push({
        moduleKey: node[1],
        moduleName: node[2],
        type: formOperateAuthsMap[value],
      });
      delete result[key];
    }
  });

  result["formOperateAuths"] = formOperateAuths;

  return omit(result, mappingField);
};
