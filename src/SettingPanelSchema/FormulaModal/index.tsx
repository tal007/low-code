/*
 * @Date: 2023-05-04 17:12:33
 * @LastEditTime: 2023-05-10 13:48:52
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 自动计算公式设置弹框
 */
import { useState, useMemo } from "react";
import { Button, Modal, Space, Alert, Tooltip } from "antd";
import {
  FormulaButtonProps,
  ButtonComponentsProps,
  SchemaProps,
} from "./index.d";
import { SchemaItem } from "../SchemaItem";
import { useEditorAction } from "@/EditorWidgets/hooks";
import { setValue } from "../helper";
import styled from "styled-components";
import {
  LeftSquareOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const numberRegMatch = (express: string): boolean => {
  const reg =
    /[/+/\-/*//]{2,}|\(\)|\([/+/-/*//]|[/+/-/*//]\)|[^/+/-/*//]\(|\)[^/+/-/*//]/;
  const leftBracketMatch = express.match(/\(/g);
  const rightBracketMath = express.match(/\)/g);
  // 排除运算符连续或空括号对或者(后面是运算符，）前面是运算符，（前面不是运算符，）后面不是运算符或者括号不配的情况
  if (
    reg.test(express) ||
    (leftBracketMatch &&
      rightBracketMath &&
      leftBracketMatch.length !== rightBracketMath.length)
  ) {
    return false;
  }
  return true;
};

const ShowSettingContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 10px;
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  text-align: right;

  .setting-content {
    width: 100%;
    height: 40px;
    text-align: left;
  }
  .delete-icon {
    font-size: 20px;
    vertical-align: middle;
  }
  .clear {
    color: #ff00009b;
    vertical-align: middle;
    font-size: 16px;
    margin-left: 10px;
  }
`;
const NumberKeyboardContainer = styled.div<{
  width: string;
  justifyContent: string;
}>`
  margin-top: 1em;
  width: ${props => props.width || "215px"};
  display: flex;
  justify-content: ${props => props.justifyContent || "space-between"};
  align-items: flex-start;
  .tip-icon {
    margin-top: 5px;
    margin-right: 5px;
  }
  label {
    margin-right: 8px;
    white-space: nowrap;
  }
`;
// 按钮组组件
const ButtonComponents = (props: ButtonComponentsProps) => {
  const { data, onClick, wrap, label, children, width, justifyContent } = props;
  return (
    <NumberKeyboardContainer width={width} justifyContent={justifyContent}>
      {children}
      <label>{label}：</label>
      <Space wrap={wrap}>
        {data.map((item, index) => {
          return (
            <Button onClick={() => onClick(item, index)} key={item}>
              {item}
            </Button>
          );
        })}
      </Space>
    </NumberKeyboardContainer>
  );
};

export const FormulaButton = (props: FormulaButtonProps) => {
  const { setProp, propName, defaultValue } = props;
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const calculateSymbol: string[] = ["+", "-", "*", "/", "(", ")"];
  const numberKeyboards: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
  ];

  const [showExpression, setShowExpression] = useState<string>(defaultValue[1]);
  const [calculateExpression, setCalculateExpression] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { query } = useEditorAction();
  const [nodes] = useState<{ [key: string]: any }>(query.getNodes());
  const componentInfo: string[][] = useMemo(() => {
    const calculateComponent = ["InputNumber", "MoneyInput"]; // 支持自动计算的组件
    const calculateComName: string[] = [];
    const calculationIds: string[] = [];
    for (const key in nodes) {
      const node = nodes[key];
      const nodeData = node.data;
      if (key !== "ROOT" && calculateComponent.includes(nodeData.displayName)) {
        calculateComName.push(nodeData.props.name);
        calculationIds.push(node.id);
      }
    }
    return [calculateComName, calculationIds];
  }, [nodes]);

  const calculateComName: string[] = componentInfo[0];

  // 选中计算符号
  const clickButton = (sym: string, index: number) => {
    console.log(sym);
    const _value =
      numberKeyboards.includes(sym) && sym !== "." ? parseInt(sym) : sym;
    const calculateValue = calculateComName.includes(sym)
      ? "formValue['" + componentInfo[1][index] + "']"
      : _value;
    setShowExpression(showExpression + _value);
    setCalculateExpression(calculateExpression + calculateValue);
  };
  const showPopup = () => {
    setVisible(true);
  };
  const handleConfirm = () => {
    if (!numberRegMatch(calculateExpression)) {
      setShowAlert(true);
      return false;
    }
    setProp(props => setValue(props, propName, calculateExpression, 1), 500);
    handleCancel();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const backExpression = () => {
    const endIndex = showExpression.length - 1;
    setShowExpression(showExpression.slice(0, endIndex));
  };
  const clearExpression = () => {
    setShowExpression("");
  };
  return (
    <>
      <Button block={true} onClick={showPopup}>
        计算公式={showExpression}
      </Button>
      <Modal
        title={t("form.CalculationFormula.formula", { ns: "editorWidget" })}
        open={visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
      >
        {showAlert ? (
          <Alert
            message="编辑的公式不符合计算法则，无法计算"
            type="error"
            showIcon
          />
        ) : (
          ""
        )}
        <ShowSettingContainer>
          <div className="setting-content">计算公式={showExpression}</div>
          <LeftSquareOutlined
            className="delete-icon"
            onClick={backExpression}
          />
          <span className="clear" onClick={clearExpression}>
            清空
          </span>
        </ShowSettingContainer>
        <p>
          编辑计算公式可用来完成审批单内数据的自动结算，例如：采购单内设置计算公式“合计=单价×数量”，发起人填写单价、数量后，组件将自动计算出合计金额，免手动计算.
        </p>
        <ButtonComponents
          data={calculateComName}
          onClick={clickButton}
          wrap={true}
          label="计算对象"
          width="100%"
          justifyContent="flex-start"
        >
          <Tooltip
            title="可计算对象应为数值组件,如数字、金额"
            placement="topLeft"
          >
            <ExclamationCircleOutlined className="tip-icon" />
          </Tooltip>
        </ButtonComponents>
        <ButtonComponents
          data={calculateSymbol}
          onClick={clickButton}
          wrap={false}
          label="计算符号"
        />
        <ButtonComponents
          data={numberKeyboards}
          onClick={clickButton}
          wrap={true}
          label="数字键盘"
        />
      </Modal>
    </>
  );
};

export const FormulaButtonSchema = (props: SchemaProps) => {
  const { parentProps, childProps } = props;

  return (
    <SchemaItem height="42px" {...parentProps}>
      <FormulaButton {...childProps} />
    </SchemaItem>
  );
};
