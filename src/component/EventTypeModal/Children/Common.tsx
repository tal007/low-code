/*
 * @Date: 2022-11-03 10:44:26
 * @LastEditTime: 2022-12-23 11:22:10
 * @LastEditors: 刘玉田
 * @Description: 通用
 */

import { MPContainer } from "@/style";
import { Space, Typography, Empty } from "antd";

const { Text } = Typography;

export interface ActionDescProps {
  desc: string;
  children?: React.ReactNode;
}

export const ActionDesc = (props: ActionDescProps) => {
  const { desc, children } = props;
  const { t } = useTranslation();

  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <Text>{t("event.actionDesc")}</Text>
      <Text type="secondary">{desc}</Text>
      <Text>{t("event.basicSetting")}</Text>
      {children}
      {/* <Text>{t("event.highSetting")}</Text> */}
    </Space>
  );
};

export const NoConfigurationRequired = () => {
  const { t } = useTranslation();
  return (
    <MPContainer margin={"40px 0"} padding={0}>
      <Empty
        image="/svg/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={t("event.doNotSetting")}
      ></Empty>
    </MPContainer>
  );
};
