/*
 * @Date: 2022-09-21 18:05:35
 * @LastEditTime: 2022-09-21 18:05:35
 * @LastEditors: 刘玉田
 * @Description: 修改文档标题
 */

import { useEffect } from "react";

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "";
    };
  }, [title]);
};
