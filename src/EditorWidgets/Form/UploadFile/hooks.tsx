/**
 * @author 梁强
 * @date 2023-05-09 星期二
 * @function 上传之前校验
 * @param {}
 * @return {}
 */
import type {
  RcFile,
  ShowUploadListInterface,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { Upload, message } from "antd";
import { useState } from "react";
import { omit } from "lodash";
import moment from "dayjs";
import { UploadExtendsProps } from "./index.d";
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

export const settingsMap = {
  允许预览: 1,
  允许下载: 2,
};

export const sortTypeMap = {
  新的在前: 1,
  旧的在前: 2,
};

interface UploadFileExtends extends UploadFile {
  uploadTime: number;
  url: string;
}
//
const action = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

export const useTransformUploadProps = (props: Partial<UploadExtendsProps>) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {
    maxMb,
    mime = [],
    settings = [],
    sort = sortTypeMap.新的在前,
  } = props;
  const acceptMime = mime.filter(item => !!item).join(",");
  const acceptMimeArr = acceptMime.split(",");

  const uploadProps: UploadProps = {
    ...props,
    headers: {
      authorization: "authorization-text",
    },
    listType: "picture",
    multiple: true,
    accept: mime.length ? acceptMime : undefined,
    action,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    // Upload.LIST_IGNORE 阻止进入列表
    beforeUpload(file: RcFile) {
      // 校验文件类型
      if (!verificationFileType(file, acceptMimeArr)) {
        message.error(`文件类型上传错误，请参考设置, ${acceptMime}`);
        return false || Upload.LIST_IGNORE;
      }
      // 校验文件大小
      if (!verificationFileSize(file, maxMb)) {
        message.error(`文件大小上传错误, 请参考设置, ${maxMb}`);
        return false || Upload.LIST_IGNORE;
      }

      return true;
    },
    onChange: ({ fileList }) =>
      setFileList(
        fileList
          .map(item => {
            // 上传成功
            if (item.response && typeof item.response === "object") {
              return {
                ...item,
                thumbUrl: item.response.thumbUrl,
                url: item.response.url,
                uploadTime: item.response?.time
                  ? item.response?.time
                  : moment(new Date()).valueOf(),
              };
            }
            return { ...item, uploadTime: moment(new Date()).valueOf() };
          })
          .map(item => omit(item, ["thumbUrl"]))
      ),
    fileList:
      sort !== sortTypeMap.新的在前
        ? fileList.sort(
            (a: UploadFileExtends, b: UploadFileExtends) =>
              a.uploadTime - b.uploadTime
          )
        : fileList.sort(
            (a: UploadFileExtends, b: UploadFileExtends) =>
              b.uploadTime - a.uploadTime
          ),
  };
  let showUploadList: ShowUploadListInterface = {
    showDownloadIcon: false,
    downloadIcon: false,
    showRemoveIcon: false,
    removeIcon: false,
  };
  // onRemove 回调

  // 允许预览: 展示按钮
  if (settings.includes(settingsMap.允许预览)) {
    showUploadList = Object.assign(showUploadList, {
      showPreviewIcon: true,
      previewIcon: "预览",
    });
    // 自定义预览
    uploadProps.onPreview = file => {
      if (!file?.url) {
        return message.warning("该类型文件暂不支持预览，请下载后查看");
      }
      return window.open(file.url, "_blank");
    };
  }
  // 允许下载
  if (settings.includes(settingsMap.允许下载)) {
    showUploadList = Object.assign(showUploadList, {
      showDownloadIcon: true,
      downloadIcon: "下载",
    });
    // 自定义下载逻辑
    uploadProps.onDownload = file => {
      console.log("onDownload file:", file);
    };
  }

  uploadProps.showUploadList = showUploadList;

  return uploadProps;
};
