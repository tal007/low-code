/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-17 14:47:47
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-06 15:36:04
 * @FilePath: \mylcp_web\src\page\OA\Components\ConditionComponent\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Space, FormInstance } from "antd";
import CardComponent from "./CardComponent";

interface ConditionComponentProps {
  form: FormInstance;
}
const ConditionComponent = (props: ConditionComponentProps) => {
  // console.log("ConditionComponent props:", props);
  return (
    <>
      <Space direction="vertical" size={16}>
        <CardComponent></CardComponent>
      </Space>
    </>
  );
};
export default ConditionComponent;
