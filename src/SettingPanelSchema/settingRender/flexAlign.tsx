/*
 * @Date: 2022-10-18 10:53:10
 * @LastEditTime: 2023-05-04 10:49:36
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: flex 布局的对齐方式
 */

import { RadioGroupChildProps } from "../RadioGroup";
import { SettingProviderProps } from "../SettingProvider";
import { IconFont } from "@/component/IconFont";
import { createSchema } from "..";

export const flexJustify: RadioGroupChildProps[] = [
  {
    label: <IconFont type={"icon-a-Justifyflex-startrow"} />,
    value: "flex-start",
  },
  {
    label: <IconFont type={"icon-align-center"} />,
    value: "center",
  },
  {
    label: <IconFont type={"icon-a-Justifyflex-endrow"} />,
    value: "flex-end",
  },
  {
    label: <IconFont type={"icon-a-Justifyspace-betweenrow"} />,
    value: "space-between",
  },
  {
    label: <IconFont type={"icon-a-Justifyspace-aroundrow"} />,
    value: "space-around",
  },
];

export const flexAlign: RadioGroupChildProps[] = [
  {
    label: <IconFont type={"icon-a-Alignflex-startrow"} />,
    value: "flex-start",
  },
  {
    label: <IconFont type={"icon-align-center"} />,
    value: "center",
  },
  {
    label: <IconFont type={"icon-a-Alignflex-endrow"} />,
    value: "flex-end",
  },
];

export interface FlexAlignProps {
  justify: string;
  align: string;
}

export const flexAlignDefault = {
  justify: "center",
  align: "center",
};

export const flexAlignRender = (
  header: string,
  justifyName = "justifyAlign",
  alignName = "alignAlign",
  otherProps: { [key: string]: any } = {}
): SettingProviderProps => {
  return {
    flexAlign: {
      header,
      children: [
        createSchema(
          "RadioGroupSchema",
          {
            label: [justifyName, { ns: "style" }],
            direction: "column",
          },
          "justify",
          {
            mapData: flexJustify,
          },
          otherProps
        ),
        createSchema(
          "RadioGroupSchema",
          {
            label: [alignName, { ns: "style" }],
            direction: "column",
          },
          "align",
          {
            mapData: flexAlign,
          },
          otherProps
        ),
      ],
    },
  };
};
