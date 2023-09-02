/*
 * @Date: 2022-09-16 15:06:05
 * @LastEditTime: 2023-05-18 15:29:51
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store";
import { ErrorBoundary } from "@/component/ErrorBoundary";
import App from "./routes";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { currentLanguage } from "./store/language.slice";
import { currentTheme } from "./store/theme.slice";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { getVersion } from "./utils/helper";
import { setDarkModal } from "./component/ThemeChange";
import storage from "./utils/storage";
import { STORAGE_KEYS, languageMap } from "./constant";
import "antd/dist/reset.css";
import "./i18n";
import "./index.less";
import "./fontawesome";
import moment from 'moment';

moment().locale('zh-cn')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError(err) {
        console.log(`数据请求失败，失败信息：`, err);
      },
    },
  },
});
dayjs.locale("zh-cn");

const Render = () => {
  useEffect(() => {
    const version = getVersion();
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
      <Provider store={store}>
        <LanguageContainer />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const LanguageContainer = () => {
  const lang = useSelector(currentLanguage);
  const theme = useSelector(currentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    // 初始设置暗夜模式，这里主要是保证新打开的页面也能继承配置
    const isDarkModal = storage.getSession(STORAGE_KEYS.isDark) === "true";
    isDarkModal && setDarkModal(dispatch);
  }, [dispatch]);

  return (
    <ConfigProvider locale={languageMap[lang.lang].antdLocal} theme={theme}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Render />);
