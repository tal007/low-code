/*
 * @Date: 2022-10-09 16:19:32
 * @LastEditTime: 2023-05-04 10:25:10
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { useState } from "react";
import {
  ProFormText,
  ProFormColorPicker,
  ProFormCheckbox,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
  ProFormSlider,
  ProFormMoney,
  ProFormUploadDragger,
  ProFormUploadButton,
  ProFormRate,
  ProFormCaptcha,
} from "@ant-design/pro-components";
import { Checkbox, Slider } from "antd";
import Form from "./Form";

export const App = () => {
  const [color, setColor] = useState("#FFFFFF");

  return (
    <>
      <ProFormCaptcha
        onGetCaptcha={async mobile => {
          console.log(mobile);
        }}
      />
      <ProFormDatePicker fieldProps={{ showTime: true }} />
      <ProFormDateTimePicker fieldProps={{ showTime: false }} />
      <ProFormDateRangePicker />
      <ProFormDateTimeRangePicker />
      <ProFormTimePicker.RangePicker />
      <ProFormSlider fieldProps={{ step: 0.01 }} />
      <Slider step={10} defaultValue={37} />
      <ProFormMoney locale="en-GB" />
      <ProFormUploadDragger />
      <ProFormUploadButton />
      <ProFormRate />
      <ProFormText
        fieldProps={{
          onChange: value => {
            setColor(value.target.value);
          },
          defaultValue: color,
          value: color,
          readOnly: true,
          required: true,
          // hidden: true
        }}
        rules={[{ required: true, type: "email" }]}
        formItemProps={{
          required: true,
          label: "Email",
        }}
        hasFeedback
        allowClear
        tooltip="默认初始密码为：123456"
        initialValue={color}
        bordered
      />
      <ProFormColorPicker
        fieldProps={{
          onChange: value => {
            console.log(value);
            setColor(value);
          },
          onChangeComplete: value => {
            console.log(value);
          },
          value: color,
        }}
        initialValue={color}
        formItemProps={{}}
        style={{ width: 40, height: 40 }}
      />
      <ProFormCheckbox
        label="321"
        fieldProps={{
          onChange: value => {
            console.log(value);
          },
        }}
      />
      <Checkbox
        onChange={v => {
          console.log(v);
        }}
      >
        Checkbox
      </Checkbox>
      ;
      <ProFormCheckbox.Group
        fieldProps={{
          onChange(checkedValue) {
            console.log(checkedValue);
          },
          options: ["123", "321"],
        }}
      ></ProFormCheckbox.Group>
      <ProFormRadio.Group
        label="发票类型"
        name="invoiceType"
        initialValue="发票"
        options={["发票", "普票", "无票"]}
      />
      <Form />
    </>
  );
};

export default App;
