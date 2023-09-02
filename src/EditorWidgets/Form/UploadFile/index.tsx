/**
 * @author 梁强
 * @filename index.tsx
 * @date 2023-04-25 星期二
 * @description 附件📎 UploadFile
 */
import { CommonButtonTypes } from "@/EditorWidgets/Common";
import { generateWidgetOptions } from "@/EditorWidgets/helper";
import { displayName } from "@/i18n/widgetDisplayName";
import { Element, useNode } from "@craftjs/core";
import UploadFileSetting from "./setting";
import { BaseContainer } from "@/EditorWidgets/Common/Container";
import { UploadExtendsProps } from "./index.d";
import Component from "./Component";
import { styleDefault } from "@/EditorWidgets/Common/StyleContainer";
import { sortTypeMap } from "./hooks";

const UploadFileNAME = "UploadFile";
const widgetName = displayName(UploadFileNAME);
export const UploadFileComponent = Component;
export const UploadFileRenderView = (props: Partial<UploadExtendsProps>) => {
  const { id } = useNode();
  return (
    <BaseContainer {...props}>
      <Component {...props} id={id} />
    </BaseContainer>
  );
};

UploadFileRenderView.craft = {
  displayName: UploadFileNAME,
  props: {
    ...styleDefault,
    borderRadius: {
      all: {
        open: true,
        value: 0,
      },
      topLeft: 10,
      topRight: 10,
      bottomLeft: 10,
      bottomRight: 10,
    },
    onEvent: {},
    name: widgetName,
    vertical: true,
    maxCount: 1,
    maxMb: 1, // mb
    mime: [
      ".jpeg,.png,.jpg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.mp3,.wav,.m4a,.mp4,.avi,.mov",
    ],
    sort: sortTypeMap.新的在前,
    settings: [],
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => false,
    canMoveOut: () => true,
  },
  related: {
    settings: UploadFileSetting,
  },
};

export const UploadFile: CommonButtonTypes = {
  ...generateWidgetOptions(UploadFileNAME, "form"),
  icon: "paperclip",
  tags: [],
  render: (
    <Element
      canvas
      is={UploadFileRenderView}
      custom={{
        displayName: widgetName,
        tags: ["form"],
        componentName: "UploadFileComponent",
      }}
    />
  ),
};
