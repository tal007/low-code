/*
 * @Date: 2022-09-16 15:06:05
 * @LastEditTime: 2023-05-25 16:48:02
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */
import path, { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import { visualizer } from "rollup-plugin-visualizer";
import inject from "@rollup/plugin-inject";
import eslintPlugin from "vite-plugin-eslint";
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
// import monacoEditorNlsPlugin, {
//   esbuildPluginMonacoEditorNls,
//   Languages,
// } from "@maiyue/vite-plugin-monaco-editor-nls";

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log(`当前运行环境是 ${mode}`);
  return defineConfig({
    base: "./",
    define: {
      __Admin_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
      (monacoEditorPlugin as any).default({
        publicPath: "/vs",
        forceBuildCDN: false,
      }),
      // (monacoEditorNlsPlugin as any).default({ locale: Languages.zh_hans }),
      react({
        babel: {
          plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
        },
      }),
      eslintPlugin({
        cache: false,
        include: ["./src/**/*.tsx"],
        exclude: ["node_modules"],
        // fix: true,
        emitWarning: false,
        failOnError: false,
      }),
      legacy({
        targets: ["defaults", "ie >= 11", "chrome >= 49", "ios >= 10"],
      }),
      svgr(),
      inject({
        useTranslation: ["react-i18next", "useTranslation"],
      }),
      viteCompression({
        verbose: true, //是否在控制台输出压缩结果
        disable: false, //是否禁用,相当于开关在这里
        threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
        algorithm: "gzip", //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: ".gz", //文件后缀
      }),
      importToCDN({
        modules: [
          // autoComplete("react"),
          // autoComplete("react-dom"),
          // autoComplete("antd"),
          // autoComplete("axios"),
          // autoComplete("lodash"),
          // autoComplete("moment"),
          {
            name: "react",
            var: "React",
            path: "18.2.0.min.js",
          },
          {
            name: "react-dom",
            var: "ReactDOM",
            path: "18.2.0.min.js",
          },
          {
            name: "dayjs",
            var: "dayjs",
            path: "1.11.7.min.js",
          },
          {
            name: "antd",
            var: "antd",
            path: "5.4.1.min.js",
            css: "5.4.1.min.css",
          },
          {
            name: "antd-mobile",
            var: "antdMobile",
            path: "5.29.1.min.js",
            css: "5.29.1.min.css",
          },
          {
            name: "lodash",
            var: "_",
            path: "4.17.21.min.js",
          },
        ],
        prodUrl: "./lib/{name}/{path}",
      }),
      visualizer({
        open: true, //注意这里要设置为true，否则无效
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      watch: null, // 设置为 {} 则会启用 rollup 的监听器
      outDir: "dist",
      assetsDir: "assets",
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      cssTarget: "",
      sourcemap: false,
      rollupOptions: {
        external: ["react", "react-dom", "antd", "antd-mobile", "lodash"],
        input: {
          main: resolve(__dirname, "index.html"),
          publish: resolve(__dirname, "publish.html"),
        },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            // lodash: ["lodash"],
            // antd: ["antd"],
            // moment: ["moment"],
            // axios: ["axios"],
            fortawesome: [
              "@fortawesome/react-fontawesome",
              "@fortawesome/fontawesome-svg-core",
              "@fortawesome/free-solid-svg-icons",
            ],
            craftjs: ["@craftjs/core", "@craftjs/layers"],
            // html2canvas: ["html2canvas"],
          },
          globals: {},
          // manualChunks(id) {
          //   if (id.includes("node_modules")) {
          //     if (id.includes("react") || id.includes("react-dom")) {
          //       return;
          //     }
          //     const arr = id.toString().split("node_modules/")[1].split("/");
          //     switch (arr[0]) {
          //       case "lodash":
          //       case "@monaco-editor/react":
          //       case "@fortawesome/free-solid-svg-icons":
          //       case "darkreader":
          //         // case "@ant-design":
          //         return arr[0];
          //       default:
          //         return "vendor";
          //     }
          //   }
          // },
        },
      },
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     plugins: [
    //       esbuildPluginMonacoEditorNls({
    //         locale: Languages.zh_hans,
    //       }),
    //     ],
    //   },
    // },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    // qiankun 微前端配置
    // https://cn.vitejs.dev/guide/build.html#advanced-base-options
    // experimental: {
    //   renderBuiltUrl() {
    //     return
    //   }
    // },
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://172.18.0.50:9999",
          ws: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
      // 在WSL2中使用加此配置，但是会占用很高的CPU，不建议
      // watch: {
      //   usePolling: true
      // }
    },
  });
};
