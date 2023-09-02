/*
 * @Date: 2022-11-25 09:29:24
 * @LastEditTime: 2022-12-29 17:53:58
 * @LastEditors: 刘玉田
 * @Description: 主题配置
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import type { ConfigProviderProps } from "antd/es/config-provider";
import { merge } from "lodash";
import colorToRGBA from "@/utils/colorToRgba";
import { AliasToken } from "antd/es/theme/internal";
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constant";

const DEFAULT_COLOR =
  storage.getSession(STORAGE_KEYS.primaryColor) || "#1677ff";
const OPACITY_COLOR = colorToRGBA(DEFAULT_COLOR, 0.7);

(function initialPrimaryColor() {
  document.documentElement.style.setProperty(`--colorPrimary`, DEFAULT_COLOR);
})();

const initialState: ConfigProviderProps["theme"] & { isDark: boolean } = {
  token: {
    colorPrimary: DEFAULT_COLOR,
    colorLink: DEFAULT_COLOR,
    colorLinkHover: OPACITY_COLOR,
    colorLinkActive: OPACITY_COLOR,
  },
  isDark: false,
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Partial<AliasToken>>) {
      const token = action.payload;
      if (token.colorPrimary) {
        token.colorLink = token.colorPrimary;
        token.colorLinkHover = colorToRGBA(token.colorPrimary, 0.7);
        token.colorLinkActive = colorToRGBA(token.colorPrimary, 0.7);
        document.documentElement.style.setProperty(
          `--colorPrimary`,
          token.colorPrimary
        );
        storage.setSession(STORAGE_KEYS.primaryColor, token.colorPrimary);
      }
      state.token = merge(state.token, token);
    },
    setIsDark(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
  },
});

export const currentThemeAction = theme.actions;

export const currentTheme = (state: RootState) => state.theme;
