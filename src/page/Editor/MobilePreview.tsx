/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-03-20 10:57:09
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-05-16 18:30:28
 * @Description: 移动端的组件
 */
import ReactDOM from "react-dom/client";
import { Root } from "@/Editor/Widgets/Container/Root";
import { displayName } from "@/i18n/widgetDisplayName";
import { Element, Frame } from "@craftjs/core";

const EditContent = () => {
  console.log("EditContent");
  return (
    <>
      777777
      <Frame>
        <Element
          canvas
          is={Root}
          custom={{ displayName: displayName("Root") }}
        ></Element>
      </Frame>
    </>
  );
};

ReactDOM.createRoot(
  document.getElementById("mobile-root") as HTMLElement
).render(<EditContent />);
