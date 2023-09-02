/**
 * @author 梁强
 * @filename setting.tsx
 * @date 2023-04-25 星期二
 * @description UploadFile Schema
 */
import { Segmented } from "@/component/Segmented";
import {
  SettingProvider,
  SettingProviderProps,
} from "@/SettingPanelSchema/SettingProvider";
import { useTranslation } from "react-i18next";
import { basicRender } from "@/SettingPanelSchema/settingRender";
import { createSchema } from "@/SettingPanelSchema";
import { Enum } from "@/SettingPanelSchema/Select";

const mimeList: Enum[] = [
  {
    label: ["form.UploadFile.noLimit", { ns: "editorWidget" }],
    value:
      ".jpeg,.png,.jpg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.mp3,.wav,.m4a,.mp4,.avi,.mov",
    colSpan: 7,
  },
  {
    label: ["form.UploadFile.img", { ns: "editorWidget" }],
    // JPG、JPEG、PNG
    value: ".jpeg,.png,.jpg",
    colSpan: 7,
  },
  {
    label: ["form.UploadFile.txt", { ns: "editorWidget" }],
    // doc、docx、xls、xlsx、ppt、pptx、pdf、txt
    value: ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt",
    colSpan: 7,
  },
  {
    label: ["form.UploadFile.audio", { ns: "editorWidget" }],
    // MP3、WAV、M4a
    value: ".mp3,.wav,.m4a",
    colSpan: 7,
  },
  {
    label: ["form.UploadFile.video", { ns: "editorWidget" }],
    // MP4、AVI、MOV
    value: ".mp4,.avi,.mov", // 苹果： mov
    colSpan: 7,
  },
];

const sort: Enum[] = [
  {
    label: ["form.UploadFile.before", { ns: "editorWidget" }],
    value: 1,
    translate: true,
  },
  {
    label: ["form.UploadFile.after", { ns: "editorWidget" }],
    value: 2,
    translate: true,
  },
];

const settings: Enum[] = [
  {
    label: ["form.UploadFile.preview", { ns: "editorWidget" }],
    value: 1,
    colSpan: 12,
  },
  {
    label: ["form.UploadFile.download", { ns: "editorWidget" }],
    value: 2,
    colSpan: 12,
  },
];

const propsSetting: SettingProviderProps = {
  ...basicRender([
    createSchema(
      "InputNumberSchema",
      {
        label: ["form.UploadFile.maxNumber", { ns: "editorWidget" }],
        direction: "column",
      },
      "maxCount",
      {
        min: 1,
      }
    ),
    createSchema(
      "InputNumberSchema",
      {
        label: ["form.UploadFile.maxMb", { ns: "editorWidget" }],
        direction: "column",
      },
      "maxMb",
      {
        min: 1,
        max: 1024,
      }
    ),
    createSchema(
      "MultipleCheckboxSchema",
      {
        label: ["form.UploadFile.mime", { ns: "editorWidget" }],
        direction: "column",
      },
      "mime",
      {
        mapData: mimeList,
      }
    ),
    createSchema(
      "SelectSchema",
      {
        label: ["form.UploadFile.sort", { ns: "editorWidget" }],
        direction: "column",
      },
      "sort",
      {
        mapData: sort,
      }
    ),
    createSchema(
      "MultipleCheckboxSchema",
      {
        label: ["form.UploadFile.settings", { ns: "editorWidget" }],
        direction: "column",
      },
      "settings",
      { mapData: settings }
    ),
    createSchema(
      "SwitchSchema",
      { label: "antdPropDesc.required" },
      "required"
    ),
  ]),
};

const UploadFileSetting = () => {
  const { t } = useTranslation();

  return (
    <Segmented
      options={["props"]}
      renderMap={{
        [t("rightPanel.segmented.props", { ns: "editor" })]: SettingProvider(
          propsSetting,
          false
        ),
      }}
    />
  );
};

export default UploadFileSetting;
