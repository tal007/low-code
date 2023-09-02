/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-03-31 14:05:33
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-09 15:06:26
 * @Description: 每一项
 */
import { AddBtn } from "./AddBtn";
import {
  CloseOutlined,
  CopyOutlined,
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { typeColor, typeName } from "./../constant";
import { FlexBox } from "@/style";
import { FlowJson, currentFlow, currentFlowActions } from "@/store/flow.slice";
import { currentConditionActions } from "@/store/conditionFrom.slice";
import {
  NodeWrap,
  NodeWrapBox,
  ConditionWrap,
  ConditionWrapBox,
  ConditionWrapBrachBox,
  ColBox,
  TopLeftCoverLine,
  BottomLeftCoverLine,
  TopRightCoverLine,
  BottomRightCoverLine,
  ConditionNode,
  ConditionNodeBox,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useMemo, useState, useEffect } from "react";
import {
  ApproveComponent,
  IFlowComponentMetas,
  StartComponent,
  ConditionComponent,
  CopyComponent,
} from "../Components";
import {
  Button,
  Modal,
  Tooltip,
  Drawer,
  Space,
  Form,
  Input,
  Select,
} from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import { assemblyData } from "../helper";

import { currentCondition } from "@/store/conditionFrom.slice";
type EditableTitleProps = {
  title: string;
  className: string;
  onBlur: (value: string) => void;
  placeholder: string;
  type?: FlowJson["type"];
};
const EditableTitle = (props: EditableTitleProps) => {
  const { title, className, type, onBlur, placeholder } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);

  return (
    <>
      {!isEdit && (
        <span
          className={className}
          onClick={e => {
            if (type === "start") return;
            e.preventDefault();
            e.stopPropagation();
            setIsEdit(true);
          }}
          style={{
            display: "inline-block",
            width: 100,
            height: 24,
            lineHeight: "24px",
          }}
        >
          {title}
        </span>
      )}
      {isEdit && (
        <Input
          style={{ width: 100 }}
          size={"small"}
          value={value}
          placeholder={placeholder}
          onChange={e => setValue(e.target.value)}
          autoFocus
          onBlur={e => {
            onBlur(e.target.value);
            setIsEdit(false);
          }}
        ></Input>
      )}
    </>
  );
};

export const Condition = ({
  nodes,
  parentId,
}: {
  nodes: string[];
  parentId: string;
}) => {
  const flowState = useSelector(currentFlow).json;
  const conditionLength = nodes.length;
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();

  const addCondition = () => {
    dispatch(currentFlowActions.addCondition({ parentId }));
  };
  const removeCondition = id => {
    const isDefaultCondition = flowState[id].isDefaultCondition;
    if (isDefaultCondition) {
      modal.confirm({
        title: "确认删除？",
        content:
          "当未满足其他条件时，均进入此条件分支，删除后条件分支可能不完整而导致无法提交审批单",
        onOk() {
          dispatch(currentFlowActions.removeCondition({ id, parentId }));
        },
        okType: "danger",
        okText: "确定",
        cancelText: "取消",
      });
    } else {
      dispatch(currentFlowActions.removeCondition({ id, parentId }));
    }
  };

  const showSortRight = (index: number) => {
    if (conditionLength <= 2) {
      return false;
    }
    return index !== conditionLength - 1 && index < conditionLength - 2;
  };
  const showSortLeft = (index: number) => {
    if (conditionLength <= 2) {
      return false;
    }
    return index > 0 && index < conditionLength - 1;
  };

  const sortCondition = (direction: "left" | "right", index: number) => {
    dispatch(currentFlowActions.sortCondition({ direction, index, parentId }));
  };
  const copyCondition = (index: number) => {
    dispatch(currentFlowActions.copyCondition({ index, parentId }));
  };

  const updateCondition = (id: string, attr: string, value: any) => {
    dispatch(currentFlowActions.updateFlow({ id, attr, newValue: value }));
  };
  const activeId = useSelector(currentFlow).selected;
  const setActiveNode = (id: string, item?: any) => {
    dispatch(currentFlowActions.setActive({ id: id }));
    setValue(item.name);
    setIsConditionalBranchOpen(true);
  };

  const [isConditionalBranchOpen, setIsConditionalBranchOpen] = useState(false);

  useEffect(() => {
    if (activeId) {
      const storeConditionGroups = flowState[activeId].conditionDefinition;
      console.log(flowState[activeId]);
      if (storeConditionGroups.conditionGroups) {
        dispatch(
          currentConditionActions.updateCondition(
            storeConditionGroups.conditionGroups
          )
        );
      } else {
        dispatch(currentConditionActions.initCondition());
      }
    }
  }, [isConditionalBranchOpen]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("条件1");
  const options = [
    { value: "1", label: "优先级1" },
    { value: "2", label: "优先级2" },
    { value: "3", label: "优先级3" },
  ];
  const { t } = useTranslation();

  const conditionGroups = useSelector(currentCondition);
  //保存
  const conditionSave = () => {
    console.log("保存", conditionGroups);
    const params = {
      id: activeId,
      attr: "conditionDefinition",
      newValue: {
        conditionGroups: conditionGroups,
      },
    };
    dispatch(currentFlowActions.updateFlow(params));
    //数据初始化
    dispatch(currentConditionActions.initCondition());
    setIsConditionalBranchOpen(false);
  };
  //取消操作
  const conditionCancel = () => {
    console.log("取消", conditionGroups);
    //数据初始化
    dispatch(currentConditionActions.initCondition());
    setIsConditionalBranchOpen(false);
  };

  return (
    <ConditionWrap className="condition-wrap">
      <ConditionWrapBox>
        <ConditionWrapBrachBox>
          <Button className="add-branch" onClick={addCondition}>
            添加条件
          </Button>
          {nodes?.map((item, index) => {
            const conditionNode = flowState[item];
            const { isDefaultCondition, name, id } = conditionNode;
            return (
              <ColBox key={item}>
                {index === 0 && (
                  <>
                    <TopLeftCoverLine />
                    <BottomLeftCoverLine />
                  </>
                )}
                {index === conditionLength - 1 && (
                  <>
                    <TopRightCoverLine />
                    <BottomRightCoverLine />
                  </>
                )}
                <ConditionNode>
                  <ConditionNodeBox>
                    <div
                      className={`condition-container ${
                        activeId === id ? "active" : ""
                      }`}
                      onClick={() => setActiveNode(id, conditionNode)}
                    >
                      <FlexBox className="title" justify={"space-between"}>
                        <EditableTitle
                          title={name}
                          className={`name ${
                            isDefaultCondition ? "default" : ""
                          }`}
                          onBlur={value => {
                            updateCondition(id, "name", value || "条件");
                          }}
                          placeholder="条件"
                        />
                        <span className="action">
                          <span className="priority">优先级{index + 1}</span>
                          {!isDefaultCondition && (
                            <Tooltip title="复制条件" placement={"top"}>
                              <CopyOutlined
                                className="copy"
                                onClick={e => {
                                  e.stopPropagation();
                                  copyCondition(index);
                                }}
                              />
                            </Tooltip>
                          )}
                          <CloseOutlined
                            className="remove"
                            onClick={e => {
                              e.stopPropagation();
                              removeCondition(item);
                            }}
                          />
                        </span>
                      </FlexBox>
                      <div className="content">请设置条件</div>
                      {showSortRight(index) && (
                        <div
                          className="sort sort-right"
                          onClick={e => {
                            e.stopPropagation();
                            sortCondition("right", index);
                          }}
                        >
                          <RightOutlined />
                        </div>
                      )}
                      {showSortLeft(index) && (
                        <div
                          className="sort sort-left"
                          onClick={e => {
                            e.stopPropagation();
                            sortCondition("left", index);
                          }}
                        >
                          <LeftOutlined />
                        </div>
                      )}
                    </div>
                    <AddBtn id={id} isInCondition />
                  </ConditionNodeBox>
                </ConditionNode>
                {conditionNode.childNode.map(subNode => {
                  return (
                    <Fragment key={subNode}>
                      <ConditionFlowItem {...flowState[subNode]} />
                    </Fragment>
                  );
                })}
              </ColBox>
            );
          })}
        </ConditionWrapBrachBox>
        <AddBtn id={parentId} isInCondition={false} />
      </ConditionWrapBox>
      {contextHolder}
      <Drawer
        title={
          <>
            {!isEdit && (
              <span
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEdit(true);
                }}
                style={{
                  display: "inline-block",
                  width: 100,
                  height: 24,
                  lineHeight: "24px",
                }}
              >
                {value}
              </span>
            )}
            {isEdit && (
              <Input
                style={{ width: 100 }}
                size={"small"}
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
                onBlur={() => {
                  setIsEdit(false);
                }}
              ></Input>
            )}
            <EditOutlined
              onClick={() => {
                setIsEdit(true);
              }}
            />
          </>
        }
        width={500}
        onClose={() => {
          conditionCancel();
        }}
        closable={false}
        open={isConditionalBranchOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Tooltip
              placement="bottom"
              title={
                '优先匹配最高优先级的条件,"优先级1"为最高优先级。若满足条件则进入该分支,若不满足则匹配下一优先级的条件'
              }
            >
              <InfoCircleOutlined />
            </Tooltip>
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              onChange={handleChange}
              options={options}
            />
          </Space>
        }
        footerStyle={{ display: "flex", justifyContent: "flex-end" }}
        footer={
          <Space>
            <Button
              onClick={() => {
                conditionCancel();
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={() => {
                conditionSave();
              }}
              type="primary"
            >
              {t("common.ok")}
            </Button>
          </Space>
        }
      >
        <div>
          <span>满足以下条件时进入该分支</span>
          <Tooltip
            placement="bottom"
            title={
              '如需使用数字,金额,时长等控件作为条件,需要在"表单设置"中添加对应控件,且控件必须设置为必填'
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        </div>
        <ConditionComponent form={undefined} />
      </Drawer>
    </ConditionWrap>
  );
};

export const ConditionFlowItem = (props: FlowJson) => {
  const { t } = useTranslation();
  const [formInstance]: FormInstance[] = useForm();

  const flowState = useSelector(currentFlow).json;
  const { type = "start", id, name, childNode, conditions } = props;

  const activeId = useSelector(currentFlow).selected;
  const setActiveNode = () => {
    dispatch(currentFlowActions.setActive({ id: id }));
    setIsSettingDrawerOpen(true);
  };
  const className = `node-wrap-box node-${type} ${
    activeId === id ? "active" : ""
  }`;

  const dispatch = useDispatch();
  const removeFlow = () => {
    dispatch(currentFlowActions.removeFlow({ id }));
  };
  const updateState = (attr: string, value: any) => {
    value = value.trim() ? value.trim() : typeName[type];
    dispatch(currentFlowActions.updateFlow({ id, attr, newValue: value }));
  };

  const [isSettingDrawerOpen, setIsSettingDrawerOpen] = useState(false);

  /**
   * @author 梁强
   * @date 2023-05-16 星期二
   * @function 表单提交
   * @param {}
   * @return {}
   */
  const onFinish = () => {
    formInstance.validateFields().then(res => {
      console.log("res:", JSON.stringify(res, null, 4));
      console.log("flowState:", flowState);
      // 审批人提交的数据
      if (type === "approve") {
        return dispatch(
          currentFlowActions.updateFlow({
            id,
            attr: "properties",
            newValue: assemblyData(res),
          })
        );
      }
    });
  };

  /**
   * @author 梁强
   * @date 2023-05-16 星期二
   * @function 策略选择组件
   * @param {}
   * @return {}
   */
  const flowRenderNode = useMemo(() => {
    const componentMetas: IFlowComponentMetas = {
      // 发起人
      start: {
        Comp: StartComponent,
        props: {
          form: formInstance,
        },
      },
      // 审批人
      approve: {
        Comp: ApproveComponent,
        props: {
          form: formInstance,
        },
      },
      //条件分支
      condition: {
        Comp: ConditionComponent,
        props: {
          form: formInstance,
        },
      },
      // 抄送人
      copy: {
        Comp: CopyComponent,
        props: {
          form: formInstance,
          id,
        },
      },
    };

    const meta = componentMetas[type];

    if (!meta?.Comp) {
      return <></>;
    }

    return (
      <Form form={formInstance} layout="vertical">
        {<meta.Comp {...meta.props} />}
      </Form>
    );
  }, [formInstance, type, id]);

  if (type === "route") {
    return (
      <>
        <Condition nodes={conditions} parentId={id}></Condition>
        {childNode?.map(item => (
          <Fragment key={item}>
            <ConditionFlowItem {...flowState[item]} />
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <>
      <NodeWrap className="node-wrap">
        <NodeWrapBox className={className} onClick={setActiveNode}>
          <FlexBox
            className="title"
            justify={"space-between"}
            style={{ backgroundColor: typeColor[type] }}
          >
            <EditableTitle
              type={type}
              title={name}
              className={`name`}
              onBlur={value => {
                updateState("name", value || typeName[type]);
              }}
              placeholder={typeName[type]}
            />
            {type !== "start" && (
              <CloseOutlined className="remove" onClick={removeFlow} />
            )}
          </FlexBox>
          <FlexBox className="content" justify={"space-between"}>
            内容
            <RightOutlined />
          </FlexBox>
        </NodeWrapBox>
        <AddBtn id={id} isInCondition={false} />
        <Drawer
          title={
            <EditableTitle
              type={type}
              title={name}
              className={`name`}
              onBlur={value => {
                updateState("name", value || typeName[type]);
              }}
              placeholder={typeName[type]}
            />
          }
          width={550}
          closable={false}
          onClose={() => {
            setIsSettingDrawerOpen(false);
          }}
          open={isSettingDrawerOpen}
          bodyStyle={{ paddingBottom: 80 }}
          footerStyle={{ display: "flex", justifyContent: "flex-end" }}
          extra={
            <Button
              type={"text"}
              icon={
                <CloseOutlined
                  onClick={() => {
                    setIsSettingDrawerOpen(false);
                  }}
                />
              }
            ></Button>
          }
          footer={
            <Space>
              <Button
                onClick={() => {
                  setIsSettingDrawerOpen(false);
                }}
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={() => {
                  setIsSettingDrawerOpen(false);
                  onFinish();
                }}
                type="primary"
              >
                {t("common.ok")}
              </Button>
            </Space>
          }
        >
          {flowRenderNode}
        </Drawer>
      </NodeWrap>

      {childNode?.map(item => (
        <Fragment key={item}>
          <ConditionFlowItem {...flowState[item]} />
        </Fragment>
      ))}
    </>
  );
};
export const FlowItem = (props: FlowJson) => {
  return <ConditionFlowItem {...props} />;
};
