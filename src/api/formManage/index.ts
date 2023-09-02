/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-17 09:48:17
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-25 16:59:52
 * @Description: 表单列表分组接口
 */
import { useAjax } from "@/hooks/useAjax";
import { BPMS } from "../prefix";
import { ProcessBinarySaveParams } from "./index.d";

// 流程方案分组开始
export const useQueryAllGroup = () => {
  const client = useAjax();
  return () => client(BPMS + "/flowSolutionGroup/all");
};

export const useAddGroup = () => {
  const client = useAjax();
  return (name: string) =>
    client(BPMS + "/flowSolutionGroup/add", {
      method: "post",
      data: { name },
    });
};

export const useUpdateGroup = () => {
  const client = useAjax();
  return (id: string, name: string) =>
    client(BPMS + "/flowSolutionGroup/update", {
      method: "post",
      data: { id, name },
    });
};

export const useDeleteGroupById = () => {
  const client = useAjax();
  return (id: string) => {
    const params = new URLSearchParams();
    params.append("id", id);
    return client(BPMS + "/flowSolutionGroup/deleteById", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params,
    });
  };
};

export const useQueryAllFlowSolution = () => {
  const client = useAjax();
  return (params: object) => {
    return client(BPMS + "/flowSolution/page", {
      data: params,
    });
  };
};
// 流程方案分组结束
// 流程方案开始
export const useDeleteFlowSolutionById = () => {
  const client = useAjax();
  return (id: string) => {
    return client(BPMS + "/flowSolution/deleteById", {
      data: { id },
    });
  };
};

export const useQuerySolutionById = () => {
  const client = useAjax();
  return (id: string) =>
    client(BPMS + "/flowSolution/getSolutionById", {
      data: { id },
    });
};

export const useSaveSolutionBasic = () => {
  const client = useAjax();
  return (data: object) =>
    client(BPMS + "/flowSolution/add", {
      method: "post",
      data,
    });
};
export const useUpdateSolutionBasic = () => {
  const client = useAjax();
  return (data: object) =>
    client(BPMS + "/flowSolution/update", {
      method: "post",
      data,
    });
};

export const useStartOrStopSolution = () => {
  const client = useAjax();
  return (id: string, state: "true" | "false") => {
    const data = new URLSearchParams();
    data.append("id", id);
    data.append("state", state);
    return client(BPMS + "/flowSolution/startOrStopSolution", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
  };
};

export const useMoveFlowSolution = () => {
  const client = useAjax();
  return (processId: string, groupId: string) => {
    const data = new URLSearchParams();
    data.append("id", processId);
    data.append("groupId", groupId);
    return client(BPMS + "/flowSolution/moveGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
  };
};
// 流程方案结束

// 表单设置开始
export const useFormSettingSave = () => {
  const client = useAjax();
  return (processId: string, structureJson: string) => {
    return client(BPMS + "/form/setting/save", {
      method: "post",
      data: {
        processId,
        structureJson,
      },
    });
  };
};

export const useQueryFormSettingById = () => {
  const client = useAjax();
  return (processId: string) =>
    client(BPMS + "/form/setting/getByProcessId", {
      data: { processId },
    });
};
// 表单结束开始

// 流程设计开始
export const useProcessBinarySave = () => {
  const client = useAjax();
  return (data: ProcessBinarySaveParams) => {
    return client(BPMS + "/process/binary/save", {
      method: "POST",
      data,
    });
  };
};

export const useQueryProcessBinaryId = () => {
  const client = useAjax();
  return (processId: string) => {
    return client(BPMS + "/process/binary/getById", {
      data: { processId },
    });
  };
};

export const useRemoveProcessBinaryId = () => {
  const client = useAjax();
  return (processId: string) => {
    const params = new URLSearchParams();
    params.append("processId", processId);
    return client(BPMS + "/process/binary/deleteById", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params,
    });
  };
};

// 流程设计结束

// 流程保存开始
export const useSaveFlow = () => {
  const client = useAjax();
  return <T, P, K>(data: {
    flowSolution: T; // 流程信息
    processBinary: P; // 基本信息
    formSetting: K; // 表单信息
  }) => {
    return client(BPMS + "/common/flow/save", {
      method: "post",
      data: data,
    });
  };
};

// 流程保存结束

// 流程发布开始
export const usePublishFlow = () => {
  const client = useAjax();
  return <T, P, K>(data: {
    flowSolution: T; // 流程信息
    processBinary: P; // 基本信息
    formSetting: K; // 表单信息
  }) => {
    return client(BPMS + "/common/flow/publish", {
      method: "post",
      data: data,
    });
  };
};
// 流程发布结束
