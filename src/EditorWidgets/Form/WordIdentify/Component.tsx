/*
 * @Date: 2023-04-24 10:18:20
 * @LastEditTime: 2023-05-04 11:19:12
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 文字识别组件
 */
import { useState } from "react";
import { message, Upload, Modal, Input as InputPC } from "antd";
import { ImageUploader, TextArea } from "antd-mobile";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import { recognize } from "tesseract.js";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { ComponentProps, UploadComponentProps } from "./index.d";

// 识别图片上的文字
const identifyText = async (imgUrl: string) => {
  const { data } = await recognize(imgUrl, "chi_sim", {
    workerBlobURL: true,
    logger: (m: any) => console.log("logger", m),
  });
  return data.text.match(/[a-zA-Z0-9_\u4e00-\u9fa5]+/g).join("");
};
const uploadButton = (
  <div>
    <UploadOutlined />
    <div style={{ marginTop: 8 }}>请上传图片</div>
  </div>
);
const UploadComponentMobile = (props: UploadComponentProps) => {
  const { accept, maxCount, size, placeholder } = props;
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const beforeUpload = (file: File) => {
    setInputValue("");
    if (file.size > size) {
      message.error("图片大小超过限制");
      return null;
    }
    return file;
  };
  const mockUpload = async (file: File) => {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    const imgUrl = URL.createObjectURL(file);
    setInputValue(await identifyText(imgUrl));
    return {
      url: imgUrl,
    };
  };
  const onChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <>
      <ImageUploader
        accept={accept}
        value={fileList}
        onChange={setFileList}
        beforeUpload={beforeUpload}
        upload={mockUpload}
        maxCount={maxCount}
        showUpload={fileList.length < maxCount}
      />

      <div>
        <p className="label">识别内容</p>
        <TextArea
          value={inputValue}
          onChange={onChange}
          placeholder={placeholder}
          autoSize={true}
        />
      </div>
    </>
  );
};
const UploadComponentPC = (props: UploadComponentProps) => {
  const { accept, maxCount, size, placeholder } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>();
  const beforeUpload = (file: RcFile) => {
    setInputValue("");
    if (file.size > size) {
      message.error("图片大小超过限制");
      return Upload.LIST_IGNORE;
    }
    return file;
  };
  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const file = info.file;
    const imgUrl = URL.createObjectURL(file.originFileObj as File);
    setPreviewImage(imgUrl);
    setFileList(info.fileList);
    setInputValue(await identifyText(imgUrl));
  };
  const handlePreview = (file: UploadFile) => {
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };
  const handleCancel = () => setPreviewOpen(false);

  const onChange = e => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <Upload
        listType="picture-card"
        maxCount={maxCount}
        accept={accept}
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {fileList.length ? null : uploadButton}
      </Upload>
      <div>
        <p className="label">识别内容</p>
        <InputPC.TextArea
          value={inputValue}
          onChange={onChange}
          placeholder={placeholder}
          autoSize={true}
        />
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
const Component = (props: Partial<ComponentProps>) => {
  const { platform, placeholder } = props;
  const maxCount = 1; // 限制数量
  const accept = "image/jpeg,image/jpg,image/png"; // 图片类型
  const size = 2 * 1024 * 1024;
  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        <UploadComponentMobile
          maxCount={maxCount}
          accept={accept}
          size={size}
          placeholder={placeholder}
        />
      ) : (
        <UploadComponentPC
          maxCount={maxCount}
          accept={accept}
          size={size}
          placeholder={placeholder}
        />
      )}
    </FormWidgetContainer>
  );
};
export default Component;
