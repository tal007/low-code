import FormWidgetContainer from "@/EditorWidgets/Common/FormWidgetContainer";
import { CascaderComponentProps } from "./index.d";
import { Cascader as CascaderPC } from "antd";
import { Cascader as CascaderMobile } from "antd-mobile";

const Component = (props: Partial<CascaderComponentProps>) => {
  const { platform, placeholder } = props;
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        <CascaderMobile
          options={options}
          placeholder={placeholder}
        ></CascaderMobile>
      ) : (
        <CascaderPC options={options} placeholder={placeholder}></CascaderPC>
      )}
    </FormWidgetContainer>
  );
};
export default Component;
