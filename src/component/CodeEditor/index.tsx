import * as monaco from "monaco-editor";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { language } from "monaco-editor/esm/vs/basic-languages/sql/sql";

const { keywords } = language;

export interface MonacoEditorProps {
  lang?: string;
  value?: string;
}

const MonacoEditorContainer = styled.div`
  height: 400px;
`;

export const CodeEditor = (props: MonacoEditorProps) => {
  const { lang = "sql", value = "" } = props;
  const codeRef = useRef();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

  monaco.languages.registerCompletionItemProvider(lang, {
    provideCompletionItems: function () {
      return {
        suggestions: keywords.map(key => ({
          label: key,
          kind: monaco.languages.CompletionItemKind.Enum,
          insertText: key,
        })),
      };
    },
  });

  monaco.editor.onDidCreateEditor(listener => {
    listener.onDidChangeModelContent(e => {
      console.log(editor.current.getValue());
    });
  });

  useEffect(() => {
    if (codeRef.current) {
      editor.current = monaco.editor.create(codeRef.current, {
        value,
        language: lang,
        contextmenu: true,
        wrappingIndent: "deepIndent",
        automaticLayout: true,
        autoIndent: "full",
        formatOnType: true,
        formatOnPaste: true,
        scrollBeyondLastLine: false,
        renderControlCharacters: false,
        fontSize: 16,
        tabIndex: 1,
        tabSize: 2,
        // 行号
        lineNumbers: "on",
        minimap: {
          enabled: false,
        },
      });

      editor.current.getValue();
    }

    return () => {
      editor.current.dispose();
    };
  }, [codeRef, lang, value]);

  return (
    <>
      <MonacoEditorContainer
        className={`code-editor code-editor-${language}`}
        ref={codeRef}
      ></MonacoEditorContainer>
      <div
        onClick={() => {
          console.log(editor.current.getValue());
        }}
      >
        提交
      </div>
    </>
  );
};
