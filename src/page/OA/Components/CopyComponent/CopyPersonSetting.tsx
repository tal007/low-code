/*
 * @Date: 2023-05-18 17:29:16
 * @LastEditTime: 2023-05-22 13:57:29
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 抄送人设置
 */
import { useState, useMemo } from "react";
import { Form, Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import SetApprover from "../ApproveComponent/SetApprover";

const CopyPersonSetting = () => {
  const { t } = useTranslation();

  const createId = () => {
    return (Math.random() * 1000000).toFixed(0);
  };
  const [copySettingIds, setCopySettingIds] = useState<string[]>([createId()]);

  const addCopyPerson = () => {
    setCopySettingIds([...copySettingIds, createId()]);
  };

  // const onDelete = useCallback((id: string) => {
  //   setCopySettingIds(copySettingIds.filter(item => item !==id));
  // }, [])
  const copySettingRender = useMemo(() => {
    const _len = copySettingIds.length;
    const headStyle = {
      backgroundColor: "#eee",
    };
    const onDelete = (id: string) => {
      setCopySettingIds(copySettingIds.filter(item => item !== id));
    };
    const _render = copySettingIds.map(item => {
      const DeleteComponent =
        _len > 1 ? (
          <DeleteOutlined
            onClick={() => {
              onDelete(item);
            }}
          />
        ) : (
          ""
        );
      return (
        <Form.Item name={"copy-setting-" + item} key={item}>
          <Card
            size="small"
            title={t("copy.copyPersonSet", { ns: "flowPath" })}
            extra={DeleteComponent}
            headStyle={headStyle}
          >
            <SetApprover isApprover={false} approverSettingsId={item} />
          </Card>
        </Form.Item>
      );
    });
    return <>{_render}</>;
  }, [copySettingIds, t, setCopySettingIds]);
  return (
    <>
      {copySettingRender}
      <Button onClick={addCopyPerson}>添加抄送人</Button>
    </>
  );
};

export default CopyPersonSetting;
