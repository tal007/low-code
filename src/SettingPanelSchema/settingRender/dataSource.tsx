/*
 * @Date: 2022-10-21 09:36:44
 * @LastEditTime: 2022-10-21 09:39:29
 * @LastEditors: 刘玉田
 * @Description: 数据管理
 */

import { renderProviderSetting } from ".";
import { createSchema } from "..";

export const dataSourceRender = () =>
  renderProviderSetting("dataSource", "propSettingHeader.dataSource", [
    createSchema(
      "DataSourceSchema",
      {
        label: "",
        direction: "column",
      },
      "dataSource"
    ),
  ]);
