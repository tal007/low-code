/*
 * @Date: 2023-04-24 10:18:20
 * @LastEditTime: 2023-05-10 13:50:35
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 省市区组件
 */
import { useState, useEffect } from "react";
import { Button as ButtonPC, Space as SpacePC } from "antd";
import { Popup } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import SignaturePad from "signature_pad";
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { ComponentProps, SignComponentProps } from "./index.d";
import { useMobilePopupContainer } from "@/hooks/useMobilePopupContainer";
import styled from "styled-components";

// 生成水印图片
const CreateWaterMark = (cvs: HTMLCanvasElement, txt: string) => {
  const width = cvs.width;
  const height = cvs.height;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const txtHeight = height / 4;
  const txtWidth = 2 * ctx.measureText(txt).width + 50;
  const drawNumberX = Math.ceil(width / txtWidth) * 2;
  const drawNumberY = Math.ceil(height / txtHeight) * 2; // 绘制次数
  ctx.font = `bold ${height / 10}px arial`;
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.textBaseline = "bottom";
  ctx.rotate(-Math.PI / 80);
  for (let i = 0; i < drawNumberX; i++) {
    for (let j = 0; j < drawNumberY; j++) {
      ctx.fillText(txt, i * txtWidth, j * txtHeight + 20);
    }
  }
  const imgSrc = canvas.toDataURL("image/png");
  return imgSrc;
};
// 绘制水印
const DrawWaterMark = (
  cvs: HTMLCanvasElement,
  imgSrc: string,
  callback?: () => void
) => {
  const height = cvs.height;
  const width = cvs.clientWidth;
  const signCvsCtx = cvs.getContext("2d");
  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    callback && callback();
    signCvsCtx.drawImage(img, 0, 0, width, height);
  };
};

const SignComponentContainer = styled.div`
  width: 100%;
  padding: 40px 20px;
`;
const SignComponent = (props: SignComponentProps) => {
  const { height, bgColor, penColor } = props;
  const { t } = useTranslation();
  const ratio = window.devicePixelRatio | 1;
  let canvasRef: HTMLCanvasElement; // canvas节点
  const [signPad, setSignPad] = useState<SignaturePad>(); // 存放签名版信息
  const [imgSrc, setImgSrc] = useState<string>(); // 画布背景+水印图片地址
  const _height = (height || 200) * ratio;
  useEffect(() => {
    canvasRef.width = canvasRef.clientWidth * ratio;
    setSignPad(
      new SignaturePad(canvasRef, {
        penColor: penColor || "rgb(70, 58, 58)",
      })
    );
    const _imgSrc = CreateWaterMark(canvasRef, "仅限测试使用");
    setImgSrc(_imgSrc);
    DrawWaterMark(canvasRef, _imgSrc);
  }, [canvasRef, penColor, ratio]);
  const clearSign = (): void => {
    if (!signPad.isEmpty()) {
      DrawWaterMark(canvasRef, imgSrc, (): void => {
        signPad.clear();
      });
    }
  };
  const sureSign = (): void => {
    // signPad && setSignUrl(signPad.toDataURL("image/png"));
    console.log(canvasRef.toDataURL("image/png"));
  };
  return (
    <SignComponentContainer>
      <canvas
        ref={ref => {
          canvasRef = ref;
        }}
        height={_height}
        style={{
          width: "100%",
          backgroundColor: bgColor || "rgba(0,0,0, 0.1)",
        }}
      />
      <SpacePC>
        <ButtonPC type="link" onClick={clearSign}>
          {t("form.HandWriteSign.clearButton", { ns: "editorWidget" })}
        </ButtonPC>
        <ButtonPC type="primary" onClick={sureSign}>
          {t("common.ok")}
        </ButtonPC>
      </SpacePC>
    </SignComponentContainer>
  );
};
const Component = (props: Partial<ComponentProps>) => {
  const { platform } = props;
  const [visible, setVisible] = useState<boolean>(false); // 移动端显示弹框
  const dom = useMobilePopupContainer();
  const showSignPopup = (): void => {
    setVisible(true);
  };
  const onClose = (): void => {
    setVisible(false);
  };
  return (
    <FormWidgetContainer {...props}>
      {platform === "mobile" ? (
        <>
          <AddCircleOutline fontSize={36} onClick={showSignPopup} />
          <Popup
            position="bottom"
            visible={visible}
            showCloseButton
            onClose={onClose}
            getContainer={dom}
          >
            <SignComponent />
          </Popup>
        </>
      ) : (
        <SignComponent />
      )}
    </FormWidgetContainer>
  );
};
export default Component;
