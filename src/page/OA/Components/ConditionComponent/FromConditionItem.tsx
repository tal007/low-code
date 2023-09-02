/*
 * @Author: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @Date: 2023-05-19 17:20:19
 * @LastEditors: 王锴 11477467+wkkroom@user.noreply.gitee.com
 * @LastEditTime: 2023-06-06 10:21:03
 * @FilePath: \mylcp_web\src\page\OA\Components\ConditionComponent\FromConditionItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Form, Select, InputNumber, Space } from "antd";
import { condition } from "./const";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { currentConditionActions } from "@/store/conditionFrom.slice";
import { currentEditorConfig } from "@/store/editor.slice";
type Option = {
  value: string;
  label: string;
};

const FromConditionItem = props => {
  // console.log("FromConditionItem", props);
  const [inputType, setInputType] = useState(props.dataOrigin);
  const [inputType2, setInputType2] = useState(props.computeModel[0]);
  const [presetsData, setPresetsData] = useState(
    props.computeModel[0].presetsData
  );

  //获取表单 时长 金额 数字组件 枚举
  const currentState = useSelector(currentEditorConfig);
  const [nodes] = useState<string>(currentState.nodes);
  const components = [];
  if (!Object.keys(nodes).length) {
    components.push({
      value: "",
      label: "",
    });
  } else {
    const formComponents = Object.values(
      JSON.parse(nodes, (key, value) => {
        if (key === "ROOT") return undefined;
        return value;
      })
    );
    formComponents.map((item: any) => {
      components.push({
        value: item.props.id,
        label: item.props.name,
      });
    });
  }
  useEffect(() => {
    setInputType({
      ...inputType,
      dataId: components[0].value,
      dataName: components[0].label,
    });
  }, []);

  const dispatch = useDispatch();
  const deleteConditionForm = () => {
    props.delete();
  };

  const operationTypeChange = value => {
    if (value == "numberBetween") {
      const obj = { ...presetsData };
      obj.moreNumber = 3;
      obj.moreCode = "numberLessThan";
      obj.lessNumber = 7;
      obj.lessCode = "numberLessThan";
      setPresetsData(obj);
    } else {
      setPresetsData({ numberData: presetsData.numberData });
    }
    setInputType2({
      ...inputType2,
      presetsData: presetsData,
      operationType: value,
    });
  };

  useEffect(() => {
    // 在count更新后执行一些操作
    dispatch(
      currentConditionActions.updateFormCondition({
        groupId: props.groupId,
        modelId: props.modelId,
        dataOrigin: { dataId: inputType.dataId, dataName: inputType.dataName },
      })
    );
    dispatch(
      currentConditionActions.updateFormOperationType({
        groupId: props.groupId,
        modelId: props.modelId,
        operationType: inputType2.operationType,
      })
    );
    dispatch(
      currentConditionActions.updatePresetsData({
        groupId: props.groupId,
        modelId: props.modelId,
        presetsData: presetsData,
      })
    );
  }, [
    inputType,
    presetsData,
    inputType2,
    dispatch,
    props.groupId,
    props.modelId,
  ]);
  return (
    <>
      {props.order == 1 && <p style={{ color: "gray" }}>当</p>}
      {props.order != 1 && (
        <p style={{ color: "gray", display: "flex" }}>
          <span style={{ display: "block", flex: "1" }}>且</span>
          <DeleteOutlined
            onClick={() => {
              deleteConditionForm();
            }}
          />
        </p>
      )}
      <Form.Item>
        <Select
          defaultValue={components[0].value}
          options={components}
          style={{ marginBottom: "5px" }}
          onChange={(value, option: Option) => {
            setInputType({
              ...inputType,
              dataId: value,
              dataName: option.label,
            });
          }}
        />
        <Select
          defaultValue={props.computeModel[0].operationType}
          options={condition.options2}
          style={{ marginBottom: "5px" }}
          onChange={value => {
            operationTypeChange(value);
          }}
        />
        {inputType.dataName != "数字框" &&
          inputType2.operationType != "numberBetween" && (
            <Space style={{ width: "100%" }}>
              <InputNumber
                style={{
                  width: inputType.dataName == "数字框" ? "423px" : "400px",
                }}
                defaultValue={presetsData.numberData}
                onChange={value => {
                  setPresetsData({ ...presetsData, numberData: value });
                }}
              />
              {inputType.dataName == "时间" && <span>天</span>}
              {inputType.dataName == "金额(元)" && <span>元</span>}
            </Space>
          )}
        {inputType.dataName == "数字框" &&
          inputType2.operationType != "numberBetween" && (
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={presetsData.numberData}
              onChange={value => {
                setPresetsData({ ...presetsData, numberData: value });
              }}
            />
          )}
        {inputType2.operationType == "numberBetween" && (
          <Space>
            <InputNumber
              defaultValue={presetsData.moreNumber}
              onChange={value => {
                setPresetsData({ ...presetsData, moreNumber: value });
              }}
            />
            <Select
              defaultValue={presetsData.moreCode}
              options={condition.options4}
              style={{ marginBottom: "5px", width: "100px" }}
              onChange={value => {
                setPresetsData({ ...presetsData, moreCode: value });
              }}
            />
            {inputType.dataName == "时间" && <span>天</span>}
            {inputType.dataName == "金额(元)" && <span>元</span>}
            <Select
              defaultValue={presetsData.lessCode}
              options={condition.options4}
              style={{ marginBottom: "5px", width: "100px" }}
              onChange={value => {
                setPresetsData({ ...presetsData, lessCode: value });
              }}
            />
            <InputNumber
              defaultValue={presetsData.lessNumber}
              onChange={value => {
                setPresetsData({ ...presetsData, lessNumber: value });
              }}
            />
          </Space>
        )}
      </Form.Item>
    </>
  );
};

export default FromConditionItem;
