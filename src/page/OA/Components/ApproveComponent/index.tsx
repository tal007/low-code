/**
 * @author 梁强
 * @date 2023-05-16 星期二
 * @function 审批人组件
 * @param {}
 * @return {}
 */
import { Col, Empty, Form, FormInstance, Radio, Row, Tabs } from "antd";
import { approvalOperateMap, approvalType, approvalTypeMap } from "./const";
import { useSetState } from "ahooks";
import SetApprover from "./SetApprover";
import OperationPermissions from "./OperationPermissions";
import AdvancedSetting from "./AdvancedSetting";
import { useMemo } from "react";

interface ApproveComponentProps {
  form: FormInstance;
}

const ApproveComponent = (props: ApproveComponentProps) => {
  const { form } = props;
  const { t } = useTranslation();
  const [{ showItemSegmented, showApprovalType }, setState] = useSetState({
    showItemSegmented: approvalOperateMap.设置审批人,
    showApprovalType: approvalTypeMap.人工审批,
  });

  /**
   * @author 梁强
   * @date 2023-05-16 星期二
   * @function 根据审批类型渲染
   * @param {}
   * @return {}
   */
  const approvalTypeRender = useMemo(() => {
    const approvalNodeRender = {
      [approvalTypeMap.人工审批]: (
        <>
          <Tabs
            defaultActiveKey={showItemSegmented}
            onChange={(e: string) => {
              setState({
                showItemSegmented: e,
              });

              form.setFieldsValue({
                segmented: e,
              });
            }}
            type="card"
          >
            <Tabs.TabPane tab={"设置审批人"} key="1" forceRender={true}>
              <SetApprover
                settingLabel="approver.approverSettings"
                isApprover={true}
                form={props.form}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={"表单操作权限"} key="2" forceRender={true}>
              <OperationPermissions />
            </Tabs.TabPane>
            <Tabs.TabPane tab={"高级设置"} key="3" forceRender={true}>
              <AdvancedSetting />
            </Tabs.TabPane>
          </Tabs>
        </>
      ),
      [approvalTypeMap.自动通过]: (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
      [approvalTypeMap.自动拒绝]: (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ),
    };

    const Component = approvalNodeRender[showApprovalType];

    return Component;
  }, [form, props.form, setState, showApprovalType, showItemSegmented]);

  return (
    <div id="approveContainer">
      <Form.Item
        name="approvalType"
        label={t("approver.approvalType", { ns: "flowPath" })}
        initialValue={showApprovalType}
      >
        <Radio.Group
          style={{ width: "100%" }}
          onChange={e => {
            setState({
              showApprovalType: +e.target.value,
            });
          }}
          defaultValue={[showApprovalType]}
        >
          <Row>
            {approvalType.map(item => {
              return (
                <Col span={8} key={item.value}>
                  <Radio value={item.value}>
                    {t.apply(null, [...item.label])}
                  </Radio>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      </Form.Item>
      {approvalTypeRender}
    </div>
  );
};

export default ApproveComponent;
