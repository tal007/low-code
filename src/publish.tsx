/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-18 17:57:34
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-09 17:30:33
 * @Description:发布版本入口
 */
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useDispatch } from "react-redux";
import { publishStore } from "@/store";
import { ErrorBoundary } from "@/component/ErrorBoundary";
import Publish from "./page/Publish";
import "./fontawesome";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

import "./i18n";
import "./index.less";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { getVersion } from "./utils/helper";
import { setDarkModal } from "./component/ThemeChange";
import { languageMap } from "./constant";
import colorToRGBA from "./utils/colorToRgba";

const queryClient = new QueryClient();
dayjs.locale("zh-cn");

const Render = () => {
  useEffect(() => {
    const version = getVersion();
    console.log(`当前版本号：${version}`);
    const metaVersionElement: HTMLMetaElement = document.querySelector(
      "meta[name='version']"
    );
    if (metaVersionElement) {
      metaVersionElement.setAttribute("content", version);
    } else {
      const versionNode = document.createElement("meta");
      versionNode.setAttribute("name", "version");
      versionNode.setAttribute("content", version);
      document.head.appendChild(versionNode);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={publishStore}>
        <LanguageContainer />
      </Provider>
    </QueryClientProvider>
  );
};

const LanguageContainer = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState({});

  // TODO 请求主题与语言配置
  const lang = "zh-ch";
  // dayjs.locale(lang.lang)
  useEffect(() => {
    const DEFAULT_COLOR = "#1677ff";
    const OPACITY_COLOR = colorToRGBA(DEFAULT_COLOR, 0.7);
    const theme = {
      token: {
        colorPrimary: DEFAULT_COLOR,
        colorLink: DEFAULT_COLOR,
        colorLinkHover: OPACITY_COLOR,
        colorLinkActive: OPACITY_COLOR,
      },
      isDark: false,
    };

    setTheme(theme);
    document.documentElement.style.setProperty(`--colorPrimary`, DEFAULT_COLOR);
    theme.isDark && setDarkModal(dispatch);
  }, [dispatch]);

  return (
    <ConfigProvider locale={languageMap[lang].antdLocal} theme={theme}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Publish />
        </ErrorBoundary>
      </ThemeProvider>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Render />
);
