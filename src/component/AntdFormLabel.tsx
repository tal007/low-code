/*
 * @Date: 2022-10-20 10:35:45
 * @LastEditTime: 2023-05-04 10:47:51
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { TextRenderView } from "@/Editor/Widgets/Show/Text";
import { Element } from "@craftjs/core";
import { HiddenElement } from "@/component/HiddenElement";
import { Form, FormItemProps } from "antd";
import { useNode, useEditor } from "@craftjs/core";

export interface AntdFormLabelProps extends Omit<FormItemProps, ""> {
  widgetName: string;
  hidden: boolean;
}

const UNDEFINED = void 0;

export const AntdFormLabel = (props: Partial<AntdFormLabelProps>) => {
  const {
    connectors: { connect },
    parent,
  } = useNode(node => ({
    parent: node.data.parent,
  }));

  const { parentIsForm, parentData } = useEditor((_, query) => {
    return {
      parentIsForm: query.getNodes()[parent].data.displayName === "Form",
      parentData: query.getNodes()[parent].data,
    };
  });

  const {
    children,
    widgetName,
    name,
    hidden,
    style,
    className,
    colon,
    dependencies,
    extra,
    getValueFromEvent,
    getValueProps,
    help,
    htmlFor,
    initialValue,
    labelAlign,
    messageVariables,
    normalize,
    noStyle,
    preserve,
    required,
    rules,
    shouldUpdate,
    tooltip,
    trigger,
    validateFirst,
    validateStatus,
    validateTrigger,
    valuePropName,
    wrapperCol,
    labelCol,
  } = props;

  const formItemProps: { [key: string]: any } = {
    dependencies,
    extra,
    getValueFromEvent,
    getValueProps,
    help,
    htmlFor,
    initialValue,
    labelAlign,
    messageVariables,
    normalize,
    noStyle,
    preserve,
    required,
    rules,
    shouldUpdate,
    tooltip,
    trigger,
    validateFirst,
    validateStatus,
    validateTrigger,
    valuePropName,
    wrapperCol,
    colon,
  };

  if (!parentIsForm && labelCol) formItemProps.labelCol = { span: labelCol };

  if (parentIsForm) {
    formItemProps.colon = parentData.props.colon;

    if (parentData.props.labelCol)
      formItemProps.labelCol = { span: parentData.props.labelCol };
  }

  return (
    <HiddenElement
      hidden={hidden}
      ref={connect}
      style={style}
      className={className}
    >
      <Form.Item
        name={parentIsForm ? name : UNDEFINED}
        label={
          <Element
            id="label"
            is={TextRenderView}
            text={(formItemProps.label as string) || widgetName}
          />
        }
        {...formItemProps}
      >
        {children}
      </Form.Item>
    </HiddenElement>
  );
};
