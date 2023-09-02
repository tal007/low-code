/**
 * @author 梁强
 * @filename OrgStructureTree.tsx
 * @date 2023-05-18 星期四
 * @description 组织架构树🌲
 */
import { Breadcrumb, Checkbox, Tag } from "antd";
import DebounceSelect from "./DebounceSelect";
import {
  Dulist,
  fetchList,
  findNodeLevelAllByValue,
  flattenTree,
  makeBreadcrumb,
} from "./hooks";
import { ScrollContainer } from "@/component/ScrollContainer";
import SvgSkeleton from "./svgSkeleton";
import { useSetState } from "ahooks";
import React, { useCallback, useEffect, useImperativeHandle } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AcademyComponentViewProps } from "./DepartmentModal";
import { UserComponentViewProps } from "./UserModal";
import "./index.less";

export interface DepartMentAndUserProps {
  prefixCls?: string;
  hasMultiple?: boolean; // 全选
  mode?: DepartMentAndUserTreeItemType;
  nodeProps?: AcademyComponentViewProps | UserComponentViewProps;
  onChange?: (
    nodes: DepartMentAndUserTreeItem[],
    removeNodes?: DepartMentAndUserTreeItem[]
  ) => void;
  style?: React.CSSProperties;
}

export type DepartMentAndUserTreeItemType = "Department" | "User" | "Role";

export interface DepartMentAndUserTreeItem {
  url?: string;
  name: string;
  id: number | string;
  type?: DepartMentAndUserTreeItemType;
  children?: DepartMentAndUserTreeItem[];
  value?: string;
  parent?: DepartMentAndUserTreeItem | null;
  checked?: boolean;
  isCommander?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BreadcrumbItem extends DepartMentAndUserTreeItem {
  //
}

export interface DepartMentAndUserState<T, K> {
  loading: boolean;
  activeNode: T | undefined;
  breadcrumb: K[];
  orgNodes: T[];
  leftNodes: T[];
  selectNodes: T[];
  flattenLeftTree: T[];
}

export type OrgStructureTreeRef = React.Ref<{
  selectNodes: DepartMentAndUserTreeItem[];
  removeNodes: (nodes: DepartMentAndUserTreeItem[]) => void;
}>;

const OrgStructureTree = React.forwardRef(
  (props: DepartMentAndUserProps, ref: OrgStructureTreeRef) => {
    const {
      prefixCls = "du-picker",
      mode = "Department",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange = () => {},
      hasMultiple = false,
      ...restProps
    } = props;
    const { t } = useTranslation();
    const [
      {
        loading,
        activeNode,
        orgNodes,
        flattenLeftTree,
        breadcrumb,
        leftNodes,
        selectNodes,
      },
      setState,
    ] = useSetState<
      DepartMentAndUserState<DepartMentAndUserTreeItem, BreadcrumbItem>
    >({
      loading: false,
      activeNode: undefined, // 激活的节点
      breadcrumb: [
        {
          id: -1,
          name: t("approver.organizationalStructure", { ns: "flowPath" }),
        },
      ], // 面包屑
      orgNodes: Dulist, // 原始节点数据
      leftNodes: Dulist, // left nodes
      selectNodes: [], // right nodes
      flattenLeftTree: [], // 平铺所有节点
    });

    /**
     * @author 梁强
     * @date 2023-05-18 星期四
     * @function 选中某个节点
     * @param {}
     * @return {}
     */
    const checkboxItemChange = useCallback(
      (e, item) => {
        const removeNode = leftNodes.filter(
          leftNodesItem => leftNodesItem.id === item.id
        );
        const checkedLeftNodes = leftNodes.map(leftNodesItem => {
          if (leftNodesItem.id === item.id) {
            return {
              ...leftNodesItem,
              checked: e.target.checked,
            };
          }
          // 单选
          if (!hasMultiple) {
            return {
              ...leftNodesItem,
              checked: false,
            };
          }
          return {
            ...leftNodesItem,
          };
        });
        const changeNode = [...checkedLeftNodes.filter(item => !!item.checked)];
        onChange && onChange(changeNode, !e.target.checked ? removeNode : []);
        return setState({
          leftNodes: checkedLeftNodes,
          selectNodes: changeNode,
        });
      },
      [hasMultiple, leftNodes, onChange, setState]
    );
    /**
     * @author 梁强
     * @date 2023-05-18 星期四
     * @function 全选
     * @param {}
     * @return {}
     */
    const checkboxMultiple = useCallback(
      e => {
        const checkList = (
          !activeNode ? leftNodes : activeNode?.children || []
        ).map(item => ({
          ...item,
          checked: e.target.checked,
        }));
        if (e.target.checked) {
          onChange(checkList);
          return setState({
            leftNodes: checkList,
            selectNodes: checkList,
          });
        }
        onChange([], checkList);
        setState({
          leftNodes: checkList,
          selectNodes: [],
        });
      },
      [activeNode, leftNodes, onChange, setState]
    );

    /**
     * @author 梁强
     * @date 2023-05-18 星期四
     * @function 面包屑点击
     * @param {}
     * @return {}
     */
    const breadcrumbClick = useCallback(
      (item, idx) => {
        if (idx === breadcrumb.length - 1) {
          return;
        }
        // 顶层
        if (item.id === -1) {
          const topLevelParent = flattenLeftTree.filter(
            flattenLeftTreeItem => flattenLeftTreeItem.parent === null
          );
          return setState({
            activeNode: undefined,
            leftNodes: topLevelParent.map(item => {
              if (
                selectNodes.some(
                  selectNodesItem => selectNodesItem.id === item.id
                )
              ) {
                return {
                  ...item,
                  checked: true,
                };
              }
              return item;
            }),
          });
        }
        setState({
          activeNode: item,
          leftNodes: findNodeLevelAllByValue(item.id, orgNodes).map(item => {
            if (
              selectNodes.some(
                selectNodesItem => selectNodesItem.id === item.id
              )
            ) {
              return {
                ...item,
                checked: true,
              };
            }
            return item;
          }),
        });
      },
      [breadcrumb.length, flattenLeftTree, orgNodes, selectNodes, setState]
    );

    /**
     * @author 梁强
     * @date 2023-05-18 星期四
     * @function 删除节点
     * @param {}
     * @return {}
     */
    const removeNodes = useCallback(
      (nodes: DepartMentAndUserTreeItem[]) => {
        if (!nodes.length) {
          return;
        }
        // 单选
        if (!hasMultiple) {
          const [singleActiveNode] = nodes;

          const [filterbreadcrumb] = flattenLeftTree.filter(
            item => item.id === singleActiveNode.id
          );
          return setState({
            leftNodes: findNodeLevelAllByValue(
              singleActiveNode?.id,
              orgNodes,
              false
            ),
            breadcrumb: [
              {
                id: -1,
                name: t("approver.organizationalStructure", { ns: "flowPath" }),
              },
              ...makeBreadcrumb(filterbreadcrumb).filter(
                item => item.id !== filterbreadcrumb.id
              ),
            ],
          });
        }
        // 多选
        const isClearAll =
          nodes.map(item => item.id).join("-") ===
          selectNodes.map(item => item.id).join("-");
        if (isClearAll) {
          return setState({
            leftNodes: nodes.map(item => ({ ...item, checked: false })),
            selectNodes: [],
          });
        }
        for (const node of nodes) {
          checkboxItemChange({ target: { checked: false } }, node);
        }
      },
      [
        checkboxItemChange,
        flattenLeftTree,
        hasMultiple,
        orgNodes,
        selectNodes,
        setState,
        t,
      ]
    );

    console.log("leftNodes", leftNodes);

    useImperativeHandle(
      ref,
      () => {
        return {
          selectNodes: selectNodes, // 单选模式下： 只有重新选择会改变，多选模式下：只有选择单个或者不同层级
          removeNodes: (nodes: DepartMentAndUserTreeItem[]) =>
            removeNodes(nodes),
        };
      },
      [removeNodes, selectNodes]
    );

    useEffect(() => {
      setState({
        flattenLeftTree: flattenTree(orgNodes),
      });
    }, [orgNodes, setState]);

    useEffect(() => {
      if (activeNode?.id) {
        const [treeNode] = flattenLeftTree.filter(
          item => item.id === activeNode.id
        );
        return setState({
          breadcrumb: [
            {
              id: -1,
              name: t("approver.organizationalStructure", { ns: "flowPath" }),
            },
            ...makeBreadcrumb(treeNode),
          ],
        });
      }
      setState({
        breadcrumb: [
          {
            id: -1,
            name: t("approver.organizationalStructure", { ns: "flowPath" }),
          },
        ],
      });
    }, [activeNode?.id, flattenLeftTree, setState, t]);

    useEffect(() => {
      if (activeNode && loading) {
        setTimeout(() => {
          if (!selectNodes.length) {
            return setState({
              leftNodes: activeNode.children,
              loading: false,
            });
          }
          setState({
            leftNodes: (activeNode?.children || []).map(item => {
              if (
                selectNodes.some(
                  selectNodesItem => selectNodesItem.id === item.id
                )
              ) {
                return {
                  ...item,
                  checked: true,
                };
              }
              return item;
            }),
            loading: false,
          });
        }, 500);
      }
    }, [activeNode, loading, selectNodes, setState]);

    return (
      <div className={`${prefixCls}-left`} {...restProps}>
        <div className={`${prefixCls}-left-search-input`}>
          <DebounceSelect
            placeholder={t(
              `form.AcademyAndUserCommon.${
                mode === "Department"
                  ? "searchDartmentPlaceholder"
                  : "searchUserPlaceholder"
              }`,
              { ns: "editorWidget" }
            )}
            fetchOptions={fetchList}
            style={{ width: "100%" }}
            onChange={(value, option) => {
              console.log("DebounceSelect value:", { value, option });
            }}
          />
        </div>
        <div className={`${prefixCls}-left-select-list`}>
          <div className={`${prefixCls}-left-breadcrumb`}>
            <Breadcrumb>
              {breadcrumb.map((item, idx) => (
                <Breadcrumb.Item
                  key={item.id}
                  className={classNames(`${prefixCls}-left-breadcrumb-node`, {
                    [`${prefixCls}-left-breadcrumb-node-gray`]:
                      idx === breadcrumb.length - 1,
                  })}
                  onClick={() => breadcrumbClick(item, idx)}
                >
                  {item.name}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          {hasMultiple && (
            <div className={`${prefixCls}-left-all`}>
              <Checkbox
                disabled={!leftNodes?.length}
                onChange={checkboxMultiple}
                indeterminate={
                  leftNodes.some(item => !item?.checked) ? true : false
                }
                checked={leftNodes.every(item => item?.checked)}
              />
              <span style={{ paddingLeft: 8 }}>全选</span>
            </div>
          )}
          <ScrollContainer>
            {loading ? (
              <SvgSkeleton />
            ) : (
              leftNodes.map(item => {
                return (
                  <div
                    className={classNames(`${prefixCls}-select-option`, {
                      [`${prefixCls}-select-option-active`]:
                        item.id === activeNode?.id,
                    })}
                    key={item.id}
                  >
                    <div className={`${prefixCls}-select-option-left`}>
                      <Checkbox
                        onChange={e => checkboxItemChange(e, item)}
                        checked={!!item?.checked}
                      />
                    </div>
                    <div className={`${prefixCls}-select-option-avatar`}>
                      <FontAwesomeIcon
                        icon={
                          item.type === "Department" ? "folder-closed" : "user"
                        }
                        style={{ color: "#5488fa" }}
                      />
                    </div>
                    <div className={`${prefixCls}-select-option-middle`}>
                      <div
                        className={`${prefixCls}-select-option-primary-info`}
                      >
                        <div className={`${prefixCls}-select-option-name`}>
                          {item.name}
                        </div>
                        {item.isCommander && (
                          <Tag color="magenta">
                            {t("common.commander", { ns: "flowPath" })}
                          </Tag>
                        )}
                      </div>
                    </div>
                    {item?.children?.length ? (
                      <div
                        className={`${prefixCls}-select-option-right`}
                        style={{ color: "#5488fa" }}
                        onClick={() =>
                          setState({
                            activeNode: item,
                            loading: true,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={"sitemap"} />
                        <span>
                          {t("form.AcademyAndUserCommon.subordinate", {
                            ns: "editorWidget",
                          })}
                        </span>
                      </div>
                    ) : undefined}
                  </div>
                );
              })
            )}
          </ScrollContainer>
        </div>
      </div>
    );
  }
);

export default OrgStructureTree;
