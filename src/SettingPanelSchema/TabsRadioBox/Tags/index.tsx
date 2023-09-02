/**
 * @author 梁强
 * @filename Tags.tsx
 * @date 2023-05-16 星期二
 * @description 自定义Tag
 */
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./index.less";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  url?: string;
  label?: string;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TagType
  extends React.ForwardRefExoticComponent<
    TagProps & React.RefAttributes<HTMLElement>
  > {
  //
}

const InternalTag: React.ForwardRefRenderFunction<HTMLElement, TagProps> = (
  tagProps,
  ref
) => {
  const { prefixCls = "tag-picker", url, label, onClose, ...props } = tagProps;

  return (
    <div {...props} className={prefixCls}>
      {url ? (
        <div className={`${prefixCls}-avatar`}>
          <img src={url} alt={label} />
        </div>
      ) : (
        <div className={`${prefixCls}-font-icon`}>
          <FontAwesomeIcon
            icon={"user"}
            style={{ fontSize: 20, color: "#5488fa" }}
          />
        </div>
      )}
      <div className={`${prefixCls}-tavflp`}>
        <Tooltip title={label} placement="topLeft">
          {label}
        </Tooltip>
      </div>
      <div className={`${prefixCls}-close-icon`}>
        <CloseOutlined
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            onClose?.(e);
          }}
        />
      </div>
    </div>
  );
};

const Tags = React.forwardRef<HTMLElement, TagProps>(InternalTag) as TagType;

export default Tags;
