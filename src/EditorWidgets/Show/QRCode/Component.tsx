/*
 * @Date: 2023-05-12 15:29:52
 * @LastEditTime: 2023-05-15 13:51:27
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 二维码组件
 */
import { useNode } from "@craftjs/core";
import { QRCode as AntdQRCode } from "antd";
import { StyleContainer } from "../../Common/StyleContainer";
import { toColorString } from "../../helper";
import { CraftContainer } from "./../../Common/CraftContainer/index";
import { useQueryInitial } from "@/Editor/Widgets/hooks";
import { QRCodeProps, QRCodeComponentProps } from "./index.d";

const QRCodeComponent = (props: Partial<QRCodeComponentProps>) => {
  const { url, value, color, isLoading, queryConfigUrl, enabled, ...rest } =
    props;
  return (
    <AntdQRCode
      value={url || value}
      color={toColorString(color)}
      status={isLoading && queryConfigUrl && !enabled ? "loading" : "active"}
      {...rest}
    />
  );
};
// 预览页面组件
export const Component = (props: Partial<QRCodeProps>) => {
  return <QRCodeComponent {...props} />;
};
//编辑器页面组件
export const EditorComponent = (props: Partial<QRCodeProps>) => {
  const { common, queryConfig } = props;
  const { id } = useNode();
  const {
    queryResult: { isLoading, error, data },
  } = useQueryInitial<{ url: string }>("qrcode", queryConfig, id);
  return (
    <StyleContainer {...props} style={{ display: "inline-block" }}>
      <CraftContainer<Error>
        loading={isLoading}
        error={error}
        hidden={common.hidden}
      >
        <QRCodeComponent
          {...props}
          url={data?.data?.url}
          isLoading={isLoading}
          queryConfigUrl={queryConfig.url}
        />
      </CraftContainer>
    </StyleContainer>
  );
};
