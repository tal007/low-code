/*
 * @Date: 2022-11-02 14:55:24
 * @LastEditTime: 2022-11-04 15:07:05
 * @LastEditors: 刘玉田
 * @Description:
 */
import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface DeleteAndAddIconProps {
  add: () => void;
  remove: (key: string) => void;
  key: string;
}

export const renderDeleteAndAddIcon = (props: DeleteAndAddIconProps) => {
  const { add, remove, key } = props;

  return (
    <Space size={14}>
      <FontAwesomeIcon
        className={"mouse-over-primary-color"}
        icon={"add"}
        onClick={e => {
          e.stopPropagation();
          add && add();
        }}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        className={"mouse-over-primary-color"}
        icon={"trash"}
        onClick={e => {
          e.stopPropagation();
          remove && remove(key);
        }}
      ></FontAwesomeIcon>
    </Space>
  );
};
