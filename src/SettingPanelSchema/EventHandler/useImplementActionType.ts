/*
 * @Date: 2022-11-03 16:09:17
 * @LastEditTime: 2023-05-04 10:56:24
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 执行事件
 */

// 类型说明
// import { tabItems } from "@/component/EventTypeModal/tabItems";
import { CbValues } from "@/component/EventTypeModal";
import { currentForms } from "@/store/forms.slice";
import { message } from "antd";
import { Query } from "../settingRender/querySetting";
import { ajax } from "@/hooks/useAjax";
import { processingQueryConfig } from "@/Editor/Widgets/hooks";
import { useEditor } from "@craftjs/core";
import { useSelector } from "react-redux";
import { ShowProperties } from "@/component/EventTypeModal/Children/Show";
import { currentModals } from "@/store/modal.slice";

export const useImplementActionType = () => {
  const { actions } = useEditor(state => {
    // console.log(state);
    return {
      nodes: state.nodes,
    };
  });

  const formsStore = useSelector(currentForms);
  const modalStore = useSelector(currentModals);

  return (props: CbValues, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const { actionType, formData } = props;
    switch (actionType) {
      case "jump": {
        const params = formData.params.length
          ? formData.params.reduce((prev, curr, index) => {
              return `${prev}${curr.key}=${curr.value}${
                index === formData.params.length - 1 ? "" : "&"
              }`;
            }, "?")
          : "";
        const url = formData.url + params;
        window.open(url);
        break;
      }
      case "openPage": {
        break;
      }
      case "refresh": {
        window.location.reload();
        break;
      }
      case "back": {
        window.history.back();
        break;
      }
      case "message": {
        const { type, content, duration } = formData;
        message[type](content, duration);
        break;
      }
      case "submit": {
        const { formId } = formData;
        const formRef = formsStore.find(f => f.id === formId);
        formRef.ref().current.submit();
        break;
      }
      case "reset": {
        const { formId } = formData;
        const formRef = formsStore.find(f => f.id === formId);
        formRef.ref().current.resetFields();
        break;
      }
      case "validate": {
        const { formId } = formData;
        const formRef = formsStore.find(f => f.id === formId);
        formRef.ref().current.validateFields();
        break;
      }
      case "copy": {
        const { copyTemp } = formData;
        copyToClipboard(copyTemp);
        break;
      }
      case "ajax": {
        const { queryApi }: { queryApi: Partial<Query> } = formData;
        const { url, requestFailure, requestSuccess } = queryApi;
        const queryConfig = processingQueryConfig(queryApi, null);
        ajax(url, queryConfig)
          .then(() => {
            requestSuccess && message.success(requestSuccess);
          })
          .catch(() => {
            requestFailure && message.success(requestFailure);
          });
        break;
      }
      case "show": {
        const { selectWidget, type }: ShowProperties["defaultFormValue"] =
          formData;
        actions.setProp(selectWidget, props => {
          props.common.hidden = type === "hidden";
        });
        break;
      }
      case "openModal": {
        const { modalId } = formData;
        const modalRef = modalStore.find(f => f.id === modalId);
        modalRef.cb();
        break;
      }
      default: {
        return;
      }
    }
  };
};

const copyToClipboard = (value: string) => {
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", value);
  document.body.appendChild(input);
  input.setSelectionRange(0, 9999);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};
