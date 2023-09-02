/*
 * @Date: 2022-09-21 13:58:27
 * @LastEditTime: 2023-05-04 10:26:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 获取 url 中的 key value
 */

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev: Record<string, string>, key: string) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {}) as { [key in K]: string },
      [keys, searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = { ...Object.fromEntries(searchParams), ...params };
      return setSearchParams(o);
    },
  ] as const;
};
