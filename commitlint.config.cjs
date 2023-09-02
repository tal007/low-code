/**
 * build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 * feature：新功能
 * update：更新某功能
 * fix：修补某功能的bug
 * refactor：重构某个功能
 * optimize: 优化构建工具或运行时性能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 * del: 删除文件
 */

// [commitlint](https://github.com/conventional-changelog/commitlint)
// |类型| 描述|
// | --- | --- |
// |build| 编译相关的修改，例如发布版本、对项目构建或者依赖的改动|
// |chore| 其他修改, 比如改变构建流程、或者增加依赖库、工具等|
// |ci| 持续集成修改|
// |docs| 文档修改|
// |feat| 新特性、新功能|
// |fix| 修改 bug|
// |perf| 优化相关，比如提升性能、体验|
// |refactor| 代码重构|
// |revert| 回滚到上一个版本|
// |style| 代码格式修改, 注意不是 css 修改|
// |test| 测试用例修改|

module.exports = {
  extends: ["@commitlint/config-conventional"],
  // rules: {
  //   //0为disable，1为warning，2为error
  //   //always|never
  //   //第三位该rule的值
  //   "type-enum": [
  //     2,
  //     "always",
  //     [
  //       "feature",
  //       "update",
  //       "fix",
  //       "refactor",
  //       "optimize",
  //       "style",
  //       "docs",
  //       "chore",
  //       "del"
  //     ],
  //   ],
  //   "subject-full-stop": [0, "never"],
  //   "subject-case": [0, "never"],
  // },
};
