/*
 * @Date: 2023-05-12 17:38:52
 * @LastEditTime: 2023-05-12 17:43:30
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 统计组件
 */
import { Statistic as AntdStatistic } from "antd";
import { StatisticProps } from "./index.d";
import { generateFontStyle } from "@/SettingPanelSchema/settingRender/font";
import * as icons from "@ant-design/icons";

const Component = (props: Partial<StatisticProps>) => {
  const { prefix, suffix, value, title, font } = props;

  return (
    <AntdStatistic
      prefix={prefix ? React.createElement(icons[prefix]) : null}
      suffix={suffix}
      value={value}
      title={title}
      valueStyle={generateFontStyle(font)}
    />
  );
};
export default Component;
