/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-11 11:31:37
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-18 12:40:38
 * @Description:
 */
import { useState, useImperativeHandle, Dispatch, SetStateAction } from "react";
import { Spin, Tree } from "antd";
import { useQueryAllGroup } from "@/api/formManage";
import { useQuery } from "@tanstack/react-query";
import { Group } from "./index.d";
import { RenderTitle } from "./RenderTitle";
import { useDispatch } from "react-redux";
import { currentFlowSolutionAllGroupActions } from "@/store/flowSolutionAllGroup.slice";

const expandedKeyArr = ["0"];

interface TreeDemeProps {
  onRef: React.MutableRefObject<any>;
  setGroupId: Dispatch<SetStateAction<string>>;
}

export function TreeDemo(props: TreeDemeProps) {
  const { onRef, setGroupId } = props;
  const dispatch = useDispatch();
  const allGroupClient = useQueryAllGroup();

  const { data, isFetching, refetch } = useQuery<Group[]>(["queryAllGroup"], {
    queryFn: () => allGroupClient(),
    initialData: [],
    onSuccess(data) {
      dispatch(currentFlowSolutionAllGroupActions.setGroups(data));
    },
  });

  useImperativeHandle(onRef, () => {
    return {
      onAdd: refetch,
    };
  });

  const [expandedKeys, setExpandedKeys] = useState(expandedKeyArr);
  const onExpand = expandedKeys => {
    //记录折叠的key值
    setExpandedKeys(expandedKeys);
  };

  if (isFetching) return <Spin />;

  return (
    <Tree
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      defaultSelectedKeys={["0"]}
      onSelect={v => {
        const value = v[0] === "0" ? undefined : v[0];
        setGroupId(value as string);
      }}
      treeData={[
        {
          title: "表单分组",
          key: "0",
          children: data.map(item => ({
            ...item,
            title: item.name,
            key: item.id,
          })),
        },
      ]}
      titleRender={nodeData => (
        <RenderTitle
          name={nodeData.title}
          id={nodeData.key}
          refetch={() => refetch()}
        />
      )}
    />
  );
}
export default TreeDemo;
