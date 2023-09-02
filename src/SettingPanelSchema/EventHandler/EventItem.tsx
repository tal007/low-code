/*
 * @Date: 2022-11-02 15:12:35
 * @LastEditTime: 2023-05-04 10:56:46
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { CbValues } from "@/component/EventTypeModal";
import { FlexBox, MPContainer } from "@/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space } from "antd";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import { ActionTypeDesc } from "./ActionTypeDesc";
import { actionTypeMap } from "./actionTypeMap";

const DragHandle = SortableHandle(() => (
  <FontAwesomeIcon className="cursor-move" icon={"grip-vertical"} />
));

export interface EventItemProps extends CbValues {
  id: string;
  [key: string]: any;
}

const Container = styled(FlexBox)`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: #f5f5f5;

  :hover {
    border-color: ${props => props.theme.token.colorPrimary};
  }
`;

export const EventItem = (
  props: Partial<
    EventItemProps & {
      editAction: () => void;
      deleteAction: () => void;
    }
  >
) => {
  const { actionType, formData, highSetting, editAction, deleteAction } = props;
  const { t } = useTranslation();

  return (
    <Container direction={"column"} alignItems={"flex-start"}>
      <FlexBox justify={"space-between"}>
        <Space size={12}>
          <DragHandle />
          {t(actionTypeMap.get(actionType))}
        </Space>
        <Space>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={"pen-to-square"}
            onClick={editAction}
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={"trash"}
            onClick={deleteAction}
          />
        </Space>
      </FlexBox>
      <MPContainer margin={"0 20px 0"} padding={0}>
        <ActionTypeDesc
          actionType={actionType}
          formData={formData}
          highSetting={highSetting}
        />
      </MPContainer>
    </Container>
  );
};
