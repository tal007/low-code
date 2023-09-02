/*
 * @Date: 2022-11-03 15:03:21
 * @LastEditTime: 2023-01-30 10:19:09
 * @LastEditors: 刘玉田
 * @Description: 操作类型说明
 */

// 类型说明
// import { tabItems } from "@/component/EventTypeModal/tabItems";
import { CbValues } from "@/component/EventTypeModal";
import { PrimaryColorSpan } from "@/style";
import { Typography } from "antd";
import { Query } from "../settingRender/querySetting";
import { useEditor } from "@craftjs/core";

export const ActionTypeDesc = (props: CbValues) => {
  const { actionType, formData } = props;
  const { t } = useTranslation();
  const { nodes } = useEditor(state => ({
    nodes: state.nodes,
  }));

  switch (actionType) {
    case "jump": {
      // const params = formData.params.length
      //   ? formData.params.reduce((prev, curr, index) => {
      //       return `${prev}${curr.key}=${curr.value}${
      //         index === formData.params.length - 1 ? "" : "&"
      //       }`;
      //     }, "?")
      //   : "";
      // const url = formData.url + params;
      const url = formData.url;
      return (
        <>
          {t("event.jump")} <Typography.Link>{url}</Typography.Link>
        </>
      );
    }
    case "openPage": {
      const url = formData.url;
      return (
        <>
          {t("event.openPage")}: <Typography.Link>{url}</Typography.Link>
        </>
      );
    }
    case "submit": {
      return (
        <>
          {t("event.formSubmit")}:
          <Typography.Link>{formData.formName}</Typography.Link>
        </>
      );
    }
    case "reset": {
      return (
        <>
          {t("event.reset")}:
          <Typography.Link>{formData.formName}</Typography.Link>
        </>
      );
    }
    case "validate": {
      return (
        <>
          {t("event.validate")}:
          <Typography.Link>{formData.formName}</Typography.Link>
        </>
      );
    }
    case "message": {
      return <>{t("event.message")}</>;
    }
    case "copy": {
      return <>{t("event.copy")}</>;
    }
    case "ajax": {
      const { queryApi }: { queryApi: Partial<Query> } = formData;
      return (
        <>
          {queryApi.method}: <Typography.Link>{queryApi.url}</Typography.Link>
        </>
      );
    }
    case "show": {
      const { selectWidget, type } = formData;
      const selectedNode = nodes[selectWidget];
      const name =
        selectedNode.data?.custom?.displayName || selectedNode.data.displayName;
      return (
        <>
          {type === "show" ? t("common.show") : t("common.hidden")}{" "}
          <PrimaryColorSpan>{name}</PrimaryColorSpan> {t("common.widget")}
        </>
      );
    }
    case "openModal": {
      return <>{t("event.openModal")}</>;
    }
    default: {
      return <>待添加</>;
    }
  }
};
