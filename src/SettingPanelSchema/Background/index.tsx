/*
 * @Date: 2022-10-24 11:13:53
 * @LastEditTime: 2022-10-24 16:37:23
 * @LastEditors: 刘玉田
 * @Description:
 */

import { RGBColor } from "react-color";
import styled from "styled-components";
import { InputColorSchema } from "../InputColor";
import { RadioGroupChildProps, RadioGroupSchema } from "../RadioGroup";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import { useState } from "react";
import { LinearGradient } from "./LinearGradient";
import { BackgroundImage } from "./Image";

export type BackgroundType = "notSet" | "color" | "linear" | "image";

export interface BackgroundProps extends PanelSchemaProps {
  defaultValue: {
    bgType: BackgroundType;
    color: RGBColor;
    linear: {
      start: RGBColor;
      end: RGBColor;
      angle: number;
      custom: string;
    };
    image: string;
  };
}

const MAP_DATA: RadioGroupChildProps[] = [
  { label: "backgroundProp.notSet", value: "notSet" },
  { label: "backgroundProp.color", value: "color" },
  { label: "backgroundProp.linear", value: "linear" },
  { label: "backgroundProp.image", value: "image" },
];

const BackgroundContainer = styled.div`
  width: 100%;
`;

export const Background = (props: BackgroundProps) => {
  const { setProp, propName, defaultValue } = props;
  const [radioValue, setRadioValue] = useState(defaultValue.bgType);

  return (
    <BackgroundContainer>
      <RadioGroupSchema
        parentProps={{ label: "", direction: "column" }}
        childProps={{
          defaultValue: defaultValue.bgType,
          propName: "bgType",
          setProp,
          onChange: e => {
            setProp(props => {
              setRadioValue(e.target.value);
              props[propName].bgType = e.target.value;
            }, 500);
          },
          mapData: MAP_DATA,
        }}
      />
      {radioValue === "color" && (
        <InputColorSchema
          parentProps={{
            label: "backgroundProp.color",
          }}
          childProps={{
            propName: "color",
            setProp,
            defaultValue: defaultValue.color,
            onChange: color => {
              setProp(props => (props.background.color = color.rgb), 500);
            },
          }}
        />
      )}
      {radioValue === "linear" && (
        <LinearGradient
          setProp={setProp}
          defaultValue={defaultValue}
          propName={"linear"}
        />
      )}
      {radioValue === "image" && (
        <BackgroundImage
          setProp={setProp}
          defaultValue={defaultValue}
          propName={"image"}
        />
      )}
    </BackgroundContainer>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: BackgroundProps;
}
export const BackgroundSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Background {...childProps} />
    </SchemaItem>
  );
};
