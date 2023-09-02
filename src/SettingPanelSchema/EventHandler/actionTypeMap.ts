/*
 * @Date: 2022-11-02 15:45:20
 * @LastEditTime: 2023-01-04 16:32:03
 * @LastEditors: 刘玉田
 * @Description:
 */

export const actionTypeMap = new Map<string, string>();

actionTypeMap.set("jump", "event.jump");
actionTypeMap.set("openPage", "event.openPage");
actionTypeMap.set("refresh", "event.refresh");
actionTypeMap.set("back", "event.back");
actionTypeMap.set("openModal", "event.openModal");
actionTypeMap.set("closeModal", "event.closeModal");
actionTypeMap.set("message", "event.message");
actionTypeMap.set("ajax", "event.ajax");
actionTypeMap.set("download", "event.download");
actionTypeMap.set("show", "event.show");
actionTypeMap.set("enabled", "event.enabled");
actionTypeMap.set("reload", "event.reload");
actionTypeMap.set("setValue", "event.setValue");
actionTypeMap.set("submit", "event.formSubmit");
actionTypeMap.set("reset", "event.formReset");
actionTypeMap.set("validate", "event.formValidate");
actionTypeMap.set("action", "event.action");
actionTypeMap.set("copy", "event.copy");
actionTypeMap.set("custom", "event.custom");

export const eventTypeMap = {
  click: "event.types.click",
  mouseEnter: "event.types.mouseEnter",
  mouseLeave: "event.types.mouseLeave",
  focus: "event.types.focus",
  blur: "event.types.blur",
  load: "event.types.load",
  change: "event.types.change",
  submit: "event.types.formSubmit",
};
