/**
 * @author 梁强
 * @date 2023-05-09 星期二
 * @function 上传之前校验
 * @param {}
 * @return {}
 */
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import { UploadExtendsProps } from "./index.d";
import { message } from "antd";

/**
 * @author 梁强
 * @date 2023-05-09 星期二
 * @function 校验文件类型
 * @param {}
 * @return {}
 */
const verificationFileType = (file: RcFile, acceptMimeArr: string[]) =>
  acceptMimeArr.includes(`.${file.type.split("/")[1]}`);

/**
 * @author 梁强
 * @date 2023-05-09 星期二
 * @function 校验文件大小
 * @param {}
 * @return {}
 */
const verificationFileSize = (file: RcFile, fileMaxSize: number) =>
  file.size / 1024 / 1024 < fileMaxSize;

export const transformUploadProps = (props: Partial<UploadExtendsProps>) => {
  const { maxMb, mime = [] } = props;
  const acceptMime = mime.filter(item => !!item).join(",");
  const acceptMimeArr = acceptMime.split(",");
  const uploadProps: UploadProps = {
    ...props,
    multiple: true,
    accept: mime.length ? acceptMime : undefined,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload(file: RcFile) {
      // 校验文件类型
      if (!verificationFileType(file, acceptMimeArr)) {
        message.warning(`文件类型上传错误，请参考设置: ${acceptMime}`);
        return false;
      }
      // 校验文件大小
      if (!verificationFileSize(file, maxMb)) {
        message.warning(`文件大小上传错误, 请参考设置：${maxMb}`);
        return false;
      }

      return true;
    },
  };

  return uploadProps;
};
