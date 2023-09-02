/**
 * @author 梁强
 * @filename AdvancedSetting.tsx
 * @date 2023-05-16 星期二
 * @description
 */
import { Checkbox, Form, Space } from "antd";
import { automaticApproval } from "./const";

const AdvancedSetting = () => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        name={"automaticApproval"}
        label={t("approver.automaticApproval", { ns: "flowPath" })}
      >
        <Checkbox.Group>
          <Space direction="vertical">
            {automaticApproval.map(item => {
              return (
                <Checkbox value={item.value} key={item.value}>
                  {t.apply(null, [...item.label])}
                </Checkbox>
              );
            })}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default AdvancedSetting;
