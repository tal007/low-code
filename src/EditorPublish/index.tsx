/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-19 11:09:06
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-19 11:45:05
 * @Description: 发布页面
 */

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { Editor } from "@craftjs/core";
import { resolver } from "@/EditorDingTalk/resolver";
import { Container } from "./Container";
import { PublishButton } from "./Publish";
import { useQuery } from "@tanstack/react-query";
import { useAjax } from "@/hooks/useAjax";
import { useUrlQueryParams } from "@/hooks/useUrlQueryParams";

export const EditorPublish = () => {
  console.log("编辑器");
  const { t } = useTranslation();

  useDocumentTitle(t("documentTitle.editor"));

  // 数据初始化
  const [params] = useUrlQueryParams(["formId", "id"]);
  const client = useAjax();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data, error, isError } = useQuery<null, Error>({
    queryKey: ["query-init-data"],
    queryFn: () => client(`table/get?formId=${params.formId}&id=${params.id}`),
  });

  return (
    <div className="my-low-code-editor">
      <Editor
        indicator={{
          success: "#2d9d78", // green
          error: "#e34850", // red
        }}
        resolver={resolver}
        enabled={false}
      >
        <Container />
        <PublishButton />
      </Editor>
    </div>
  );
};

export default EditorPublish;
