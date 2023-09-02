/*
 * @Date: 2023-05-17 14:17:41
 * @LastEditTime: 2023-05-22 14:06:17
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: ts定义
 */
import { Enum } from "@/SettingPanelSchema/Select";

export interface DepartmentMemberProps {
  show: boolean;
  onCancel?: () => void;
  onConfirm?: (selectNodes: Partial<Enum>[]) => void;
}

export interface OrganizeStructProps {
  titles: string[];
}

export interface CheckboxComponentProps {
  type: string;
  options: Partial<Enum>[];
  title: string;
  search?: boolean;
  onCheck: (list: (string | number)[], type: string) => void;
}
