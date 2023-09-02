/*
 * @Date: 2023-04-26 11:06:02
 * @LastEditTime: 2023-04-26 11:07:26
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */
export interface PortalProps {
  children: any;
  id: string;
  show: boolean;
  onClose: function;
  showCloseButton: boolean;
}
