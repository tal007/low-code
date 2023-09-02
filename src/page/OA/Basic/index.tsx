/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-09 09:11:20
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @LastEditTime: 2023-05-25 17:59:04
 * @FilePath: \mylcp_web\src\page\OA\Basic\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Form, FormInstance, Input, Select } from "antd";
import styled from "styled-components";
import { useQueryAllGroup } from "@/api/formManage";
import { useQuery } from "@tanstack/react-query";
import { Group } from "@/page/OrganizationalStructure/FormManagement/TreeNode/index.d";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { currentEditorConfigActions } from "@/store/editor.slice";

const FormArea = styled.div`
  width: 900px;
  height: 500px;
  margin: 50px auto 0;
  background-color: #fff;
  padding: 10px 80px 10px 80px;
  border: 1px solid transparent;
`;

type BasicProps<T> = {
  form: FormInstance<T>;
  setFormTitle: Dispatch<SetStateAction<string>>;
};

export const Basic = (props: BasicProps<any>) => {
  const { form } = props;
  const { TextArea } = Input;
  const { t } = useTranslation();
  useDocumentTitle(`${t("documentTitle.editor")}-${t("documentTitle.editor")}`);

  const allGroupClient = useQueryAllGroup();

  const { data: selectOptions } = useQuery<Group[]>(["queryAllGroup"], {
    queryFn: () => allGroupClient(),
    initialData: [],
  });

  const dispatch = useDispatch();

  return (
    <FormArea>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name={"processName"}
          label={"表单名称"}
          rules={[{ required: true }]}
        >
          <Input
            placeholder={"请输入"}
            maxLength={50}
            onChange={e => {
              form.setFieldValue("processName", e.target.value);
              props.setFormTitle(e.target.value);
              dispatch(
                currentEditorConfigActions.setBasicFormValue({
                  key: "processName",
                  value: e.target.value,
                })
              );
            }}
          />
        </Form.Item>
        <Form.Item
          name={"groupId"}
          label={"所在分组"}
          rules={[{ required: true }]}
        >
          <Select
            options={selectOptions}
            fieldNames={{ label: "name", value: "id" }}
            onChange={v => {
              form.setFieldValue("groupId", v);
              dispatch(
                currentEditorConfigActions.setBasicFormValue({
                  key: "groupId",
                  value: v,
                })
              );
            }}
          />
        </Form.Item>
        <Form.Item name={"processRemark"} label={"表单说明"}>
          <TextArea
            rows={4}
            showCount
            maxLength={100}
            onChange={e => {
              form.setFieldValue("processRemark", e.target.value);
              dispatch(
                currentEditorConfigActions.setBasicFormValue({
                  key: "processRemark",
                  value: e.target.value,
                })
              );
            }}
          />
        </Form.Item>
      </Form>
    </FormArea>
  );
};
