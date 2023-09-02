/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-19 17:03:10
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-09 10:03:31
 * @FilePath: \mylcp_web\src\page\OA\Components\ConditionComponent\CardComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Card, Button, Form } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FromConditionItem from "./FromConditionItem";
import { Fragment, useState } from "react";
import { nanoid } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  currentConditionActions,
  currentCondition,
} from "@/store/conditionFrom.slice";
import { currentFlow } from "@/store/flow.slice";
import { ConditionGroup } from "./conditionType";
const CardComponent = props => {
  const dispatch = useDispatch();
  const conditionGroups = useSelector(currentCondition);

  const addConditionGroup = () => {
    const condition: ConditionGroup = {
      groupId: nanoid(10),
      connectType: "OR",
      name: "条件组" + (Number(conditionGroups.addConditionGroup.length) + 1),
      conditionModel: [
        {
          modelId: nanoid(10),
          order: 1,
          computeModel: [
            {
              presetsData: {
                numberData: 111,
              },
              operationType: "numberLessThan",
            },
          ],
          dataOrigin: {
            dataName: "",
            dataId: "",
          },
        },
      ],
    };
    dispatch(currentConditionActions.setCardCondition(condition));
  };

  const deletConditionGroup = (id: any) => {
    dispatch(currentConditionActions.deleteCardCondition({ id }));
  };

  const addCondition = (item: any) => {
    dispatch(currentConditionActions.setFormCondition(item));
  };

  const detCondition = (item: any, id: any) => {
    const arr = [...item.conditionModel];
    const index = arr.findIndex(i => i.modelId == id);
    arr.splice(index, 1);
    const groupId = item.groupId;
    dispatch(currentConditionActions.deleteFormCondition({ arr, groupId }));
  };

  return (
    <>
      {conditionGroups.addConditionGroup.map(item => (
        <Form.Item key={item.groupId}>
          {item.order != 1 && <p style={{ color: "gray" }}>或满足</p>}
          <Card
            title={item.name}
            size="small"
            extra={
              item.order != 1 && (
                <DeleteOutlined
                  onClick={() => {
                    deletConditionGroup(item.groupId);
                  }}
                />
              )
            }
            style={{ width: 450 }}
            headStyle={{ backgroundColor: "rgba(244, 246, 248, 1)" }}
          >
            {item.conditionModel.map(formItem => (
              <Fragment key={formItem.modelId}>
                <FromConditionItem
                  {...formItem}
                  groupId={item.groupId}
                  delete={() => {
                    detCondition(item, formItem.modelId);
                  }}
                ></FromConditionItem>
              </Fragment>
            ))}
            <Button
              type="link"
              onClick={() => {
                addCondition(item);
              }}
            >
              +添加条件
            </Button>
          </Card>
        </Form.Item>
      ))}
      <Button
        icon={<PlusOutlined />}
        style={{ marginTop: "5px", width: "100%" }}
        onClick={addConditionGroup}
      >
        添加条件组
      </Button>
    </>
  );
};

export default CardComponent;
