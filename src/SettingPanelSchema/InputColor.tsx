/*
 * @Date: 2022-10-09 11:43:31
 * @LastEditTime: 2022-12-12 10:18:50
 * @LastEditors: 刘玉田
 * @Description: 颜色选择器
 */

import { Input } from "antd";
import { ColorResult, RGBColor } from "react-color";
import { useState, useMemo } from "react";
import colorToRGBA, { checkValueIsColor } from "@/utils/colorToRgba";
import { PanelSchemaProps } from "./types";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { ColorPicker } from "@/component/ColorPicker";
import { setValue } from "./helper";

export interface InputColorProps extends PanelSchemaProps {
  defaultValue: RGBColor;
  onChange?: (value: ColorResult) => void;
  [key: string]: any;
}
export const InputColor = (props: InputColorProps) => {
  const { propName, setProp, defaultValue, onChange, ...rest } = props;

  const [chooseColorVisible, setChooseColorVisible] = useState(false);
  const handleChange = (color: ColorResult) => {
    onChange
      ? onChange(color)
      : setProp(props => setValue(props, propName, color.rgb), 500);

    setInputValue(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  const defaultColor = useMemo(
    () =>
      `rgba(${defaultValue.r},${defaultValue.g},${defaultValue.b},${defaultValue.a})`,
    [defaultValue]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (checkValueIsColor(value)) {
      const [r, g, b, a] = colorToRGBA(value)
        .split("(")[1]
        .split(")")[0]
        .split(",");
      setProp(props => setValue(props, propName, { r, g, b, a }), 500);
      setInputValue(colorToRGBA(value));
    } else {
      setInputValue(value);
    }
  };

  const onBlur = () => {
    setInputValue(defaultColor);
  };

  const [inputValue, setInputValue] = useState(defaultColor);

  return (
    <>
      <Input
        value={inputValue}
        defaultValue={defaultColor}
        onChange={handleInputChange}
        onFocus={() => setChooseColorVisible(true)}
        onBlur={onBlur}
        style={{ width: 200 }}
        addonAfter={
          <ColorPicker
            chooseColorVisible={chooseColorVisible}
            setChooseColorVisible={setChooseColorVisible}
            handleChange={handleChange}
            defaultColor={defaultColor}
          />
        }
        {...rest}
      />
    </>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: InputColorProps;
}
export const InputColorSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <InputColor {...childProps} />
    </SchemaItem>
  );
};
