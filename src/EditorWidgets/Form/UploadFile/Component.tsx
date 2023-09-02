/*
 * @Date: 2023-05-10 13:56:25
 * @LastEditTime: 2023-05-15 14:44:35
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: UploadFile组件
 */
import { Button, Upload } from "antd";
import { UploadExtendsProps } from "./index.d";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AddCircleOutline } from "antd-mobile-icons";
import { useState } from "react";
import { Popup } from "antd-mobile";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import { useTransformUploadProps } from "./hooks";

const Component = (props: Partial<UploadExtendsProps>) => {
  const { platform, name, borderRadius, id } = props;
  const { bottomRight, bottomLeft, topLeft, topRight } = borderRadius;
  const dom = useMobilePopupContainer();
  const [visible, setVisible] = useState(false);
  const uploadProps = useTransformUploadProps({ ...props, name: id });

  return (
    <FormWidgetContainer {...props}>
      {platform !== "mobile" ? (
        <Upload {...uploadProps}>
          <Button
            icon={
              <FontAwesomeIcon
                icon={"paperclip" as IconProp}
                style={{ width: 14, height: 14, marginRight: 4 }}
              />
            }
            style={{
              borderRadius: `${topLeft}px ${topRight}px ${bottomLeft}px ${bottomRight}px`,
            }}
          >
            {name}
          </Button>
        </Upload>
      ) : (
        <>
          <AddCircleOutline
            fontSize={24}
            onClick={() => {
              setVisible(true);
            }}
            style={{ cursor: "pointer" }}
          />
          <Popup
            visible={visible}
            bodyStyle={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              minHeight: "40vh",
            }}
            onMaskClick={() => {
              setVisible(false);
            }}
            getContainer={dom}
          >
            {}
          </Popup>
        </>
      )}
    </FormWidgetContainer>
  );
};

export default Component;
