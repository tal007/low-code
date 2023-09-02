/*
 * @Date: 2023-05-15 17:46:20
 * @LastEditTime: 2023-05-17 12:40:54
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 流程设计ts定义
 */

export interface DataType {
  key: string;
  name: string;
  editable: string;
  readOnly: string;
  hide: string;
  required: boolean;
}
export interface colProps {
  title: string;
  dataIndex: string;
  editable: boolean;
}
export interface OperateAuthProps {
  id: string;
}

export interface TableBodyComponentProps {
  id: string;
}
