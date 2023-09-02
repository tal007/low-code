/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Date: 2022-10-10 16:37:11
 * @LastEditTime: 2023-05-22 11:28:50
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: setting 面板容器
 */

import { rewriteSettingProviderField } from "@/EditorWidgets/CommonSettings";
import { Schema } from "@/SettingPanelSchema";
import { SchemaItemType } from "@/SettingPanelSchema/SchemaItem";
import { CaretRightOutlined } from "@ant-design/icons";
import { useNode } from "@craftjs/core";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

export interface SettingProviderChildrenProps {
  component: keyof typeof Schema;
  parentProps: Omit<SchemaItemType, "children">;
  childProps: {
    propName: string;
    defaultValue?: any;
    [keys: string]: any;
  };
  hidden?: (props: any) => boolean;
}

export interface SettingProviderProps {
  [key: string]: {
    translate?: false; // 是否翻译，默认不传入表示采用多语言翻译，传入false表示不翻译
    header: string | [string, object];
    children: SettingProviderChildrenProps[];
  };
}

export const getDefaultValue = (
  props: { [key: string]: any },
  propName: string
): any => {
  const propNameArr = propName.split(".");
  const result = propNameArr.reduce((acc, propName) => {
    return acc[propName];
  }, props);

  return result;
};

export const SettingProvider =
  (settings: SettingProviderProps, inject = true) =>
  () => {
    settings = inject ? rewriteSettingProviderField(settings) : settings;
    const {
      actions: { setProp },
      ...props
    } = useNode(node => {
      const res: { [key: string]: any } = {};
      Object.values(settings).forEach(item => {
        item.children.forEach(child => {
          const prop = child.childProps.propName;
          res[prop] = getDefaultValue(node.data.props, prop);
        });
      });
      return res;
    });

    const { t } = useTranslation();

    return (
      <>
        <Collapse
          defaultActiveKey={Object.keys(settings)}
          expandIconPosition={"end"}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          size={"small"}
        >
          {Object.keys(settings).map(item => {
            const data = settings[item];

            return (
              <Panel
                key={item}
                header={
                  data.translate === undefined
                    ? t.apply(null, [...[data.header].flat(9)])
                    : data.header
                }
              >
                {data.children.map(child => {
                  const component = child.component;
                  const Field = Schema[component];

                  if (child.hidden && child.hidden(props)) return;

                  const ChildProps = {
                    setProp,
                    defaultValue: props[child.childProps.propName],
                    mapData: child.childProps.mapData,
                    ...child.childProps,
                  };

                  if (
                    component !== "RadioGroupSchema" &&
                    component !== "CheckboxGroupSchema" &&
                    component !== "SelectSchema" &&
                    component !== "TabsRadioSchema" &&
                    component !== "MultipleCheckboxSchema"
                  ) {
                    delete ChildProps.mapData;
                  }

                  return (
                    <Field
                      key={child.childProps.propName}
                      parentProps={child.parentProps}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      childProps={ChildProps}
                    />
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </>
    );
  };
