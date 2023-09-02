/*
 * @Date: 2022-09-28 15:35:05
 * @LastEditTime: 2023-05-11 17:57:33
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 滚动容器
 */
// !DOC http://idiotwu.github.io/smooth-scrollbar/
import Scrollbar from "react-smooth-scrollbar";
import { ReactNode, forwardRef } from "react";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import { ScrollStatus } from "smooth-scrollbar/interfaces";

SmoothScrollbar.use(OverscrollPlugin);

type ScrollContainer = {
  children: ReactNode;
  style: React.CSSProperties;
  className: string;
  onScroll(status: ScrollStatus, scrollbarInstance: SmoothScrollbar): void;
};

const ScrollbarDefaultStyle = {
  flex: 1,
  // overflow: "auto",
  padding: 0,
  height: `100%`,
  // height: "100%",
};

export const ScrollContainer = forwardRef<any, Partial<ScrollContainer>>(
  (props, ref) => {
    const { children, style, className, onScroll } = props;

    return (
      <Scrollbar
        ref={ref}
        className={className}
        style={{ ...ScrollbarDefaultStyle, ...style }}
        onScroll={(
          status: ScrollStatus,
          scrollbarInstance: SmoothScrollbar
        ) => {
          onScroll?.(status, scrollbarInstance);
        }}
        damping={0.1}
      >
        {children}
      </Scrollbar>
    );
  }
);
