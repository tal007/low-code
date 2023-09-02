/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-19 11:08:58
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-19 11:10:55
 * @Description:
 */
let s = 'label: "editor.widget.form.UploadFile.settings", das';

let reg = /label: "editor\.widget\.([^"]+)"/;

console.log(reg.exec(s));

console.log(s.replace(reg, "$1aaa"));
