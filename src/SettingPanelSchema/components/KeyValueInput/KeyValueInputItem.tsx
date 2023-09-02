/*
 * @Date: 2022-10-14 13:42:44
 * @LastEditTime: 2023-05-23 14:36:45
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { MPContainer } from "@/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Space, Popover, Form, Button } from "antd";
import { ChangeEvent, useState } from "react";
import { SortableHandle } from "react-sortable-hoc";
import { HolderOutlined } from "@ant-design/icons";

export interface ItemProps {
  label: string;
  value: string;
  index: number;
  removeItem: (index: number) => void;
  updateItem: (newValue: any) => void;
}

const DragHandle = SortableHandle(() => (
  <HolderOutlined className="cursor-move" />
));

const PopoverContent = ({
  index,
  updateItem,
  label,
  value,
}: Partial<ItemProps>) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<{ label: string; value: string }>();
  const trans = (key: string, config?: Record<string, string>) =>
    t(key, { ns: "common", ...config });

  const onOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateItem({
      [index]: {
        label: {
          $set: values.label,
        },
        value: {
          $set: values.value,
        },
      },
    });
  };

  return (
    <Space direction={"vertical"}>
      <Form form={form}>
        <Form.Item
          label={`${trans("show")}${trans("value")}`}
          name={"label"}
          rules={[
            {
              required: true,
              message: `${t("i18n.requiredTip", {
                ns: "formRules",
                name: `${trans("show")}${trans("value")}`,
              })}`,
            },
          ]}
        >
          <Input
            placeholder={`${trans("chooseItem")}${index + 1}`}
            defaultValue={label}
          />
        </Form.Item>

        <Form.Item
          label={`${trans("chooseItem")}${trans("value")}`}
          name={"value"}
        >
          <Input
            placeholder={`${trans("chooseItem")}${index + 1}`}
            defaultValue={value}
          />
        </Form.Item>
        <Button type={"primary"} onClick={onOk}>
          {trans("ok")}
        </Button>
      </Form>
    </Space>
  );
};

export const KeyValueInputItem = ({
  label,
  value,
  index,
  removeItem,
  updateItem,
}: ItemProps) => {
  const { t } = useTranslation();
  const [key, setKey] = useState(label);
  const onKeyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  return (
    <MPContainer margin={"10px 0 0"} padding={0}>
      <Space size={5}>
        <DragHandle />
        <Input
          style={{ width: "100%" }}
          value={key}
          placeholder={`${t("chooseItem", { ns: "common" })}${index + 1}`}
          onChange={onKeyInputChange}
          onBlur={() => {
            let value;
            if (key.trim()) {
              value = key.trim();
            } else {
              value = `${t("chooseItem", { ns: "common" })}${index + 1}`;
              setKey(value);
            }
            updateItem({
              [index]: {
                label: {
                  $set: value,
                },
                value: {
                  $set: value,
                },
              },
            });
          }}
        />
        <Popover
          content={
            <PopoverContent
              index={index}
              updateItem={updateItem}
              label={label}
              value={value}
            />
          }
          trigger={"click"}
        >
          <FontAwesomeIcon className="cursor-pointer" icon={"edit"} />
        </Popover>
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={"trash"}
          onClick={() => {
            removeItem(index);
          }}
        />
      </Space>
    </MPContainer>
  );
};
