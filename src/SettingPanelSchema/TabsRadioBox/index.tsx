/**
 * @author 梁强
 * @date 2023-04-26 星期三
 * @function TabsRadioBox
 * @param {}
 * @return {}
 */
import { useTranslation } from "react-i18next";
import { PanelSchemaProps } from "../types";
import { SchemaItem, SchemaItemType } from "../SchemaItem";
import { setValue } from "../helper";
import { Col, Radio, Row, Space } from "antd";
import React, { memo, useMemo, useState } from "react";
import { useNode } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetState } from "ahooks";
import DepartmentModal, { AcademyComponentViewProps } from "./DepartmentModal";
import UserModal, { UserComponentViewProps } from "./UserModal";
import Tags from "./Tags";

export interface TabsOptionRadioProps {
  label?: string;
  value: string | number;
  colSpan: number;
  [key: string]: any;
}

export interface TabsRadioSchemaProps extends PanelSchemaProps {
  mapData: TabsOptionRadioProps[];
  // eslint-disable-next-line no-unused-vars
  render?: (
    item: Omit<TabsOptionRadioProps, "render">,
    setProp
  ) => React.ReactNode;
  TabsRadioBoxType: "Department" | "User";
  nativeRadio?: boolean;
  [key: string]: any;
}

export const TabsRadioBoxTypeMap = {
  部门: "Department",
  用户: "User",
};

export const TabsRadioBox = memo((props: TabsRadioSchemaProps) => {
  const {
    defaultValue,
    nativeRadio,
    setProp,
    mapData = [],
    propName,
    render,
    ...rest
  } = props;
  const { mainGate, nodeProps } = useNode(node => {
    return {
      mainGate: node.data.props?.mainGate,
      nodeProps: node.data.props,
    };
  });
  const { t } = useTranslation();
  const [radioItem, setRadioItem] = useState();
  const [{ departmentModal, userModal }, setModal] = useSetState({
    departmentModal: false,
    userModal: false,
  });
  /**
   * @author 梁强
   * @date 2023-05-11 星期四
   * @function custom node
   * @param {}
   * @return {}
   */
  const renderDetail = useMemo(() => {
    const filterList = mapData.filter(
      ({ value }) => value === (radioItem || defaultValue)
    );
    if (filterList.length) {
      const [filterListItem] = filterList;
      return filterListItem && render && render(filterListItem, setProp);
    }
    return null;
  }, [mapData, radioItem, defaultValue, render, setProp]);

  /**
   * @author 梁强
   * @date 2023-05-11 星期四
   * @function 渲染额外的节点
   * @param {}
   * @return {}
   */
  const renderNode = useMemo(() => {
    const TabsRadioBoxType = nodeProps.TabsRadioBoxType;
    if (render) {
      return <Col span={24}>{renderDetail}</Col>;
    }
    // 部门
    if (TabsRadioBoxType === TabsRadioBoxTypeMap.部门) {
      if (nodeProps.academyOptionsMode === 1) {
        return;
      }
      return (
        <Row>
          <Col
            style={{
              marginTop: "15px",
              cursor: "pointer",
              color: "#1677ff",
            }}
            span={24}
            onClick={() => setModal({ departmentModal: true })}
          >
            <FontAwesomeIcon icon={"add"} />
            <span style={{ paddingLeft: 5 }}>
              {t("form.Academy.addDepartment", { ns: "editorWidget" })}
            </span>
          </Col>
          <Col span={24} style={{ marginTop: 5 }}>
            <Space style={{ display: "flex", flexWrap: "wrap" }}>
              {(nodeProps?.academyOptions || []).map(item => (
                <Tags
                  url={item.url}
                  label={item.name}
                  key={item.id}
                  onClose={() =>
                    setProp(props => setValue(props, "academyOptions", []), 500)
                  }
                />
              ))}
            </Space>
          </Col>
        </Row>
      );
    }
    // 人员
    if (TabsRadioBoxType === TabsRadioBoxTypeMap.用户) {
      if (nodeProps.userOptionsMode === 1) {
        return;
      }
      return (
        <Row>
          <Col
            style={{
              marginTop: "15px",
              cursor: "pointer",
              color: "#1677ff",
            }}
            span={24}
            onClick={() => setModal({ userModal: true })}
          >
            <FontAwesomeIcon icon={"add"} />
            <span style={{ paddingLeft: 5 }}>
              {t("form.User.addUser", { ns: "editorWidget" })}
            </span>
          </Col>
          <Col span={24} style={{ marginTop: 5 }}>
            <Space style={{ display: "flex", flexWrap: "wrap" }}>
              {(nodeProps?.userOptions || []).map(item => (
                <Tags
                  url={item.url}
                  label={item.name}
                  key={item.id}
                  onClose={() =>
                    setProp(props => setValue(props, "userOptions", []), 500)
                  }
                />
              ))}
            </Space>
          </Col>
        </Row>
      );
    }
    return <></>;
  }, [
    nodeProps.TabsRadioBoxType,
    nodeProps?.academyOptions,
    nodeProps.academyOptionsMode,
    nodeProps?.userOptions,
    nodeProps.userOptionsMode,
    render,
    renderDetail,
    setModal,
    setProp,
    t,
  ]);
  // 原生Radio
  if (nativeRadio) {
    return (
      <Radio.Group
        onChange={e => {
          setRadioItem(e.target.value);
          setProp(props => setValue(props, propName, e.target.value), 500);
        }}
        defaultValue={defaultValue}
        {...rest}
      >
        <Row>
          {mapData.map(({ label, value, colSpan = 24 }) => {
            return (
              <Col span={colSpan} key={value}>
                <Radio value={value}>
                  {t.apply(null, [...[label].flat(999)])}
                </Radio>
              </Col>
            );
          })}
        </Row>
      </Radio.Group>
    );
  }

  return (
    <>
      {mainGate ? (
        <>
          <Radio.Group
            onChange={e => {
              setRadioItem(e.target.value);
              setProp(props => setValue(props, propName, e.target.value), 500);
            }}
            defaultValue={defaultValue}
            {...rest}
          >
            <Row>
              {mapData.map(({ label, value, colSpan = 24 }) => {
                return (
                  <Col span={colSpan} key={value}>
                    <Radio value={value}>
                      {t.apply(null, [...[label].flat(999)])}
                    </Radio>
                  </Col>
                );
              })}
              {renderNode}
            </Row>
          </Radio.Group>
          {departmentModal && (
            <DepartmentModal
              visible={departmentModal}
              nodeProps={nodeProps as AcademyComponentViewProps}
              onOk={val => {
                setProp(props => setValue(props, "academyOptions", val), 500);
                setModal({ departmentModal: false });
              }}
              onCancel={() => setModal({ departmentModal: false })}
            />
          )}
          {userModal && (
            <UserModal
              visible={userModal}
              nodeProps={nodeProps as UserComponentViewProps}
              onOk={val => {
                setProp(props => setValue(props, "userOptions", val), 500);
                setModal({ userModal: false });
              }}
              onCancel={() => setModal({ userModal: false })}
            />
          )}
        </>
      ) : undefined}
    </>
  );
});

export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: TabsRadioSchemaProps;
}

export const TabsRadioSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <TabsRadioBox {...childProps} />
    </SchemaItem>
  );
};
