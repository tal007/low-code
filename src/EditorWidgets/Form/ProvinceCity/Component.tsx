/*
 * @Date: 2023-04-24 10:18:20
 * @LastEditTime: 2023-05-19 11:00:22
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 省市区组件
 */
import { useState } from "react";
import { Cascader as CascaderPC, Input as InputPC } from "antd";
import { Cascader as CascaderMobile, TextArea } from "antd-mobile";
import {
  ComponentProps,
  CascaderOption,
  CascaderValue,
  CascaderValueExtend,
  CascaderMobileProps,
  MobileCascaderContainerProps,
} from "./index.d";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { getCascaderOptions, getTownOptions } from "./cascaderOptions";
import styled from "styled-components";
import { FlexBox } from "@/style";
import "./index.less";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import {
  useProvinces,
  useAreas,
  useCities,
  useStreets,
} from "@/api/china-division";

const MobileCascaderContainer = styled.div<MobileCascaderContainerProps>`
  margin-top: 10px;
  border-bottom: 1px solid ${props => props.borderBottomColor};
  & .mobileInput::after {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-top: 1px solid ${props => props.arrowColor};
    border-right: 1px solid ${props => props.arrowColor};
    transform: rotate(45deg);
  }
`;

const CascaderMobileComponent = (props: CascaderMobileProps) => {
  const { placeholder, options, onSelect } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [, setShowValue] = useState(""); // 选择后展示值
  const dom = useMobilePopupContainer();

  const onClose = () => {
    setVisible(false);
  };
  const onClick = () => {
    setVisible(true);
  };
  const onConfirm = (value: CascaderValue[], extend: CascaderValueExtend) => {
    console.log(value, extend);
    onSelect(value, extend);
    setShowValue(
      extend.items.map((item: CascaderOption) => item.label).join(",")
    );
  };
  return (
    <MobileCascaderContainer borderBottomColor="#ccc" arrowColor="#aaa">
      <CascaderMobile
        options={options}
        visible={visible}
        onConfirm={onConfirm}
        onClose={onClose}
        placeholder={placeholder}
        getContainer={dom}
      >
        {items => {
          return (
            <RenderChild className="render-child" onClick={onClick}>
              {items.every(item => item === null)
                ? placeholder
                : items.map(item => item?.label ?? "未选择").join("-")}
            </RenderChild>
          );
        }}
      </CascaderMobile>
    </MobileCascaderContainer>
  );
};
const Component = (props: Partial<ComponentProps>) => {
  const { platform, format } = props;
  const { t } = useTranslation();
  const autoRows = { minRows: 2, maxRows: 6 };
  const placeholder: string = t("form.ProvinceCity.placeholder", {
    ns: "editorWidget",
  });
  const formatAreaLabel: string = t("form.ProvinceCity.formatArea", {
    ns: "editorWidget",
  });
  const townLabel: string = t("form.ProvinceCity.town", { ns: "editorWidget" });
  const detailAddressLabel: string = t("form.ProvinceCity.detailAddress", {
    ns: "editorWidget",
  });
  const dynamicLabel: string = t("form.ProvinceCity.format" + format, {
    ns: "editorWidget",
  });
  const [provinceSelect, setProvinceSelect] = useState<string[]>([]);
  // 选择省市或省市区
  const onChange = (value: string[]) => {
    console.log(value);
    setProvinceSelect(value);
    // setValue(value);
  };
  // 选择街道
  const onChangeTown = (value: string[]) => {
    console.log(value);
    // setValue(value);
  };
  const provinces = useProvinces();
  const streets = useStreets();
  const areas = useAreas();
  const cities = useCities();

  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        format === "Town" ? (
          <>
            <CascaderMobileComponent
              options={getCascaderOptions(format, cities, areas, provinces)}
              label={formatAreaLabel}
              placeholder={placeholder + formatAreaLabel}
              onSelect={onChange}
            />
            <CascaderMobileComponent
              options={getTownOptions(provinceSelect, streets)}
              label={townLabel}
              placeholder={placeholder + townLabel}
              onSelect={onChangeTown}
            />
            <TextArea
              className="detail-address"
              autoSize={autoRows}
              placeholder={detailAddressLabel}
            />
          </>
        ) : (
          <CascaderMobileComponent
            options={getCascaderOptions(format, cities, areas, provinces)}
            label={formatAreaLabel}
            placeholder={placeholder + dynamicLabel}
            onSelect={onChange}
          />
        )
      ) : format === "Town" ? (
        <>
          <FlexBox justify={"space-between"}>
            <CascaderPC
              className="cascader-left"
              options={getCascaderOptions(format, cities, areas, provinces)}
              onChange={onChange}
              placeholder={placeholder + formatAreaLabel}
            />
            <CascaderPC
              className="cascader-right"
              options={getTownOptions(provinceSelect, streets)}
              onChange={onChangeTown}
              placeholder={placeholder + townLabel}
            />
          </FlexBox>
          <InputPC.TextArea
            className="detail-address"
            allowClear
            autoSize={autoRows}
            placeholder={detailAddressLabel}
          />
        </>
      ) : (
        <CascaderPC
          style={{ width: "100%" }}
          options={getCascaderOptions(format, cities, areas, provinces)}
          onChange={onChange}
          placeholder={placeholder + dynamicLabel}
        />
      )}
    </FormWidgetContainer>
  );
};
export default Component;
const RenderChild = styled.div`
  height: 40px;
  line-height: 40px;
  color: gray;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
