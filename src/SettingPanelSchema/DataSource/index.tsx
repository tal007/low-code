/*
 * @Date: 2022-10-14 10:46:35
 * @LastEditTime: 2023-05-23 15:46:33
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 数据来源
 */

import {
  KeyValueInput,
  KeyValueInputItemProps,
} from "@/SettingPanelSchema/components/KeyValueInput";
import { useState } from "react";
import { RadioGroupChildProps, RadioGroupSchema } from "../RadioGroup";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { PanelSchemaProps } from "../types";
import { useMemo } from "react";
import { ChooseFromOtherForm } from "@/SettingPanelSchema/components/ChooseFromOtherForm";
import { CustomSQLSelect } from "../components/CustomSQLSelect";

export type DataSourceType =
  | "static"
  | "url"
  | "link"
  | "dataDictionary"
  | "sql";

const MAP_DATA: RadioGroupChildProps[] = [
  { label: "dataSourceProp.static", value: "static" },
  // { label: "dataSourceProp.URL", value: "url" },
  { label: "dataSourceProp.link", value: "link" },
  // { label: "dataSourceProp.dictionary", value: "dataDictionary" },
  { label: "dataSourceProp.SQL", value: "sql" },
];
export interface DataSourceProps extends PanelSchemaProps {
  defaultValue: {
    dataSourceType: DataSourceType;
    staticData?: Omit<KeyValueInputItemProps, "id">[];
  };
}

export const DataSource = (props: DataSourceProps) => {
  const { setProp, defaultValue, propName } = props;
  const [radioValue, setRadioValue] = useState(defaultValue.dataSourceType);

  const StaticChild = useMemo(() => {
    if (radioValue !== "static") return null;
    return (
      <KeyValueInput
        defaultValue={defaultValue.staticData}
        onHandler={newValue => {
          setProp(props => {
            props[propName].staticData = newValue;
          }, 500);
        }}
      />
    );
  }, [defaultValue.staticData, propName, radioValue, setProp]);

  const LinkChild = useMemo(() => {
    if (radioValue !== "link") return null;
    return (
      <ChooseFromOtherForm
        onFieldSelected={value => {
          console.log(value);
        }}
        onFormSelected={value => {
          console.log(value);
        }}
      />
    );
  }, [radioValue]);

  const CustomSQL = useMemo(() => {
    if (radioValue !== "sql") return null;
    return <CustomSQLSelect />;
  }, [radioValue]);

  return (
    <>
      <RadioGroupSchema
        parentProps={{ label: "dataSourceProp.origin", direction: "column" }}
        childProps={{
          defaultValue: radioValue,
          propName: "dataSourceType",
          setProp,
          onChange: e => {
            setProp(props => {
              setRadioValue(e.target.value);
              props[propName].dataSourceType = e.target.value;
            }, 500);
          },
          optionType: "default",
          mapData: MAP_DATA,
        }}
      />
      {StaticChild}
      {LinkChild}
      {CustomSQL}
    </>
  );
};

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: DataSourceProps;
}
export const DataSourceSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;
  return (
    <SchemaItem {...parentProps}>
      <DataSource {...childProps} />
    </SchemaItem>
  );
};
