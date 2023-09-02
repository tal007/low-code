/*
 * @Date: 2022-10-13 16:26:38
 * @LastEditTime: 2022-12-30 14:58:52
 * @LastEditors: 刘玉田
 * @Description: font family color style weight textDecoration as so on
 */
import { Enum } from "../Select";
import { CheckboxProps } from "../CheckboxGroup";
import { RadioGroupChildProps } from "../RadioGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FONT_DATA } from "@/constant";
import { SettingProviderProps } from "../SettingProvider";
import { Color, colorDefault } from "@/Editor/Widgets/types";
import { createSchema } from "..";
import { toColorString } from "@/Editor/Widgets/helper";

export interface Font {
  fontFamily: string;
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontStyle: boolean[];
  color: Color["color"];
  underline: boolean;
  lineThrough: boolean;
  italic: boolean;
  bold: boolean;
  textAlign: "left" | "center" | "right" | "justify";
}

export const fontDefault: Font = {
  fontFamily: "微软雅黑",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: [false, false, false, false],
  color: colorDefault.color,
  underline: false,
  lineThrough: false,
  italic: false,
  bold: false,
  textAlign: "left",
};

const tagNameEnum: Enum[] = [
  {
    label: "普通文本",
    value: "span",
  },
  {
    label: "段落",
    value: "p",
  },
  {
    label: "一级标题",
    value: "h1",
  },
  {
    label: "二级标题",
    value: "h2",
  },
  {
    label: "三级标题",
    value: "h3",
  },
  {
    label: "四级标题",
    value: "h4",
  },
  {
    label: "五级标题",
    value: "h5",
  },
  {
    label: "六级标题",
    value: "h6",
  },
];

export const fontStyleEnum: CheckboxProps[] = [
  {
    icon: "bold",
    value: "bold",
    propName: "bold",
  },
  {
    icon: "italic",
    value: "italic",
    propName: "italic",
  },
  {
    icon: "underline",
    value: "underline",
    propName: "underline",
  },
  {
    icon: "strikethrough",
    value: "lineThrough",
    propName: "lineThrough",
  },
];

const textAlignEnum: RadioGroupChildProps[] = [
  {
    label: <FontAwesomeIcon icon={"align-left"} />,
    value: "left",
  },
  {
    label: <FontAwesomeIcon icon={"align-center"} />,
    value: "center",
  },
  {
    label: <FontAwesomeIcon icon={"align-right"} />,
    value: "right",
  },
  {
    label: <FontAwesomeIcon icon={"align-justify"} />,
    value: "justify",
  },
];

type types =
  | "text"
  | "fontFamily"
  | "tagName"
  | "color"
  | "fontSize"
  | "fontStyle"
  | "textAlign";
type rendersProp = types[];
export const fontRender = (
  renders?: rendersProp,
  propPrefix = ""
): SettingProviderProps => {
  const prefix = `${propPrefix ? propPrefix + "." : ""}`;

  const text = createSchema(
    "InputSchema",
    { label: ["fontText", { ns: "style" }] },
    `${prefix}text`
  );
  const fontFamily = createSchema(
    "SelectSchema",
    { label: ["fontFamily", { ns: "style" }] },
    `${prefix}fontFamily`,
    {
      mapData: FONT_DATA,
    }
  );
  const tagName = createSchema(
    "SelectSchema",
    { label: ["tagName", { ns: "style" }] },
    `${prefix}tagName`,
    {
      mapData: tagNameEnum,
    }
  );
  const color = createSchema(
    "InputColorSchema",
    { label: ["color", { ns: "style" }] },
    `${prefix}color`
  );
  const fontSize = createSchema(
    "InputNumberSchema",
    { label: ["fontSize", { ns: "style" }] },
    `${prefix}fontSize`,
    {
      min: 0,
    }
  );
  const fontStyle = createSchema(
    "CheckboxGroupSchema",
    { label: ["fontStyle", { ns: "style" }] },
    `${prefix}fontStyle`,
    {
      mapData: fontStyleEnum,
    }
  );
  const textAlign = createSchema(
    "RadioGroupSchema",
    {
      label: ["textAlign", { ns: "style" }],
      labelWidth: "90px",
    },
    `${prefix}textAlign`,
    {
      mapData: textAlignEnum,
    }
  );

  const renderMap = {
    text,
    fontFamily,
    tagName,
    color,
    fontSize,
    fontStyle,
    textAlign,
  };

  return {
    font: {
      header: "propSettingHeader.font",
      children: renders
        ? renders?.map(item => renderMap[item])
        : Object.values(renderMap),
    },
  };
};

export const generateFontStyle = (font: Font) => {
  const { color, fontSize, fontFamily, fontStyle, textAlign } = font;

  let textDecoration = fontStyle[2] ? "underline" : "";
  textDecoration += fontStyle[3]
    ? " line-through"
    : textDecoration
    ? ""
    : "none";

  const style: React.CSSProperties = {
    color: toColorString(color),
    fontWeight: fontStyle[0] ? "bold" : "normal",
    fontStyle: fontStyle[1] ? "italic" : "normal",
    textDecoration: textDecoration,
    fontFamily,
    fontSize,
    textAlign,
  };

  return style;
};
