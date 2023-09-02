/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-03-31 15:16:58
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-04 10:24:49
 * @Description:
 */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import styled from "styled-components";
import { typeName } from "../constant";
import { useState } from "react";
import { nanoid } from "@/utils/helper";
import { currentFlowActions, FlowJson } from "@/store/flow.slice";
import { useDispatch } from "react-redux";

const AddBtnBox = styled.div`
  user-select: none;
  width: 240px;
  padding: 20px 0px 32px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 1;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddItemWrap = styled.div`
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
`;

const AddItem = ({
  name,
  type,
  setOpen,
  parentId,
}: {
  name: string;
  type: keyof typeof typeName;
  setOpen: (bool: boolean) => void;
  parentId: string;
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    const id = nanoid(10);
    const data: FlowJson = {
      parentId,
      id,
      type,
      childNode: [],
      name: typeName[type],
      properties: {},
    };
    if (type === "condition") {
      dispatch(currentFlowActions.createCondition({ parentId }));
    } else {
      dispatch(currentFlowActions.addFlow(data));
    }
    setOpen(false);
  };

  return (
    <AddItemWrap>
      <Button block onClick={onClick}>
        {name}
      </Button>
    </AddItemWrap>
  );
};

const AddContent = ({
  setOpen,
  id,
}: {
  setOpen: (bool: boolean) => void;
  id: string;
}) => {
  return (
    <FlexWrap>
      <AddItem
        name={"审批人"}
        type={"approve"}
        setOpen={setOpen}
        parentId={id}
      />
      <AddItem name={"抄送人"} type={"copy"} setOpen={setOpen} parentId={id} />
      <AddItem name={"办理"} type={"do"} setOpen={setOpen} parentId={id} />
      <AddItem
        name={"条件分支"}
        type={"condition"}
        setOpen={setOpen}
        parentId={id}
      />
      {/* <AddItem name={"连接器"} /> */}
    </FlexWrap>
  );
};

export const AddBtn = ({ id }: { id: string; isInCondition: boolean }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <AddBtnBox>
      <Popover
        open={open}
        content={<AddContent setOpen={handleOpenChange} id={id} />}
        trigger={"click"}
        placement={"rightTop"}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary" shape="circle" onClick={() => setOpen(true)}>
          <PlusOutlined />
        </Button>
      </Popover>
    </AddBtnBox>
  );
};
