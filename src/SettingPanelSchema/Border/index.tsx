/*
 * @Date: 2022-10-26 15:37:59
 * @LastEditTime: 2022-11-25 13:52:41
 * @LastEditors: 刘玉田
 * @Description: 边框
 */

import { IconFont } from "@/component/IconFont";
import { Space } from "antd";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import { useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import { Input } from "../Input";
import { InputColor } from "../InputColor";
import { Select } from "../Select";
import { RGBColor } from "react-color";

const BorderContainer = styled(Space)`
  font-size: 18px;
  padding-top: 6px;

  .ant-space-item {
    line-height: 1;
  }

  .focus {
    color: ${props => props.theme.token.colorPrimary};
    fill: ${props => props.theme.token.colorPrimary};
  }
`;

const borderMapData = [
  { label: "solid", value: "solid" },
  { label: "dashed", value: "dashed" },
  { label: "dotted", value: "dotted" },
];

export type BorderType = "solid" | "dashed" | "dotted";
export type BorderPosition = "top" | "left" | "right" | "bottom" | "all";
export type BorderConfig = {
  color: RGBColor;
  width: string | number;
  type: BorderType;
};
export interface BorderProps extends PanelSchemaProps {
  defaultValue: {
    [key: string]: BorderConfig;
  };
}

export const Border = (props: BorderProps) => {
  const [focus, setFocus] = useState<string>("all");

  const { setProp, defaultValue, propName } = props;

  return (
    <>
      <BorderContainer direction={"vertical"} size={0}>
        <Space size={0}>
          <IconFont type="icon-empty" />
          <IconFont
            className={cx({ "cursor-pointer": true, focus: focus === "top" })}
            type="icon--shangbiankuang"
            onClick={() => setFocus("top")}
          />
          <IconFont type="icon-empty" />
        </Space>
        <Space size={0}>
          <IconFont
            className={cx({ "cursor-pointer": true, focus: focus === "left" })}
            type="icon--zuobiankuang"
            onClick={() => setFocus("left")}
          />
          <IconFont
            className={cx({
              "cursor-pointer": true,
              focus: focus === "all",
            })}
            type="icon--quanbubiankuang"
            onClick={() => setFocus("all")}
          />
          <IconFont
            className={cx({ "cursor-pointer": true, focus: focus === "right" })}
            type="icon--youbiankuang"
            onClick={() => setFocus("right")}
          />
        </Space>
        <Space size={0}>
          <IconFont type="icon-empty" />
          <IconFont
            className={cx({
              "cursor-pointer": true,
              focus: focus === "bottom",
            })}
            type="icon--xiabiankuang"
            onClick={() => setFocus("bottom")}
          />
        </Space>
        <IconFont type="icon-empty" />
      </BorderContainer>
      <>
        <Space direction={"vertical"} size={3}>
          <Input
            defaultValue={defaultValue?.[focus]?.width || ""}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={2}
            onChange={e => {
              setProp(props => {
                if (props[propName][focus] === undefined) {
                  props[propName][focus] = {} as BorderConfig;
                }
                props[propName][focus].width = e.target.value;
              }, 500);
            }}
            onBlur={() => {
              if (defaultValue[focus].width === "") {
                setProp(props => {
                  props[propName][focus].width = "0";
                }, 500);
              }
            }}
            size={"small"}
            style={{ width: 150 }}
            suffix="px"
            allowClear
          ></Input>
          <InputColor
            defaultValue={
              defaultValue?.[focus]?.color || { r: 0, g: 0, b: 0, a: 1 }
            }
            propName="color"
            setProp={setProp}
            onChange={color => {
              setProp(props => {
                if (props[propName][focus] === undefined) {
                  props[propName][focus] = {} as BorderConfig;
                }
                props[propName][focus].color = color.rgb;
              }, 500);
            }}
            size={"small"}
            style={{ width: 150 }}
          />
          <Select
            defaultValue={defaultValue?.[focus]?.type || "solid"}
            propName="color"
            setProp={setProp}
            mapData={borderMapData}
            placeholder="solid"
            onChange={value => {
              setProp(props => {
                if (props[propName][focus] === undefined) {
                  props[propName][focus] = {} as BorderConfig;
                }
                props[propName][focus].type = value;
              }, 500);
            }}
            size={"small"}
            style={{ width: 150 }}
          />
        </Space>
      </>
    </>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: BorderProps;
}
export const BorderSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Border {...childProps} />
    </SchemaItem>
  );
};
