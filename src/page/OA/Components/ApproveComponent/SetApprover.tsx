/**
 * @author 梁强
 * @filename SetApprover.tsx
 * @date 2023-05-25 星期四
 * @description
 */
import { Checkbox, Col, Form, Input, Radio, Row, Select } from "antd";
import {
  approverSettingsMap,
  directDepartment,
  director,
  multipleApprover,
  noApprover,
  popupKeyMap,
  selectMethod,
  stateSelectMethodMap,
} from "./const";
import { useSetState } from "ahooks";
import { useCallback, useContext, useEffect, useMemo } from "react";
import AddMembersOrDepartment from "./AddMembersOrDepartment";
import "./index.less";
import RadioFormItemComponent, { OptionType } from "./RadioFormItemComponent";
import { SetApproverProps } from "./index.d";
import RadioGroup from "@/component/RadioGroup";
import ApproveContextPrivider, { ApproveContext } from "./Context";
import {
  IApproveData,
  IApproveNode,
  IApproveNodeOptions,
  IApproveNodeState,
  IDetails,
} from "./interface";

const ApproverConfigComponent = (props: SetApproverProps) => {
  const { t } = useTranslation();

  const { settingLabel, approverSettingsId, isApprover, form } = props;

  const { dyRenderComponentApi } = useContext(ApproveContext);

  const [{ stateSelectMethod, options, details, activeNode }, setState] =
    useSetState<IApproveNodeState>({
      stateSelectMethod: stateSelectMethodMap.单选,
      options: [],
      details: [],
      activeNode: undefined,
    });

  useEffect(() => {
    dyRenderNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @author 梁强
   * @date 2023-05-25 星期四
   * @function 根据后端数据请求，渲染节点数据
   * @param {}
   * @return {}
   */
  const dyRenderNodes = useCallback(
    () =>
      dyRenderComponentApi().then((res: IApproveData<IApproveNode>) => {
        const { options = [], details = [] } = res.data || {};
        const [{ value }] = options;
        const nodeSettings = details.find(
          item => item.optionValue === value
        ) as IDetails<string, IApproveNodeOptions>;
        setState({
          options,
          details,
          activeNode: nodeSettings,
        });
        form.setFieldsValue({
          settings: nodeSettings,
        });
      }),
    [dyRenderComponentApi, form, setState]
  );

  /**
   * @author 梁强
   * @date 2023-05-16 星期二
   * @function 多条件分支
   * @param {}
   * @return {}
   */
  const renderNode = useMemo(() => {
    const commonNode = isApprover ? (
      <>
        <Form.Item
          name={"multi"}
          label={t("approver.multiPersonApprovalMethod", { ns: "flowPath" })}
          initialValue={1}
        >
          <RadioGroup
            options={multipleApprover}
            ns="flowPath"
            direction="vertical"
            optionType="default"
          />
        </Form.Item>
        <Form.Item
          name={"noneResolve"}
          label={t("approver.whenTheApproverIsEmpty", { ns: "flowPath" })}
          initialValue={"admin"}
        >
          <RadioFormItemComponent
            extraFormName="noneResolveUser"
            options={noApprover}
            multiple={false}
          />
        </Form.Item>
      </>
    ) : (
      ""
    );
    //
    const approverSettingsRender = {
      [approverSettingsMap.直属主管]: (
        <>
          <Form.Item
            label={t("approver.directDepartment", { ns: "flowPath" })}
            style={{ margin: 0 }}
            className="promoter"
          >
            <Form.Item
              name={
                approverSettingsId ? "level-" + approverSettingsId : "level"
              }
              label={t("approver.promoter", { ns: "flowPath" })}
              initialValue={0}
            >
              <Select
                options={directDepartment}
                placeholder={t("approver.placeholderDirectDepartment", {
                  ns: "flowPath",
                })}
              />
            </Form.Item>
          </Form.Item>
          {commonNode}
        </>
      ),
      [approverSettingsMap.部门主管]: (
        <>
          <Form.Item
            label={t("approver.director", { ns: "flowPath" })}
            className="promoter"
          >
            <Form.Item
              name={
                approverSettingsId ? "level-" + approverSettingsId : "level"
              }
              label={t("approver.promoter", { ns: "flowPath" })}
              style={{ margin: 0 }}
              initialValue={0}
            >
              <Select
                options={director}
                placeholder={t("approver.placeholderDirector", {
                  ns: "flowPath",
                })}
              />
            </Form.Item>
            {isApprover && (
              <Form.Item
                name={"delegate"}
                style={{ margin: 0 }}
                valuePropName="checked"
              >
                <Checkbox>
                  {t("approver.approvalBySuperiorAgency", { ns: "flowPath" })}
                </Checkbox>
              </Form.Item>
            )}
          </Form.Item>
          {commonNode}
        </>
      ),
      [approverSettingsMap.指定成员]: (
        <>
          <Form.Item
            name={
              approverSettingsId
                ? "approvers-" + approverSettingsId
                : "approvers"
            }
            label={t("approver.addMembers", { ns: "flowPath" })}
          >
            <AddMembersOrDepartment mode="User" multiple={true} />
          </Form.Item>
          {commonNode}
        </>
      ),
      [approverSettingsMap.其他部门]: (
        <>
          <Form.Item
            name={"approvers"}
            label={`添加${
              options.find(item => item.value === activeNode?.optionValue)
                ?.label
            }`}
          >
            <AddMembersOrDepartment
              mode={popupKeyMap[activeNode?.popupKey] || "Department"}
              multiple={true}
            />
          </Form.Item>
          {(activeNode?.relationOptions || []).length ? (
            <Form.Item
              name={
                approverSettingsId
                  ? "relationKey-" + approverSettingsId
                  : "relationKey"
              }
              label={t("approver.otherApprover", { ns: "flowPath" })}
            >
              {isApprover && (
                <RadioGroup
                  options={
                    (activeNode?.relationOptions ||
                      []) as unknown as OptionType[]
                  }
                  direction="vertical"
                  optionType="default"
                  ns="flowPath"
                />
              )}
            </Form.Item>
          ) : undefined}
          {commonNode}
        </>
      ),
      [approverSettingsMap.发起人自选]: (
        <>
          <Form.Item
            name={
              approverSettingsId
                ? "chooseType-" + approverSettingsId
                : "chooseType"
            }
            label={t("approver.selectMethod", { ns: "flowPath" })}
            initialValue={stateSelectMethod}
          >
            <RadioGroup
              options={selectMethod}
              ns="flowPath"
              direction="vertical"
              optionType="default"
              onChange={e => {
                setState({
                  stateSelectMethod: +e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name={"chooseRange"}
            label={t("approver.selectRange", { ns: "flowPath" })}
            initialValue={1}
          >
            <RadioFormItemComponent
              extraFormName="chooseRangeApprovers"
              options={
                (activeNode?.chooseRangeOptions || []).map(item => ({
                  ...item,
                  mode: popupKeyMap[item.value],
                })) as unknown as OptionType[]
              }
            />
          </Form.Item>
          {stateSelectMethod === stateSelectMethodMap.多选 && (
            <Form.Item
              name={"multi"}
              label={t("approver.multiPersonApprovalMethod", {
                ns: "flowPath",
              })}
              initialValue={1}
            >
              <RadioGroup
                options={multipleApprover}
                direction="vertical"
                optionType="default"
                ns="flowPath"
              />
            </Form.Item>
          )}
          <Form.Item
            name={"noneResolve"}
            label={t("approver.whenTheApproverIsEmpty", { ns: "flowPath" })}
          >
            <RadioGroup
              options={[
                {
                  label: "approver.automaticAdoption",
                  value: "auto",
                },
              ]}
              ns="flowPath"
              direction="vertical"
              optionType="default"
            />
          </Form.Item>
        </>
      ),
    };
    //
    const NodeComponent = approverSettingsRender[activeNode?.optionRule];

    return NodeComponent;
    //
  }, [
    activeNode?.chooseRangeOptions,
    activeNode?.optionRule,
    activeNode?.optionValue,
    activeNode?.popupKey,
    activeNode?.relationOptions,
    approverSettingsId,
    isApprover,
    options,
    setState,
    stateSelectMethod,
    t,
  ]);

  return (
    <div id="setApprover">
      <Form.Item
        label={settingLabel ? t(settingLabel, { ns: "flowPath" }) : ""}
        initialValue={activeNode?.optionValue}
      >
        <Radio.Group
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #d0d3d6",
            borderRadius: 10,
          }}
          onChange={e => {
            const changeNode = details.find(
              item => item.optionValue === e.target.value
            );

            setState({
              activeNode: changeNode,
            });
            form.setFieldsValue({
              settings: changeNode,
            });
          }}
        >
          <Row>
            {options.map(item => {
              return (
                <Col span={8} key={item.value}>
                  <Radio value={item.value}>{item.label}</Radio>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      </Form.Item>
      {renderNode}
      <Form.Item name="settings" hidden>
        <Input hidden />
      </Form.Item>
    </div>
  );
};

const SetApprover = props => (
  <ApproveContextPrivider>
    <ApproverConfigComponent {...props} />
  </ApproveContextPrivider>
);

export default SetApprover;
