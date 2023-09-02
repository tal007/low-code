/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-16 18:37:35
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @LastEditTime: 2023-05-22 13:47:06
 * @FilePath: \mylcp_web\src\page\OA\Components\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ReactElement } from "react";
import ApproveComponent from "./ApproveComponent";
import ConditionComponent from "./ConditionComponent";
import StartComponent from "./StartComponent";
import CopyComponent from "./CopyComponent";

interface ExoticComponent<P = object> {
  (props: P): ReactElement | null;
}

export type FlowComponentMetas<C extends ExoticComponent<any>> = {
  Comp: C;
  props: Parameters<C>[0];
};

export interface IFlowComponentMetas {
  approve: FlowComponentMetas<typeof ApproveComponent>;
  start: FlowComponentMetas<typeof StartComponent>;
  condition: FlowComponentMetas<typeof ConditionComponent>;
  copy: FlowComponentMetas<typeof CopyComponent>;
}

// type ApproveComponentType = FlowComponentMetas<typeof ApproveComponent>

export { ApproveComponent, StartComponent, ConditionComponent, CopyComponent };
