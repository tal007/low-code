/*
 * @Date: 2022-09-21 09:47:53
 * @LastEditTime: 2023-05-15 17:28:29
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 低代码编辑平台
 */
import "./index.less";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { Container } from "./Container";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { FlexBox } from "@/style";
import { Editor } from "@craftjs/core";
import { resolver } from "./resolver";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";
import { QueryCallbacksFor } from "@craftjs/utils";
import { QueryMethods } from "@craftjs/core/lib/editor";
import { headerHeight } from "./constant";

export interface LowCodeEditorProps {
  onNodesChange: (query: QueryCallbacksFor<typeof QueryMethods>) => void;
}
export const LowCodeEditor = (props: Partial<LowCodeEditorProps>) => {
  const { t } = useTranslation();
  const { onNodesChange } = props;

  useDocumentTitle(t("documentTitle.editor"));

  const dispatch = useDispatch();

  return (
    <div className="my-low-code-editor">
      <Editor
        // indicator={{
        //   success: "#2d9d78", // green
        //   error: "#e34850", // red
        // }}
        resolver={resolver}
        // Save the updated JSON whenever the Nodes has been changed
        onNodesChange={query => {
          onNodesChange
            ? onNodesChange(query)
            : (function () {
                const json = query.serialize();
                console.log(json);
                console.log(query.getNodes());
                // save to server
                // console.log(json);
                dispatch(
                  currentEditorConfigActions.setEditorState({ nodes: json })
                );
                // axios.post("/saveJSON", { json });
              })();
        }}
        enabled={true}
        // onRender={RenderNode}`
      >
        <FlexBox
          className="page-container"
          justify={"space-between"}
          alignItems={"flex-start"}
          height={`calc(100% - ${headerHeight}px)`}
        >
          <LeftPanel />
          <Container />
          <RightPanel />
        </FlexBox>
      </Editor>
    </div>
  );
};

export default LowCodeEditor;
