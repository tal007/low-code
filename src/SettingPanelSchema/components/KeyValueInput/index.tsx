/*
 * @Date: 2022-10-14 13:43:13
 * @LastEditTime: 2023-05-23 15:01:23
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: kye value 输入
 */

import { FlexBox, MPContainer } from "@/style";
import {
  Button,
  Divider,
  Input,
  List,
  Modal,
  Space,
  Tag,
  Typography,
} from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { KeyValueInputItem } from "./KeyValueInputItem";
import update from "immutability-helper";
import { nanoid } from "@/utils/helper";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useTranslation } from "react-i18next";
import { useNode } from "@craftjs/core";
import { useEditorAction } from "@/EditorWidgets/hooks";

export interface KeyValueInputItemProps {
  label: string;
  value: string;
  id: string;
}

export interface KeyValueInputProps {
  defaultValue: Omit<KeyValueInputItemProps, "id">[];
  onHandler: (newValue: Omit<KeyValueInputItemProps, "id">[]) => void;
}

export interface ItemProps {
  item: KeyValueInputItemProps;
  i: number;
}

interface SortableContainerProps {
  children: ReactNode;
  createNewItem: () => void;
  batchAdd: (KeyValueInputItemProps: []) => void;
  defaultValue: KeyValueInputItemProps[];
}

const Sortable = SortableContainer<SortableContainerProps>(
  (props: SortableContainerProps) => {
    const { children, createNewItem, batchAdd, defaultValue } = props;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const trans = (key: string, config?: Record<string, string>) =>
      t(key, { ns: "common", ...config });
    const transEditor = (key: string, config?: Record<string, string>) =>
      t(key, { ns: "editor", ...config });

    const renderDefault = () => {
      return defaultValue
        .map(item => {
          const { label, value } = item;
          return label === value ? label : `${label}|${value}`;
        })
        .join("\n");
    };
    const [textAreaValue, setTextAreaValue] = useState(renderDefault);

    const dealInputValue = (value: string): KeyValueInputItemProps[] => {
      const valueArray = value.split("\n");
      return valueArray
        .filter(item => item.trim() !== "")
        .map(item => {
          const [label, value] = item.split("|");
          return {
            id: nanoid(8),
            label: label.trim(),
            value: value?.trim() ? value.trim() : label.trim(),
          };
        });
    };

    const onOk = () => {
      const newValue = dealInputValue(textAreaValue);
      batchAdd(newValue as any);
      setOpen(false);
    };

    const { query } = useEditorAction();
    const { id } = useNode();
    const nodeData = query.getNodes()[id]?.data;
    const displayName =
      nodeData.props.name ||
      nodeData?.custom?.displayName ||
      nodeData?.displayName ||
      "";

    return (
      <FlexBox
        justify="flex-start"
        alignItems={"flex-start"}
        direction="column"
        style={{ height: "auto" }}
      >
        {children}
        <MPContainer margin={"10px 0"} padding="0">
          <Space size={1}>
            <Button type={"link"} onClick={createNewItem}>
              {trans("add")}
              {trans("chooseItem")}
            </Button>
            <Divider type={"vertical"}></Divider>
            <Button type={"link"} onClick={() => setOpen(true)}>
              {trans("batch")}
              {trans("add")}
            </Button>
          </Space>
        </MPContainer>
        <Modal
          width={800}
          title={`${displayName}-${trans("batch")}${trans("edit")}`}
          closable
          open={open}
          onOk={() => onOk()}
          onCancel={() => setOpen(false)}
          okText={trans("ok")}
          cancelText={trans("cancel")}
          destroyOnClose
        >
          <Typography.Paragraph>
            {transEditor("rightPanel.dataSource.title")}
          </Typography.Paragraph>
          <List bordered>
            <List.Item>
              <Space size={[20, 50]}>
                <div style={{ width: 240 }}>
                  {transEditor("rightPanel.dataSource.format1")}
                </div>
                <div style={{ width: 140 }}>
                  <Tag color={"blue"}>
                    {transEditor("rightPanel.dataSource.showValue")}
                  </Tag>
                </div>
                <div>
                  {transEditor("rightPanel.dataSource.inputDemo")}
                  {transEditor("rightPanel.dataSource.chooseItem1")}
                </div>
              </Space>
            </List.Item>
            <List.Item>
              <Space size={[20, 50]}>
                <div style={{ width: 240 }}>
                  {transEditor("rightPanel.dataSource.format2")}
                </div>
                <Space direction={"horizontal"} size={1} style={{ width: 140 }}>
                  <Tag color={"blue"} style={{ marginRight: 0 }}>
                    {transEditor("rightPanel.dataSource.showValue")}
                  </Tag>
                  |
                  <Tag color={"blue"}>
                    {transEditor("rightPanel.dataSource.trueValue")}
                  </Tag>
                </Space>
                <div>
                  {transEditor("rightPanel.dataSource.inputDemo")}
                  {transEditor("rightPanel.dataSource.chooseItem1")}
                  {transEditor("rightPanel.dataSource.chooseItem'sValue")}
                </div>
              </Space>
            </List.Item>
          </List>
          <Input.TextArea
            defaultValue={renderDefault()}
            style={{ marginTop: 20 }}
            rows={10}
            onChange={e => setTextAreaValue(e.target.value)}
          ></Input.TextArea>
        </Modal>
      </FlexBox>
    );
  }
);

export const KeyValueInput = (props: KeyValueInputProps) => {
  const { onHandler } = props;
  const { t } = useTranslation();
  const trans = (key: string, config?: Record<string, string>) =>
    t(key, { ns: "common", ...config });

  const [defaultValue, setDefaultValue] = useState<KeyValueInputItemProps[]>(
    props.defaultValue.map(value => ({ ...value, id: nanoid(8) }))
  );

  useEffect(() => {
    onHandler(
      defaultValue.map(item => ({ label: item.label, value: item.value }))
    );
  }, [defaultValue, onHandler]);

  const createNewItem = () => {
    setDefaultValue(
      update(defaultValue, {
        $push: [
          {
            label: `${trans("chooseItem")}${defaultValue.length + 1}`,
            value: `${trans("chooseItem")}${defaultValue.length + 1}`,
            id: nanoid(8),
          },
        ],
      })
    );
  };

  // 批量添加
  const batchAdd = (newValue: KeyValueInputItemProps[]) => {
    setDefaultValue(newValue);
  };

  const removeItem = (index: number) => {
    setDefaultValue(
      update(defaultValue, {
        $splice: [[index, 1]],
      })
    );
  };

  const updateItem = (newValue: never) => {
    setDefaultValue(update(defaultValue, newValue));
  };

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setDefaultValue((prevData: KeyValueInputItemProps[]) => {
      return update(prevData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevData[dragIndex]],
        ],
      });
    });
  }, []);

  const SortableItem = SortableElement<ItemProps>(({ item, i }: ItemProps) => {
    return (
      <KeyValueInputItem
        label={item.label}
        value={item.value}
        index={i}
        removeItem={removeItem}
        updateItem={updateItem}
      />
    );
  });

  return (
    <Sortable
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) => moveItem(oldIndex, newIndex)}
      createNewItem={createNewItem}
      batchAdd={batchAdd}
      defaultValue={defaultValue}
    >
      {defaultValue.map((item, index) => (
        <SortableItem key={item.id} item={item} index={index} i={index} />
      ))}
    </Sortable>
  );
};
