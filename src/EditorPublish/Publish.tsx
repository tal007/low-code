/*
 * @Author: 刘玉田 mrliu819@foxmail.com
 * @Date: 2023-04-19 11:37:44
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-04-19 14:54:12
 * @Description:
 */
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useAjax } from "@/hooks/useAjax";
import { useQuery } from "@tanstack/react-query";
import { currentFormValue } from "@/store/formValue.slice";
import { useUrlQueryParams } from "@/hooks/useUrlQueryParams";
import { useState } from "react";

export const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const [params] = useUrlQueryParams(["formId"]);
  const formValue = useSelector(currentFormValue);
  const client = useAjax();
  const { refetch } = useQuery<null, Error>({
    queryKey: ["save-data"],
    queryFn: () =>
      client("table/add", {
        method: "POST",
        data: {
          formId: params.formId,
          data: JSON.stringify(formValue),
        },
      }),
    enabled: false,
  });

  const submitData = () => {
    setLoading(true);
    refetch().finally(() => {
      setLoading(false);
    });
  };
  return (
    <Button onClick={submitData} loading={loading} type={"primary"}>
      提交
    </Button>
  );
};
