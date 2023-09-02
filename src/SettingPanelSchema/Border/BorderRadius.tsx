/*
 * @Date: 2022-10-26 15:37:59
 * @LastEditTime: 2023-05-04 10:57:11
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 圆角
 */

import { IconFont } from "@/component/IconFont";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import { RadioGroup } from "./../RadioGroup";
import { useState } from "react";
import { FlexBox, MPContainer } from "@/style";
import { InputNumber } from "../InputNumber";

export interface BorderRadiusProps extends PanelSchemaProps {
  defaultValue: {
    all: {
      open: boolean;
      value: number;
    };
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
}

export type BorderRadiusConfig = object;

const radioMapData = [
  { label: <IconFont type="icon-yuanjiaofangkuang" />, value: "all" },
  { label: <IconFont type="icon-yuanjiao" />, value: "part" },
];

export const BorderRadius = (props: BorderRadiusProps) => {
  const { defaultValue, setProp, propName } = props;
  const [radioValue, setRadioValue] = useState<string>(
    defaultValue.all.open ? "all" : "part"
  );

  return (
    <FlexBox direction={"column"}>
      <RadioGroup
        defaultValue={radioValue}
        mapData={radioMapData}
        setProp={setProp}
        propName={"borderRadius"}
        onChange={e => {
          setRadioValue(e.target.value);
          setProp(
            props => (props[propName].all.open = e.target.value === "all")
          );
        }}
      />
      {radioValue === "all" && (
        <MPContainer margin={20} padding={0}>
          <InputNumber
            defaultValue={defaultValue.all.value}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={3}
            onChange={value => {
              setProp(props => {
                props[propName].all.value = value;
              }, 500);
            }}
            style={{ width: "100%" }}
            addonAfter="px"
            addonBefore={<IconFont type="icon-yuanjiaofangkuang" />}
            min={0}
            max={999}
          />
        </MPContainer>
      )}
      {radioValue === "part" && (
        <MPContainer margin={"20px"} padding={0}>
          <InputNumber
            defaultValue={defaultValue.topLeft}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={3}
            onChange={value => {
              setProp(props => {
                props[propName].topLeft = value;
              }, 500);
            }}
            style={{ width: "100%" }}
            addonAfter="px"
            addonBefore={
              <IconFont style={{ fontSize: 18 }} type="icon-radius-upleft" />
            }
          />
          <InputNumber
            defaultValue={defaultValue.topRight}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={3}
            onChange={value => {
              setProp(props => {
                props[propName].topRight = value;
              }, 500);
            }}
            style={{ width: "100%" }}
            addonAfter="px"
            addonBefore={
              <IconFont style={{ fontSize: 18 }} type="icon-radius-upright" />
            }
            min={0}
            max={999}
          />
          <InputNumber
            defaultValue={defaultValue.bottomLeft}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={3}
            onChange={value => {
              setProp(props => {
                props[propName].bottomLeft = value;
              }, 500);
            }}
            style={{ width: "100%" }}
            addonAfter="px"
            addonBefore={
              <IconFont
                style={{ fontSize: 18 }}
                type="icon-radius-bottomleft"
              />
            }
            min={0}
            max={999}
          />
          <InputNumber
            defaultValue={defaultValue.bottomRight}
            propName="color"
            setProp={setProp}
            placeholder={"0"}
            maxLength={3}
            onChange={value => {
              setProp(props => {
                props[propName].bottomRight = value;
              }, 500);
            }}
            style={{ width: "100%" }}
            addonAfter="px"
            addonBefore={
              <IconFont
                style={{ fontSize: 18 }}
                type="icon-radius-bottomleft"
              />
            }
            min={0}
            max={999}
          />
        </MPContainer>
      )}
    </FlexBox>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: BorderRadiusProps;
}
export const BorderRadiusSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <BorderRadius {...childProps} />
    </SchemaItem>
  );
};
