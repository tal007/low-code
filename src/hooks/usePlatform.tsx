/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-13 10:05:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-27 11:33:33
 * @Description: 判断平台
 */

import { currentUIState } from "@/store/useMobileUI.slice";
import { useSelector } from "react-redux";

export const usePlatform = () => {
  const currentUIIsMobile = useSelector(currentUIState);
  const reg = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const { MODE } = import.meta.env;

  if (MODE === "dev" && !reg) {
    return currentUIIsMobile ? "mobile" : "pc";
  }

  return reg ? "mobile" : "pc";
};
