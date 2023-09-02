/*
 * @Date: 2023-05-19 13:39:16
 * @LastEditTime: 2023-05-19 18:03:20
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: ts定义
 */

import { FormInstance } from "antd";

export interface SetApproverProps {
  settingLabel?: string;
  isApprover?: boolean;
  approverSettingsId?: string;
  form?: FormInstance;
}
