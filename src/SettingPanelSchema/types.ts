/*
 * @Date: 2022-10-10 10:52:52
 * @LastEditTime: 2022-10-10 10:57:19
 * @LastEditors: 刘玉田
 * @Description:
 */

export type SetProp = (
  cb: (props: Record<string, any>) => void,
  throttleRate?: number
) => void;

export interface PanelSchemaProps {
  propName: string;
  setProp: SetProp;
  defaultValue: any;
}
