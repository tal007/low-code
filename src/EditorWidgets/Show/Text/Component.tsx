/*
 * @Date: 2023-05-12 16:32:59
 * @LastEditTime: 2023-05-15 14:15:30
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本组件
 */
import { useNode } from "@craftjs/core";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { toColorString } from "../../helper";
import { useMarginAndPadding } from "../../hooks";
import { useEffect } from "react";
import { TextProps } from "./index.d";
import defaultProps from "./defaultProps";

// 预览页面组件
export const Component = (props: Partial<TextProps>) => {
  const { text, tagName, color, backgroundColor, fontStyle, ...rest } = props;
  const marginAndPaddingStyle = useMarginAndPadding(props.marginAndPadding);
  let textDecoration = fontStyle[2] ? "underline" : "";
  textDecoration += fontStyle[3]
    ? " line-through"
    : textDecoration
    ? ""
    : "none";

  const style: React.CSSProperties = {
    ...defaultProps,
    ...rest,
    ...marginAndPaddingStyle,
    color: toColorString(color),
    backgroundColor: toColorString(backgroundColor),
    fontWeight: fontStyle[0] ? "bold" : "normal",
    fontStyle: fontStyle[1] ? "italic" : "normal",
    textDecoration: textDecoration,
  };
  // 如果没有文本后续将不好选中，这里给一个默认的属性
  if (text === "") {
    style.display = "inline-block";
    style.width = "80px";
  }
  const onChange = () => {
    console.log("onChange");
  };
  return (
    <ContentEditable
      className="Text"
      html={text || ""} // innerHTML of the editable div
      disabled={true}
      onChange={onChange}
      tagName={tagName} // Use a custom HTML tag (uses a div by default)
      style={style}
      onPaste={e => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    />
  );
};
// 编辑器页面组件
export const EditorComponent = (props: Partial<TextProps>) => {
  const { text, tagName, color, backgroundColor, fontStyle, ...rest } = props;
  const marginAndPaddingStyle = useMarginAndPadding(props.marginAndPadding);
  let textDecoration = fontStyle[2] ? "underline" : "";
  textDecoration += fontStyle[3]
    ? " line-through"
    : textDecoration
    ? ""
    : "none";

  const style: React.CSSProperties = {
    ...defaultProps,
    ...rest,
    ...marginAndPaddingStyle,
    color: toColorString(color),
    backgroundColor: toColorString(backgroundColor),
    fontWeight: fontStyle[0] ? "bold" : "normal",
    fontStyle: fontStyle[1] ? "italic" : "normal",
    textDecoration: textDecoration,
  };
  // 如果没有文本后续将不好选中，这里给一个默认的属性
  if (text === "") {
    style.display = "inline-block";
    style.width = "80px";
  }
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  useEffect(() => {
    switch (tagName) {
      case "h1":
        setProp(props => {
          props.fontSize = 32;
          props.fontStyle[0] = true;
        }, 500);
        break;
      case "h2":
        setProp(props => {
          props.fontSize = 24;
          props.fontStyle[0] = true;
        }, 500);
        break;
      case "h3":
        setProp(props => {
          props.fontSize = 18;
          props.fontStyle[0] = true;
        }, 500);
        break;
      case "h4":
        setProp(props => {
          props.fontSize = 16;
          props.fontStyle[0] = true;
        }, 500);
        break;
      case "h5":
        setProp(props => {
          props.fontSize = 14;
          props.fontStyle[0] = true;
        }, 500);
        break;
      case "h6":
        setProp(props => {
          props.fontSize = 12;
          props.fontStyle[0] = true;
        }, 500);
        break;
      default:
        setProp(props => {
          props.fontSize = 16;
          props.fontStyle[0] = false;
        }, 500);
        break;
    }
  }, [setProp, tagName]);
  const onChange = (e: ContentEditableEvent) => {
    setProp(props => (props.text = e.target.value), 500);
  };
  return (
    <ContentEditable
      className="Text"
      innerRef={connect}
      html={text || ""} // innerHTML of the editable div
      disabled={false}
      onChange={onChange} // use true to disable editing
      tagName={tagName} // Use a custom HTML tag (uses a div by default)
      style={style}
      onPaste={e => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    />
  );
};
