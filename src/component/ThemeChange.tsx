/*
 * @Date: 2022-11-04 16:39:59
 * @LastEditTime: 2023-05-11 16:13:45
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 主题修改
 */

import { useEffect, useState } from "react";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from "darkreader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { currentTheme, currentThemeAction } from "@/store/theme.slice";
import { ColorPicker } from "./ColorPicker";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constant";
import { AnyAction, Dispatch } from "redux";
import { useCallback } from "react";

export const setDarkModal = (dispatch: Dispatch<AnyAction>) => {
  enableDarkMode({
    brightness: 100,
    contrast: 90,
    sepia: 10,
  });
  dispatch(currentThemeAction.setIsDark(true));
};

export const DarkLightChange = () => {
  const theme = useSelector(currentTheme);
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(theme.isDark);

  const changeToDark = useCallback(
    async (value: boolean) => {
      if (value) {
        setDarkModal(dispatch);
      } else {
        disableDarkMode();
      }
      setIsDark(value);
      storage.setSession(STORAGE_KEYS.isDark, `${value}`);
    },
    [dispatch]
  );

  // const [api, contextHolder] = notification.useNotification();
  // const openNotification = (placement: NotificationPlacement) => {
  //   api.info({
  //     message: `Notification ${placement}`,
  //     description: "1234",
  //     placement,
  //   });
  // };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 21 || hour <= 6) {
      changeToDark(true);
    }
    // openNotification("topRight");
  }, [changeToDark]);

  return (
    <>
      {isDark ? (
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={"moon"}
          onClick={() => changeToDark(false)}
        />
      ) : (
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={"sun"}
          onClick={() => changeToDark(true)}
        />
      )}
    </>
  );
};

export const ThemeChange = () => {
  const dispatch = useDispatch();
  const [colorChooseVisible, setColorChooseVisible] = useState(false);
  const theme = useSelector(currentTheme);
  const setTheme = val => {
    dispatch(
      currentThemeAction.setToken({
        colorPrimary: val,
      })
    );
  };

  return (
    <ColorPicker
      chooseColorVisible={colorChooseVisible}
      setChooseColorVisible={setColorChooseVisible}
      defaultColor={theme.token.colorPrimary}
      handleChange={color => setTheme(color.hex)}
    />
  );
};
