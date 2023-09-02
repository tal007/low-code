/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-05-09 10:54:04
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-09 11:44:28
 * @Description: 页面出错 404 500 403 等
 */
import { Button, Result, Space } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useNavigate } from "react-router-dom";

type PageErrorProps = {
  status: ResultStatusType;
  subTitle: string;
};

export const PageError = (props: PageErrorProps) => {
  const { status, subTitle } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <Result
      status={status}
      title={status}
      subTitle={subTitle}
      extra={
        <Space>
          <Button type="primary" onClick={() => window.history.back()}>
            {t("common.back")}
          </Button>
          <Button type="primary" onClick={goHome}>
            {t("common.goHome")}
          </Button>
        </Space>
      }
    />
  );
};

export default PageError;
