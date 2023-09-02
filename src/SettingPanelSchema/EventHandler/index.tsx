/*
 * @Date: 2022-11-02 11:21:27
 * @LastEditTime: 2023-05-04 10:56:35
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 点击事件
 */

import { MPContainer } from "@/style";
import { Collapse, Empty } from "antd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import update from "immutability-helper";
import { ReactNode, useState, useCallback, useEffect } from "react";
import { renderDeleteAndAddIcon } from "./renderDeleteAndAddIcon";
import { DropdownButton } from "./DropdownButton";
import { EventItem, EventItemProps } from "./EventItem";
import { nanoid } from "@/utils/helper";
import { useNode } from "@craftjs/core";
import { eventTypeMap } from "./actionTypeMap";
import { EventTypeModal } from "@/component/EventTypeModal";

const { Panel } = Collapse;

export interface EventHandlerProps {
  actionTypes: string[];
}

export const EventHandler = (props: EventHandlerProps) => {
  const { actionTypes } = props;

  const {
    actions: { setProp },
    onEvent,
  } = useNode(node => {
    return {
      onEvent: node.data.props.onEvent,
    };
  });

  const [events, setEvents] = useState<{ [key: string]: EventItemProps[] }>(
    onEvent
  );

  useEffect(() => {
    setProp(props => (props.onEvent = events), 500);
  }, [events, setProp]);

  const Sortable = SortableContainer<{ children: ReactNode }>(
    (props: React.HTMLAttributes<HTMLDivElement>) => {
      return <div>{props.children}</div>;
    }
  );

  const SortableItem = SortableElement<{
    i: number;
    item: EventItemProps;
    action: string;
  }>(
    ({
      i,
      item,
      action,
    }: {
      i: number;
      item: EventItemProps;
      action: string;
    }) => {
      return (
        <EventItem
          index={i}
          actionType={item.actionType}
          id={item.id}
          formData={item.formData}
          highSetting={item.highSetting}
          deleteAction={() => removeItem(i, action)}
          editAction={() => {
            setCurrentAction(action);
            setDefaultFormValue(events[action][i].formData);
            setTabType(events[action][i].actionType);
            updateItem(i);
          }}
        />
      );
    }
  );

  const [tabType, setTabType] = useState("jump");
  const [currentAction, setCurrentAction] = useState("");
  const [defaultFormValue, setDefaultFormValue] = useState("");
  const [addOrUpdate, setAddOrUpdate] = useState("add");

  const createNewItem = (action: string) => {
    setTabType("jump");
    if (events[action]) {
      setDefaultFormValue("");
      setCurrentAction(action);
      setAddOrUpdate("add");
      setTimeout(() => {
        setEventModalOpen(true);
      }, 100);
    } else {
      setEvents({
        ...events,
        [action]: [],
      });
    }
  };

  const removeItem = (index: number, action: string) => {
    setEvents(
      update(events, {
        [action]: {
          $splice: [[index, 1]],
        },
      })
    );
  };

  const [editItemIndex, setEditItemIndex] = useState(0);
  const updateItem = (index: number) => {
    setAddOrUpdate("update");
    setTimeout(() => {
      setEventModalOpen(true);
    }, 100);
    setEditItemIndex(index);
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number, action: string) => {
      setEvents((prevData: { [key: string]: EventItemProps[] }) => {
        return update(prevData, {
          [action]: {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevData[action][dragIndex] as EventItemProps],
            ],
          },
        });
      });
    },
    []
  );

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <MPContainer margin={"0 0 10px 0"} padding={0}>
        <DropdownButton
          items={actionTypes.map(action => ({
            label: t(eventTypeMap[action]),
            key: action,
            disabled: !!events[action],
          }))}
          handleMenuClick={createNewItem}
        />
      </MPContainer>
      <EventTypeModal
        tabType={tabType}
        open={eventModalOpen}
        onCancel={() => setEventModalOpen(false)}
        onOk={() => {
          setEventModalOpen(false);
        }}
        defaultFormValue={defaultFormValue}
        getCbValue={value => {
          if (addOrUpdate === "add") {
            setEvents(
              update(events, {
                [currentAction]: {
                  $push: [{ id: nanoid(8), ...value }],
                },
              })
            );
          } else {
            setEvents(
              update(events, {
                [currentAction]: {
                  [editItemIndex]: {
                    $set: {
                      ...value,
                      id: events[currentAction][editItemIndex].id,
                    },
                  },
                },
              })
            );
          }
        }}
      />
      <Collapse expandIconPosition={"end"} defaultActiveKey={actionTypes}>
        {actionTypes.map(action => {
          const currentActions = events[action];
          const currentActionLength = currentActions?.length;

          return (
            currentActions && (
              <Panel
                header={t(eventTypeMap[action])}
                key={action}
                extra={renderDeleteAndAddIcon({
                  add: () => createNewItem(action),
                  remove: () => {
                    const newEvents = { ...events };
                    delete newEvents[action];
                    setEvents({ ...newEvents });
                  },
                  key: action,
                })}
              >
                {currentActionLength ? (
                  <Sortable
                    useDragHandle
                    onSortEnd={({ oldIndex, newIndex }) =>
                      moveItem(oldIndex, newIndex, action)
                    }
                  >
                    {currentActions.map((item, index) => (
                      <SortableItem
                        key={item.id}
                        index={index}
                        i={index}
                        item={item}
                        action={action}
                      />
                    ))}
                  </Sortable>
                ) : (
                  <Empty />
                )}
              </Panel>
            )
          );
        })}
      </Collapse>
    </>
  );
};
