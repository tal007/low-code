/*
 * @Date: 2022-12-26 15:46:26
 * @LastEditTime: 2023-01-11 16:38:38
 * @LastEditors: 刘玉田
 * @Description: 数据请求配置
 */

import { merge } from "lodash";

export interface RequestHeaderProps {
  open: boolean;
  configs: { label: string; value: string }[];
}

export type METHOD = "GET" | "HEAD" | "PATCH" | "POST" | "PUT";
export type DataType = "json" | "formData" | "form";
export interface Query {
  method: METHOD;
  url: string;
  condition: string;
  dataType: DataType;
  cache: boolean;
  cacheTime: number;
  fileDownload: boolean;
  dataReplace: boolean;
  requestHeader: RequestHeaderProps;
  requestSuccess: string;
  requestFailure: string;
}

export const setQueryConfig = (config?: Partial<Query>) => {
  return merge(
    {
      method: "GET",
      dataType: "json",
      cacheTime: 3600,
      requestHeader: {
        open: false,
        configs: [],
      },
    },
    config
  );
};
