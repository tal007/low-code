/*
 * @Date: 2022-10-13 17:03:04
 * @LastEditTime: 2023-05-22 11:26:42
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { useTranslation } from "react-i18next";
import { SettingProviderProps } from "../SettingProvider";

export interface WidthAndHeight {
  width: string;
  height: string;
}

export const widthAndHeightDefault = {
  width: "100%",
  height: "auto",
};

const WidthOrHeightTip = ({ tip }: { tip: string }) => {
  const { t } = useTranslation();

  return <>{t(`styleTip.${tip}`, { ns: "style" })}</>;
};

export const widthAndHeightRender = (): SettingProviderProps => {
  return {
    container: {
      header: "propSettingHeader.widthAndHeight",
      children: [
        {
          component: "InputSchema",
          parentProps: {
            label: ["width", { ns: "style" }],
            showQuestionIcon: true,
            questionPopover: <WidthOrHeightTip tip={"widthTip"} />,
          },
          childProps: {
            propName: "width",
          },
        },
        {
          component: "InputSchema",
          parentProps: {
            label: ["height", { ns: "style" }],
            showQuestionIcon: true,
            questionPopover: <WidthOrHeightTip tip={"heightTip"} />,
          },
          childProps: {
            propName: "height",
          },
        },
      ],
    },
  };
};
