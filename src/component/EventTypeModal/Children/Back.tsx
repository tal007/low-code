/*
 * @Date: 2022-11-03 17:33:53
 * @LastEditTime: 2023-01-09 11:21:19
 * @LastEditors: 刘玉田
 * @Description: 回退页面
 */

import { ActionDesc, NoConfigurationRequired } from "./Common";
export const Back = () => {
  const { t } = useTranslation();

  return (
    <ActionDesc desc={t("event.back")}>
      <NoConfigurationRequired />
    </ActionDesc>
  );
};
