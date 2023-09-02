/*
 * @Date: 2022-09-26 11:11:12
 * @LastEditTime: 2023-05-23 11:18:20
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 多语言配置
 */

// zh-CH
import translation_zh from "./zh-CN.json";
import common_zh from "./zh-CN/common.json";
import editorWidget_zh from "./zh-CN/editorWidget.json";
import flowPath_zh from "./zh-CN/flowPath.json";
import tip_zh from "./zh-CN/tip.json";
import editor_zh from "./zh-CN/editor.json";
import style_zh from "./zh-CN/style.json";
import formRules_zh from "./zh-CN/formRules.json";

// en-US
import translation_en from "./en-US.json";

export default {
  "en-US": {
    translation: translation_en,
  },
  "zh-CN": {
    translation: translation_zh,
    common: common_zh,
    editorWidget: editorWidget_zh,
    flowPath: flowPath_zh,
    tip: tip_zh,
    editor: editor_zh,
    style: style_zh,
    formRules: formRules_zh,
  },
};
