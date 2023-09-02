/*
 * @Date: 2022-10-24 15:31:39
 * @LastEditTime: 2023-05-04 10:50:28
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 上传
 */

import { PanelSchemaProps } from "./types";
import { message, Upload as AntdUpload } from "antd";
import type {
  RcFile,
  UploadFile,
  UploadProps as AntdUploadProps,
} from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { SchemaItem, SchemaItemType } from "./SchemaItem";
import { useTranslation } from "react-i18next";
import { setValue } from "./helper";

export interface UploadProps extends PanelSchemaProps, AntdUploadProps {
  onUploadSuccess?: (url: string) => void;
  [key: string]: any;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const Upload = (props: UploadProps) => {
  const { setProp, onUploadSuccess, propName } = props;
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: AntdUploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
        onUploadSuccess
          ? onUploadSuccess(info.file.response.url)
          : setProp(props => setValue(props, propName, info.file.response.url));
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t("common.upload")}</div>
    </div>
  );

  return (
    <AntdUpload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      action="http://172.18.0.56:3333/mock/43/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </AntdUpload>
  );
};
export interface SchemaProps {
  parentProps: Omit<SchemaItemType, "children">;
  childProps: UploadProps;
}
export const UploadSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem {...parentProps}>
      <Upload {...childProps} />
    </SchemaItem>
  );
};
