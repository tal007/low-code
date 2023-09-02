/*
 * @Date: 2022-12-26 15:20:29
 * @LastEditTime: 2022-12-26 15:22:00
 * @LastEditors: 刘玉田
 * @Description: 提示信息
 */

import { ProFormText } from "@ant-design/pro-components";

export const PromptInformation = () => {
  const { t } = useTranslation();

  return (
    <>
      <ProFormText
        name={"requestSuccess"}
        label={t("querySetting.requestSuccess")}
      ></ProFormText>
      <ProFormText
        name={"requestFailure"}
        label={t("querySetting.requestFailure")}
      ></ProFormText>
    </>
  );
};
