/*
 * @Date: 2022-09-21 14:13:22
 * @LastEditTime: 2022-09-21 14:13:22
 * @LastEditors: 刘玉田
 * @Description: 用于判断组件是否已经卸载,如果还没挂载或者已经卸载返回false，否则返回true
 */

import { useEffect, useRef } from "react";

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
