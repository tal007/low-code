<!--
 * @Date: 2022-10-09 16:19:32
 * @LastEditTime: 2023-04-25 17:04:05
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
-->

# 迈越软件流程引擎

模仿钉钉的版本

## 技术选型：

- 脚手架: [vite@3](https://cn.vitejs.dev/)
- 拖拽: [craft.js](https://github.com/prevwong/craft.js)
- UI:
  - [antd@5](https://ant.design/docs/spec/introduce-cn)
  - [antd-mobile@5](https://mobile.ant.design/zh)
  - [@ant-design/pro-components](https://procomponents.ant.design/)
  - [styled-components](https://styled-components.com/)
- 图标 icon: [fontawesome](https://fontawesome.com/)
- 数据存储 Store: [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- 暗黑模式: [darkreader](https://github.com/darkreader/darkreader)
- 多语言: [react-i18next](https://react.i18next.com/)
- 拖拽排序: [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)
- 鼠标右键: [react-contexify](https://github.com/fkhadra/react-contexify)
- react 快速更新 state: [immutability-helper](https://github.com/kolodny/immutability-helper)
- 流程图: [antv/g6](http://antv.antfin.com/zh-cn/g6/3.x/index.html)
- 数据请求: [tanstack/react-query](https://tanstack.com/)

参考：
[百度 AMIS](https://aisuda.github.io/amis-editor-demo/#/hello-world)

## 开发准备

项目采用 `react@18.2 + typescript@4.8 + vite` 进行开发，需要对相关的知识进行了解。
项目配置了 `git` 提交规范，查看 `commitlint.config.cjs` 文件，代码提交前会先进性格式化然后在提交。

如果你使用 `VSCode` 进行项目的开发，请安装 `Git History`、`koroFileHeader` 插件，并进行相关配置。可能会有快捷键冲突的可能，请自行查询搜索修改。

## 版本迭代记录

版本更新请修改 `package.json` 中的 `version`

### 1.0.0

初版，包含流程引擎机构管理，开发配置中低代码平台

### 仓库切换

```
git remote set-url origin http://172.18.0.251:8929/wangjia/flow_test_web.git
http://172.18.0.251:8929/mylcp_web/mylcp_web.git
git push -u origin --all
git push -u origin --tags
```
