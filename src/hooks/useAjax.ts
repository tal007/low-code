/*
 * @Date: 2022-09-21 11:46:59
 * @LastEditTime: 2023-09-02 14:59:11
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: http请求
 */

import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { useCallback } from "react";
import { message } from "antd";
import { LOGIN_URL } from "@/api/login";
import storage from "@/utils/storage";
import { ACCESS_TOKEN } from "@/constant";

export interface AxiosResponse<T = any> {
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: AxiosRequestHeaders; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request?: any; // 请求的 XMLHttpRequest 对象实例
}

type RequestResult = {
  code: number;
  msg: string;
  data: object;
};

// const baseURL = "http://172.18.0.56:3333/mock/43";
// const baseURL = "http://172.18.0.196:9000";
const baseURL = "/api/";
export const request: AxiosInstance = Axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

request.interceptors.request.use(request => {
  const { headers, url } = request;

  // TODO 鉴权，没有token，重新登录
  const Authorization = storage.getSession(ACCESS_TOKEN);
  // if (url !== LOGIN_URL) {
  //   if (Authorization) {
  //     headers.Authorization = Authorization;
  //   } else {
  //     window.location.href = "/login";
  //   }
  // } else {
  //   headers.Authorization = "Basic dGVzdDp0ZXN0";
  // }

  return request;
});

request.interceptors.response.use(
  response => {
    const {
      status,
      config: { url },
      data,
      data: { code, msg },
    } = response;

    if (status === 200) {
      // 如果请求地址是登录，则没有code，直接返回数据
      if (url === LOGIN_URL) {
        message.success("登录成功");
        return Promise.resolve<AxiosResponse>(response);
      }
      if (code !== 0) {
        message.info(`失败：${msg}`);
        return Promise.reject<AxiosResponse>(response);
      }
      return Promise.resolve<AxiosResponse>(data);
    } else if (status === 401) {
      // window.location.href = "/login";
    }
    return Promise.reject<AxiosResponse>(response);
  },
  (err: AxiosError<RequestResult>) => {
    const {
      config,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      response: {
        status,
        data: { msg },
      },
    } = err;
    const { url } = config;

    if (url === LOGIN_URL) {
      return Promise.reject<AxiosResponse>(err);
    } else {
      msg
        ? message.error(msg)
        : message.warning(`请求 ${url} 错误，${err.message}`);
    }

    if (status === 401) {
      // window.location.href = "/login";
    }

    if (status === 404) {
      // window.location.href = "/404";
    }

    if (status === 500) {
      // window.location.href = "/500";
      message.error(`请求失败，请联系管理员。${err.message}`);
    }

    return Promise.reject<AxiosResponse>(err);
  }
);

export interface QueryConfig extends RequestInit {
  data?: object;
  cookie?: string;
}

export const ajax = async (
  endpoint: string,
  { data, cookie, headers, ...customConfig }: QueryConfig = {}
) => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method: "GET",
    headers: (headers as AxiosRequestHeaders) || {
      // Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json;charset=UTF-8" : "",
    },
    withCredentials: true,
    ...(customConfig as AxiosRequestConfig),
  };

  if (config.method?.toUpperCase() === "GET") {
    if (data) {
      if (cookie)
        data = { ...data, ...{ cookie: `${encodeURIComponent(cookie)}` } };
      config.params = data;
    } else {
      if (cookie) config.url += `?cookie=${encodeURIComponent(cookie)}`;
    }
  }

  if (config.method?.toUpperCase() === "POST") {
    config.data = data;
    if (cookie) config.url += `?cookie=${encodeURIComponent(cookie)}`;
  }

  return request(config).then(response => Promise.resolve(response.data));
};

export const useAjax = () => {
  const cookie = "";

  return useCallback(
    (...[endpoint, config]: Parameters<typeof ajax>) => {
      return ajax(endpoint, { ...config, cookie });
    },
    [cookie]
  );
};
