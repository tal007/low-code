/*
 * @Date: 2022-11-03 17:33:29
 * @LastEditTime: 2023-01-09 11:21:47
 * @LastEditors: 刘玉田
 * @Description: 刷新页面
 */

import { ActionDesc, NoConfigurationRequired } from "./Common";

export const Refresh = () => {
  const { t } = useTranslation();

  return (
    <ActionDesc desc={t("event.refresh")}>
      <NoConfigurationRequired />
    </ActionDesc>
  );
};
