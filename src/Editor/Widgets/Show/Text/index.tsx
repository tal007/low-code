/*
 * @Date: 2022-10-08 16:01:12
 * @LastEditTime: 2023-05-04 11:00:26
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 文字
 */

import { useNode, useEditor, Element } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions, toColorString } from "../../helper";
import { TextSettings } from "./TextSettings";
import { BackgroundColor, backgroundColorDefault } from "../../types";
import { Font, fontDefault } from "@/SettingPanelSchema/settingRender/font";
import { displayName } from "@/i18n/widgetDisplayName";
import {
  MarginAndPadding,
  marginAndPaddingDefault,
} from "@/SettingPanelSchema/settingRender/marginAndPadding";
import { useMarginAndPadding } from "../../hooks";
import { useEffect } from "react";

export interface TextProps extends BackgroundColor, Font, MarginAndPadding {
  shadow: number;
  text: string;
  tagName: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const defaultProps = {
  ...backgroundColorDefault,
  ...fontDefault,
  ...marginAndPaddingDefault,
  text: "请编辑内容",
  tagName: "span",
};

const widgetName = displayName("Text");

export const TextRenderView = (props: Partial<TextProps>) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  const { text, tagName, color, backgroundColor, fontStyle, ...rest } = props;

  const marginAndPaddingStyle = useMarginAndPadding(props.marginAndPadding);

  let textDecoration = fontStyle[2] ? "underline" : "";
  textDecoration += fontStyle[3]
    ? " line-through"
    : textDecoration
    ? ""
    : "none";

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

  return (
    <ContentEditable
      className="Text"
      innerRef={connect}
      html={text || ""} // innerHTML of the editable div
      disabled={!enabled}
      onChange={e => {
        setProp(props => (props.text = e.target.value), 500);
      }} // use true to disable editing
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

TextRenderView.craft = {
  displayName: widgetName,
  props: defaultProps,
  related: {
    settings: TextSettings,
  },
};

export const Text: CommonButtonTypes = {
  ...generateWidgetOptions("Text", "show"),
  icon: "terminal",
  tags: ["show"],
  preview: <span>123</span>,
  render: (
    <Element
      canvas
      is={TextRenderView}
      custom={{ displayName: widgetName, tags: ["show"] }}
    ></Element>
  ),
};
