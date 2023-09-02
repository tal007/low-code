import { useNode } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEditorAction } from "@/EditorWidgets/hooks";
import { fillingMethodMap } from "./constant";
import { memo } from "react";
import type { DetailedTableContainerProps } from "./index.d";

export const TableHeaderContainer = styled.div`
  padding: 14px 10px;
  color: rgba(25, 31, 37, 0.56);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const TableHeaderContainerComponent = memo(
  ({
    title,
    fillingMethod,
    id,
  }: {
    title: string;
    fillingMethod: string;
    id: string;
    parent: string;
  }) => {
    const { enabled } = useEditorAction();
    const { t } = useTranslation();
    return (
      <TableHeaderContainer>
        <span>{title}</span>
        {!enabled && fillingMethod === fillingMethodMap.列表 && (
          <span
            style={{ cursor: "pointer", color: !enabled && "#1677ff" }}
            onClick={() => {
              document.getElementById(String(id)).remove();
            }}
          >
            {t("common.delete")}
          </span>
        )}
      </TableHeaderContainer>
    );
  }
);

interface DetailedTableContainerCardBottomProps
  extends DetailedTableContainerProps {
  onClick: () => void;
}

export const DetailedTableContainerCardBottom = memo(
  ({ onClick, ...props }: Partial<DetailedTableContainerCardBottomProps>) => {
    const {
      connectors: { connect },
    } = useNode();
    const { actionName } = props;
    const { enabled } = useEditorAction();
    return (
      <div
        {...props}
        style={{
          marginTop: "15px",
          textAlign: "center",
          cursor: "pointer",
          color: !enabled && "#1677ff",
        }}
        ref={connect}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={"add"} />
        <span style={{ paddingLeft: 5 }}>{actionName}</span>
      </div>
    );
  }
);
