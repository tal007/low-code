/*
 * @Date: 2022-10-18 11:47:32
 * @LastEditTime: 2023-01-05 11:55:47
 * @LastEditors: 刘玉田
 * @Description: 表单容器
 */

import { Element, useNode } from "@craftjs/core";
import { CommonButtonTypes } from "../../Common";
import { generateWidgetOptions } from "../../helper";
import { formPropsDefault, FormSetting } from "./FormSetting";
import { defaultValidateMessages } from "./message";
import { InputText } from "../../Form/InputText";
import React, { useEffect, useRef } from "react";
import {
  ProForm,
  ProFormInstance,
  ProFormProps,
} from "@ant-design/pro-components";
import { StyleContainerProps, styleDefault } from "../../Common/StyleContainer";
import { setCommonDefaults } from "@/SettingPanelSchema/settingRender/common";
import { Children, Events } from "../../types";
import { setFormItemPropsDefaults } from "@/SettingPanelSchema/settingRender/formItemProps";
import { currentFormsActions } from "@/store/forms.slice";
import { useDispatch } from "react-redux";
import { Space } from "antd";
import { FlexBox } from "@/style";
import {
  Query,
  setQueryConfig,
} from "@/SettingPanelSchema/settingRender/querySetting";
import { useQueryMutation, useQueryInitial } from "../../hooks";
import { processingAjaxSubmissionData } from "@/Editor/helper";
import { FormWidgetContainer } from "../../Form/FormWidgetContainer";

export interface FormRenderViewProps
  extends Omit<StyleContainerProps, "children">,
    Events,
    Children {
  common: Record<string, any>;
  proFormProps: ProFormProps;
  footer: {
    align: JustifyContent;
    showSubmit: boolean;
    showSubmitText: string;
    showReset: boolean;
    showResetText: string;
  };
  initApi: Partial<Query>;
  submitApi: Partial<Query>;
}

const defaultProps: Partial<FormRenderViewProps> = {
  ...styleDefault,
  ...setCommonDefaults(),
  proFormProps: formPropsDefault,
  footer: {
    align: "center",
    showSubmit: true,
    showSubmitText: "提交",
    showReset: true,
    showResetText: "重置",
  },
  initApi: setQueryConfig(),
  submitApi: setQueryConfig(),
  onEvent: {},
};

export const FormRenderView = (props: Partial<FormRenderViewProps>) => {
  const { children, proFormProps, footer, initApi, submitApi } = props;
  const formRef = useRef<ProFormInstance>();
  const { t } = useTranslation();
  const { id } = useNode();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentFormsActions.addForm({ id, ref: () => formRef }));
    return () => {
      dispatch(currentFormsActions.removeForm(id));
    };
  }, [dispatch, id]);

  // 初始化填充表单请求数据
  const {
    queryResult: { data, isLoading, error },
  } = useQueryInitial<{ [key: string]: any }, Error>("form", initApi, id);

  // 数据提交
  const { mutation } = useQueryMutation(submitApi, id);

  const onFinish = async values => {
    await formRef.current;
    const { dataType } = submitApi;
    console.log(values);
    mutation.mutate(processingAjaxSubmissionData(values, dataType));
  };

  return (
    <FormWidgetContainer {...props} loading={isLoading} error={error}>
      <ProForm
        initialValues={data?.data}
        formRef={formRef}
        validateMessages={defaultValidateMessages(t)}
        {...proFormProps}
        title="表单"
        onFinish={onFinish}
        submitter={{
          render(props, doms) {
            return (
              <FlexBox justify={footer.align}>
                <Space>
                  {footer.showReset && doms[0]}
                  {footer.showSubmit && doms[1]}
                </Space>
              </FlexBox>
            );
          },
          // 配置按钮文本
          searchConfig: {
            resetText: footer.showResetText,
            submitText: footer.showSubmitText,
          },
        }}
      >
        {children}
      </ProForm>
    </FormWidgetContainer>
  );
};

FormRenderView.craft = {
  // displayName: generateWidgetOptions("Container", "container").name,
  displayName: "Form",
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => {
      return true;
      // return props[0].data.custom.tags.includes("form");
    },
    canMoveOut: () => true,
  },
  related: {
    settings: FormSetting,
  },
};

export const Form: CommonButtonTypes = {
  ...generateWidgetOptions("Form", "container"),
  icon: "table-list",
  tags: ["container"],
  preview: <div>内容</div>,
  render: (
    <Element
      canvas
      is={FormRenderView}
      custom={{ displayName: "表单", tags: ["container"] }}
    >
      {React.cloneElement(InputText.render, {
        ...setFormItemPropsDefaults({
          name: "username",
          label: "用户名",
        }),
      })}
      {React.cloneElement(InputText.render, {
        ...setFormItemPropsDefaults({
          name: "password",
        }),
        password: true,
      })}
    </Element>
  ),
};
