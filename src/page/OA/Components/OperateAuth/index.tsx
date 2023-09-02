/*
 * @Date: 2023-05-15 17:39:18
 * @LastEditTime: 2023-05-22 15:28:46
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 表单权限设置
 */
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Form, Radio, RadioChangeEvent } from "antd";
import { currentEditorConfig } from "@/store/editor.slice";
import { formAuthTableColumns } from "./constant";
import styled from "styled-components";
import { DataType, TableBodyComponentProps, OperateAuthProps } from "./index.d";

const EditableTableContainer = styled.div`
  .table-content {
    padding-left: 0;
    width: 100%;
    .table-head,
    .table-body {
      display: block;
    }

    .form-item-content {
      margin-bottom: 0;
    }
    .table-head {
      li {
        list-style: none;
        flex: 1;
      }
      .field-name,
      li {
        padding: 16px;
        background-color: #fafafa;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 600;
      }
    }
    .tr-content {
      display: flex;
      .field-btn-content {
        flex: 1;
        display: flex;
      }
      .field-name,
      .td-content {
        padding: 16px;
      }
      .td-content {
        flex: 1;
      }
    }
    .field-name {
      width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .field-name::before {
      margin-right: 5px;
      content: "*";
      color: rgba(0, 0, 0, 0);
    }
    .required::before {
      color: #f00;
    }
  }
`;

const TableHeadComponent = () => {
  const nameColumns = formAuthTableColumns[0];
  const editColumns = formAuthTableColumns.filter(item => item.editable);
  return (
    <div className="tr-content">
      <span className="field-name" title={nameColumns.title}>
        {nameColumns.title}
      </span>
      <div className="field-btn-content">
        {editColumns.map(item => {
          return <li key={item.dataIndex}>{item.title}</li>;
        })}
      </div>
    </div>
  );
};

const TableBodyComponent = (props: TableBodyComponentProps) => {
  const { id } = props;
  const currentState = useSelector(currentEditorConfig);
  const [nodes] = useState<string>(currentState.nodes);
  const defaultData: DataType[] = useMemo(() => {
    if (!Object.keys(nodes).length) {
      return;
    }
    const formComponents = Object.values(
      JSON.parse(nodes, (key, value) => {
        if (key === "ROOT") return undefined;
        return value;
      })
    );
    return formComponents.map((item: any) => {
      const { id: itemId, name, required } = item.props;
      return {
        key: id + "_" + itemId + "_" + name,
        name,
        required: required || false,
        editable: "editable",
        readOnly: "readOnly",
        hide: "hide",
      };
    });
  }, [nodes, id]);
  const [sourceData] = useState<DataType[]>(defaultData || []);
  const changeHandler = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    console.log(value);
  };
  return (
    <>
      {sourceData.map(item => {
        return (
          <li className="table-body" key={item.key + "-tr"}>
            <Form.Item
              className="form-item-content"
              name={item.key}
              key={item.key + "-form-item"}
            >
              <div className="tr-content">
                <span
                  className={
                    item.required ? "field-name required" : "field-name"
                  }
                  key={item.key + "-name"}
                  title={item.name}
                >
                  {item.name}
                </span>
                <Radio.Group
                  className="field-btn-content"
                  name={item.key + "-radio-group"}
                  onChange={changeHandler}
                  key={item.key + "-radio-group"}
                >
                  <Radio
                    value={item.editable}
                    className="td-content"
                    key={item.key + "-editable"}
                  />
                  <Radio
                    value={item.readOnly}
                    className="td-content"
                    key={item.key + "-readOnly"}
                  />
                  <Radio
                    value={item.hide}
                    className="td-content"
                    key={item.key + "-hide"}
                  />
                </Radio.Group>
              </div>
            </Form.Item>
          </li>
        );
      })}
    </>
  );
};
const OperateAuth = (props: OperateAuthProps) => {
  const { id } = props;

  return (
    <EditableTableContainer>
      <ul className="table-content">
        <li className="table-head">
          <TableHeadComponent />
        </li>
        <TableBodyComponent id={id} />
      </ul>
    </EditableTableContainer>
  );
};

export default OperateAuth;
