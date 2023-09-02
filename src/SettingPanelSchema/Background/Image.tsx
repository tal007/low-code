/*
 * @Date: 2022-10-24 15:30:23
 * @LastEditTime: 2023-05-04 10:57:42
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 图片
 */

import { PanelSchemaProps } from "../types";
import { UploadSchema } from "../Upload";

export type BackgroundProps = PanelSchemaProps;

export const BackgroundImage = (props: BackgroundProps) => {
  const { setProp, defaultValue } = props;
  return (
    <>
      <UploadSchema
        parentProps={{ label: "" }}
        childProps={{
          setProp,
          defaultValue,
          propName: "image",
          onUploadSuccess(url) {
            setProp(props => (props.background.image = url), 500);
          },
        }}
      />
    </>
  );
};
