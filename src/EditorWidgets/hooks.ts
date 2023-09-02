/*
 * @Date: 2022-10-17 10:39:01
 * @LastEditTime: 2023-05-15 14:26:16
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: Editor 专用 hooks
 */

import { processingAjaxSubmissionData, replaceString } from "@/Editor/helper";
import { QueryConfig, useAjax } from "@/hooks/useAjax";
import { Query } from "@/SettingPanelSchema/settingRender/querySetting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useEditor } from "@craftjs/core";
import { eventTypeMap } from "@/SettingPanelSchema/EventHandler/actionTypeMap";
import { Events } from "./types";
import { useImplementActionType } from "@/SettingPanelSchema/EventHandler/useImplementActionType";
import { useNode } from "@craftjs/core";
import { nanoid } from "@/utils/helper";
import { useDispatch } from "react-redux";
import {
  currentFormValueActions,
  currentFormValue,
} from "@/store/formValue.slice";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export const useEditorAction = () => {
  const { enabled, canUndo, canRedo, actions, query, connectors } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  return {
    enabled,
    canUndo,
    canRedo,
    actions,
    query,
    connectors,
  };
};

export const useGetPropsId = () => {
  const { query } = useEditorAction();
  const {
    id,
    actions: { setProp },
  } = useNode();

  let propsId = query.getNodes()[id].data.props.id;
  if (!propsId) {
    const id = nanoid(10);
    propsId = id;
  }

  useEffect(() => {
    setProp(props => (props.id = id), 500);
  }, [id, propsId, setProp]);

  return propsId;
};

export const useFormValue = (): [
  (value: any) => void, // 设置流程提交时候的表单值 {id: value}
  (value: any, key: string) => void, // 设置流程提交时候的表单派生值 {id_XXX: value}
  string
] => {
  const dispatch = useDispatch();
  const id = useGetPropsId();

  return [
    (value: any) => dispatch(currentFormValueActions.setValue({ id, value })),
    (value: any, key: string) =>
      dispatch(currentFormValueActions.setValue({ id: `${id}_${key}`, value })),
    id,
  ];
};

export const useMarginAndPadding = (props: {
  margin: string[];
  padding: string[];
}) => {
  const { margin, padding } = props;

  const marginStyle = `${margin[0] || 0}px ${margin[1] || 0}px ${
    margin[2] || 0
  }px ${margin[3] || 0}px`;

  const paddingStyle = `${padding[0] || 0}px ${padding[1] || 0}px ${
    padding[2] || 0
  }px ${padding[3] || 0}px`;

  return {
    margin: marginStyle,
    padding: paddingStyle,
  };
};

export interface QueryData {
  [key: string]: any;
}

export interface QueryFnData<T> {
  errcode: number;
  errmsg: string;
  data: T;
}

const contentType = {
  json: "application/json",
  formData: "multipart/form-data",
  form: "application/x-www-form-urlencoded",
};

/*******
 * @description: 处理 query 配置
 * @param {Partial} apiConfig
 * @param {QueryData} queryData
 * @return {*}
 */
export const processingQueryConfig = (
  apiConfig: Partial<Query>,
  queryData: QueryData
): QueryConfig => {
  const { method, dataType, cache, cacheTime, fileDownload, requestHeader } =
    apiConfig;

  const { configs } = requestHeader;

  const queryConfig: QueryConfig = {
    method,
    data: processingAjaxSubmissionData(queryData, dataType),
  };

  const headers: QueryConfig["headers"] = {
    "Content-Type": fileDownload
      ? contentType["formData"]
      : contentType[dataType],
    "Cache-Control": cache ? `max-age=${cacheTime}` : "no-cache",
  };
  configs?.forEach(config => {
    headers[config.label] = config.value;
  });

  queryConfig.headers = headers;
  return queryConfig;
};
/*******
 * @description: 组件数据初始化的请求
 * @param {string} nodeType 组件的类型，对应组件的tags
 * @param {Partial} initApi 初始化请求的配置项
 * @param {string} nodeId 组件的 唯一 id
 * @param {QueryData} queryData 请求的数据
 * @return {*} 返回 useQuery 的返回值
 */
export const useQueryInitial = <T, K extends Error = Error>(
  nodeType: string,
  initApi: Partial<Query>,
  nodeId: string,
  queryData?: QueryData
) => {
  const { enabled, query } = useEditorAction();
  const { url, requestFailure, requestSuccess } = initApi;
  const client = useAjax();
  const replaceData = query.getNodes()[nodeId].data;
  const queryConfig = processingQueryConfig(initApi, queryData);

  const queryResult = useQuery<QueryFnData<T>, K>({
    queryKey: [nodeType || "default", nodeId, url],
    queryFn: () => client(replaceString(url, replaceData), queryConfig),
    enabled: !enabled && Boolean(url),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data.errcode === 0) {
        requestSuccess && message.success(requestSuccess);
      } else {
        message.info(`${data.errcode}: ${data.errmsg}`);
      }
    },
    onError(err) {
      message.error(requestFailure ? requestFailure : err.message);
    },
  });

  return {
    queryResult: {
      ...queryResult,
      isLoading: queryResult.isLoading && Boolean(url),
    },
    enabled,
  };
};

/*******
 * @description: useMutation 封装处理，用于手动触发事件
 * @param {string} nodeType 组件的类型，对应组件的tags
 * @param {Partial} initApi 初始化请求的配置项
 * @param {string} nodeId 组件的 唯一 id
 * @param {QueryData} queryData 请求的数据
 * @return {*} 返回 useMutation 的返回值
 */
export const useQueryMutation = <T, K extends Error = Error>(
  submitApi: Partial<Query>,
  nodeId: string,
  queryData?: QueryData
) => {
  const client = useAjax();
  const { url, requestFailure, requestSuccess } = submitApi;
  const queryConfig = processingQueryConfig(submitApi, queryData);
  const { query } = useEditorAction();
  const replaceData = query.getNodes()[nodeId].data;

  const mutation = useMutation<QueryFnData<T>, K>(
    () => {
      return client(replaceString(url, replaceData), queryConfig);
    },
    {
      onSuccess(data) {
        if (data.errcode === 0) {
          requestSuccess && message.success(requestSuccess);
        } else {
          message.info(`${data.errcode}: ${data.errmsg}`);
        }
      },
      onError(error) {
        message.error(requestFailure ? requestFailure : error.message);
      },
    }
  );

  return { mutation };
};

export const useEvents = (
  type: keyof typeof eventTypeMap,
  events: Events["onEvent"],
  customHandler?: any,
  disabled?: boolean
) => {
  const { enabled } = useEditorAction();
  const handlers = events[type];
  const implementAction = useImplementActionType();

  const handles = (e: any) => {
    enabled || disabled
      ? null
      : customHandler
      ? customHandler(e)
      : handlers.forEach(handler => implementAction(handler, e));
  };

  return handles;
};

export const useDefaultValue = (defaultValue, enabled) => {
  const formValue = useSelector(currentFormValue); // eslint-disable-line
  return useMemo(() => {
    let _defaultValue = "";
    if (defaultValue && !enabled) {
      const [defaultType, value] = defaultValue;
      _defaultValue =
        defaultType === "custom"
          ? value
          : defaultType === "dataLink"
          ? ""
          : eval(value);
    }
    return _defaultValue;
  }, [defaultValue, enabled]);
};
