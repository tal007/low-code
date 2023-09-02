/*
 * @Date: 2022-10-24 15:06:07
 * @LastEditTime: 2023-05-04 10:57:29
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 渐变色
 */

import { QuestionProviderContainer } from "@/style";
import { useTranslation, Trans } from "react-i18next";
import { InputColorSchema } from "../InputColor";
import { InputNumberSchema } from "../InputNumber";
import { TextAreaSchema } from "../TeatArea";
import { PanelSchemaProps } from "../types";

export type LinearGradientProps = PanelSchemaProps;

const GradientCustomProvider = () => {
  const { t } = useTranslation();

  return (
    <QuestionProviderContainer>
      <Trans
        i18nKey="myKey" // optional -> fallbacks to defaults if not provided
        defaults={t("backgroundProp.linearProvider")} // optional defaultValue
        values={{ what: "world" }}
        components={{
          1: (
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient"
              target="_blank"
              rel="noreferrer"
            />
          ),
          2: (
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient"
              target="_blank"
              rel="noreferrer"
            />
          ),
        }}
      />
    </QuestionProviderContainer>
  );
};

export const LinearGradient = (props: LinearGradientProps) => {
  const { setProp, defaultValue } = props;

  return (
    <>
      <InputColorSchema
        parentProps={{
          label: "backgroundProp.linearStart",
        }}
        childProps={{
          propName: "linear",
          setProp,
          defaultValue: defaultValue.linear.start,
          onChange: color => {
            setProp(props => (props.background.linear.start = color.rgb), 500);
          },
        }}
      />
      <InputColorSchema
        parentProps={{
          label: "backgroundProp.endStart",
        }}
        childProps={{
          propName: "linear",
          setProp,
          defaultValue: defaultValue.linear.end,
          onChange: color => {
            setProp(props => (props.background.linear.end = color.rgb), 500);
          },
        }}
      />
      <InputNumberSchema
        parentProps={{
          label: "backgroundProp.angle",
        }}
        childProps={{
          propName: "angle",
          setProp,
          defaultValue: defaultValue.linear.angle,
          onChange: value => {
            setProp(props => (props.background.linear.angle = value), 500);
          },
          max: 360,
          min: -360,
        }}
      />
      <TextAreaSchema
        parentProps={{
          label: "common.custom",
          direction: "column",
          showQuestionIcon: true,
          questionPopover: GradientCustomProvider,
        }}
        childProps={{
          propName: "custom",
          setProp,
          defaultValue: defaultValue.linear.custom,
          placeholder: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`,
          onChange: e => {
            setProp(
              props => (props.background.linear.custom = e.target.value),
              500
            );
          },
          autoSize: { minRows: 4 },
        }}
      />
    </>
  );
};
