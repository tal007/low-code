/*
 * @Date: 2022-12-06 15:03:37
 * @LastEditTime: 2023-05-23 17:39:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 二次封装的 antd pro table
 */

import { getTableProBodyHeight } from "@/utils/helper";
import { ProTable, ProTableProps } from "@ant-design/pro-components";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

export const AntdProTable = <T, U>(props: ProTableProps<T, U>) => {
  const { id, scroll } = props;
  const [scrollY, setScrollY] = useState("0");

  useEffect(() => {
    const element: HTMLElement = document.querySelector(`#${id}`);
    const windowResize = throttle(() => {
      const res = getTableProBodyHeight(element);
      setScrollY(res);
    }, 500);
    window.addEventListener("resize", windowResize, false);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    () => {
      return window.removeEventListener("resize", windowResize, false);
    };
  }, [id]);

  return (
    <ProTable<T>
      {...props}
      search={{
        labelWidth: "auto",
      }}
      scroll={{
        ...scroll,
        y: scrollY,
      }}
    />
  );
};

export default AntdProTable;
