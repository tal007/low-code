/*
 * @Date: 2022-11-07 11:32:03
 * @LastEditTime: 2022-12-02 15:41:32
 * @LastEditors: 刘玉田
 * @Description: department 组织管理 部门
 */

import { FlexBox } from "@/style";
import { Detail } from "./Detail";
import { DimensionTree } from "./Tree";
import TreeTable from "./TreeTable";

export const OrgDepartment = () => {
  return (
    <FlexBox justify={"flex-start"} alignItems={"flex-start"}>
      <DimensionTree />
      <FlexBox
        style={{ flex: 1, overflow: "auto" }}
        alignItems={"flex-start"}
        justify={"flex-start"}
      >
        <TreeTable />
      </FlexBox>
      <Detail />
    </FlexBox>
  );
};

export default OrgDepartment;
