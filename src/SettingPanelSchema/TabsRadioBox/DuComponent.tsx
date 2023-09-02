/**
 * @author 梁强
 * @filename DepartMentAndUser.tsx
 * @date 2023-05-12 星期五
 * @description 组件
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrgStructureTree, {
  DepartMentAndUserTreeItem,
  DepartMentAndUserTreeItemType,
  OrgStructureTreeRef,
} from "./OrgStructureTree";
import "./index.less";
import { useSetState } from "ahooks";
import React, { useImperativeHandle, useRef } from "react";
import { AcademyComponentViewProps } from "./DepartmentModal";
import { UserComponentViewProps } from "./UserModal";

interface IDuProps {
  prefixCls?: string;
  mode?: DepartMentAndUserTreeItemType;
  nodeProps?: AcademyComponentViewProps | UserComponentViewProps;
  multiple?: boolean;
}

const DepartMentAndUser = React.forwardRef(
  (
    props: IDuProps,
    ref: React.Ref<{ selectNodes: DepartMentAndUserTreeItem[] }>
  ) => {
    const {
      prefixCls = "du-picker",
      mode = "Department",
      multiple = false,
    } = props;
    const { t } = useTranslation();
    const orgStructureTreeRef: OrgStructureTreeRef = useRef();
    const [{ selectNodes }, setState] = useSetState({
      selectNodes: [],
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          selectNodes,
        };
      },
      [selectNodes]
    );

    return (
      <div className={prefixCls}>
        <OrgStructureTree
          mode={mode}
          hasMultiple={multiple}
          ref={orgStructureTreeRef}
          onChange={(val, removeNode) => {
            console.log("removeNode:", removeNode);
            setState({
              selectNodes: val,
            });
          }}
        />
        <div className={`${prefixCls}-right`}>
          <div className={`${prefixCls}-right-hint`}>
            <span className={`${prefixCls}-right-hint-selected`}>
              {t("form.AcademyAndUserCommon.selected", { ns: "editorWidget" })}
              ：
            </span>
            <span
              className={`${prefixCls}-right-hint-clear`}
              onClick={() => {
                if (!selectNodes.length) {
                  return;
                }
                orgStructureTreeRef.current?.removeNodes(selectNodes);
                setState({
                  selectNodes: [],
                });
              }}
            >
              {t("form.AcademyAndUserCommon.clear", { ns: "editorWidget" })}
            </span>
          </div>
          <div className={`${prefixCls}-right-selected-list`}>
            {selectNodes.map((item, idx) => {
              return (
                <div className={`${prefixCls}-select-option`} key={item.id}>
                  <div className={`${prefixCls}-select-option-right-avatar`}>
                    <FontAwesomeIcon
                      icon={idx % 2 === 0 ? "folder-closed" : "user"}
                      style={{ color: "#5488fa" }}
                    />
                  </div>
                  <div className={`${prefixCls}-select-option-middle`}>
                    <div className={`${prefixCls}-select-option-primary-info`}>
                      <div className={`${prefixCls}-select-option-name`}>
                        {item.name}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${prefixCls}-select-option-right`}
                    onClick={() => {
                      orgStructureTreeRef.current?.removeNodes([item]);
                      setState({
                        selectNodes: selectNodes.filter(
                          selectNodesItem => selectNodesItem.id !== item.id
                        ),
                      });
                    }}
                  >
                    <FontAwesomeIcon
                      icon={"delete-left"}
                      style={{ color: "gray" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default DepartMentAndUser;
