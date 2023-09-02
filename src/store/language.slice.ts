/*
 * @Date: 2022-10-25 11:28:52
 * @LastEditTime: 2023-04-27 17:35:45
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import dayjs from "dayjs";
import i18n from "@/i18n";
import { languageMap } from "@/constant";

type LanguageState = keyof typeof languageMap;

const initialState: { lang: LanguageState } = { lang: "zh-CN" };

export const language = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageState>) {
      const lang = action.payload;
      state.lang = lang;
      dayjs.locale(lang.toLowerCase());
      i18n.changeLanguage(lang);
    },
  },
});

export const currentLanguageAction = language.actions;

export const currentLanguage = (state: RootState) => state.language;
