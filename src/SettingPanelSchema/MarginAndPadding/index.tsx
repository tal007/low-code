/*
 * @Date: 2022-10-26 15:38:57
 * @LastEditTime: 2022-10-27 10:47:47
 * @LastEditors: 刘玉田
 * @Description: 内外边距
 */

import "./index.less";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";

export interface MarginAndPaddingProps extends PanelSchemaProps {
  defaultValue: {
    margin: (number | string)[];
    padding: (number | string)[];
  };
}

export const MarginAndPadding = (props: MarginAndPaddingProps) => {
  const { setProp, defaultValue, propName } = props;
  const { margin, padding } = defaultValue;

  const handleChange = (value: string, key: string, index: number) => {
    setProp(props => (props[propName][key][index] = value));
  };

  return (
    <div className="margin-and-padding">
      <div className="container margin-top-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={margin[0]}
          onChange={e => handleChange(e.target.value, "margin", 0)}
        />
      </div>
      <div className="container margin-right-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={margin[1]}
          onChange={e => handleChange(e.target.value, "margin", 1)}
        />
      </div>
      <div className="container margin-bottom-div">
        <span className="help-txt">MARGIN</span>
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={margin[2]}
          onChange={e => handleChange(e.target.value, "margin", 2)}
        />
      </div>
      <div className="container margin-left-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={margin[3]}
          onChange={e => handleChange(e.target.value, "margin", 3)}
        />
      </div>
      <div className="container padding-top-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={padding[0]}
          onChange={e => handleChange(e.target.value, "padding", 0)}
        />
      </div>
      <div className="container padding-right-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={padding[1]}
          onChange={e => handleChange(e.target.value, "padding", 1)}
        />
      </div>
      <div className="container padding-bottom-div">
        <span className="help-txt">PADDING</span>
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={padding[2]}
          onChange={e => handleChange(e.target.value, "padding", 2)}
        />
      </div>
      <div className="container padding-left-div">
        <input
          placeholder="0"
          maxLength={3}
          height="100%"
          autoComplete="off"
          value={padding[3]}
          onChange={e => handleChange(e.target.value, "padding", 3)}
        />
      </div>
    </div>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: MarginAndPaddingProps;
}
export const MarginAndPaddingSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <MarginAndPadding {...childProps} />
    </SchemaItem>
  );
};
