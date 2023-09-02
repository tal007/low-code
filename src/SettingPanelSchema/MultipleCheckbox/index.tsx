/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-09 17:06:41
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-19 11:06:07
 * @Description:
 */
/**
 * @author 梁强
 * @date 2023-04-26 星期三
 * @function CheckboxGroupBox
 * @param {}
 * @return {}
 */
import { useTranslation } from "react-i18next";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { setValue } from "../helper";
import { Checkbox, Col, Row } from "antd";
import React, { memo, useMemo, useState } from "react";
import { TabsRadioSchemaProps } from "../TabsRadioBox";

export const MultipleCheckbox = memo((props: TabsRadioSchemaProps) => {
  const { defaultValue, setProp, mapData = [], propName, render } = props;
  const { t } = useTranslation();
  const [selectItem, setSelectItem] = useState([]);

  const renderDetail = useMemo(() => {
    const filterList = mapData.filter(
      ({ value }) => value === (selectItem || defaultValue)
    );
    if (filterList.length) {
      const [filterListItem] = filterList;
      return filterListItem && render && render(filterListItem, setProp);
    }
    return null;
  }, [mapData, selectItem, defaultValue, render, setProp]);

  return (
    <Checkbox.Group
      onChange={e => {
        setSelectItem(e);
        setProp(props => setValue(props, propName, e), 500);
      }}
      defaultValue={defaultValue}
    >
      <Row>
        {mapData.map(({ label, value, render, colSpan = 24 }, i) => {
          if (render && typeof render === "function") {
            return (
              <Col span={colSpan} key={value}>
                <Checkbox value={value}>
                  {render(
                    {
                      label: t.apply(null, [...[label].flat(999)]),
                      value,
                      colSpan,
                    },
                    i
                  )}
                </Checkbox>
              </Col>
            );
          }
          return (
            <Col span={colSpan} key={value}>
              <Checkbox value={value}>
                {t.apply(null, [...[label].flat(999)])}
              </Checkbox>
            </Col>
          );
        })}
        {render && <Col span={24}>{renderDetail}</Col>}
      </Row>
    </Checkbox.Group>
  );
});

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: TabsRadioSchemaProps;
}

export const MultipleCheckboxSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <MultipleCheckbox {...childProps} />
    </SchemaItem>
  );
};
