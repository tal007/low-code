/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-06-08 16:54:51
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-08 16:58:54
 * @FilePath: \mylcp_web\src\page\OA\Components\ConditionComponent\conditionType.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ConditionGroup {
  groupId: string;
  connectType: "AND" | "OR";
  name: string;
  order?: number;
  conditionModel: ConditionModel[];
}

interface ConditionModel {
  modelId: string;
  order?: number;
  computeModel: ComputeModel[];
  dataOrigin: DataOrigin;
}

interface ComputeModel {
  presetsData: {
    numberData?: number;
    moreNumber?: number;
    moreCode?: string;
    lessCode?: string;
    lessNumber?: number;
  };
  operationType: string;
}

interface DataOrigin {
  dataName: string;
  dataId: string;
}

interface PresetsData {
  numberData?: number;
  moreNumber?: number;
  moreCode?: string;
  lessCode?: string;
  lessNumber?: number;
}
