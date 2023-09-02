/*
 * @Date: 2022-09-27 10:31:03
 * @LastEditTime: 2023-05-16 17:27:18
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 入口文件
 */

import { InputText, InputTextRenderView } from "./InputText";
import { TextArea, TextAreaRenderView } from "./TextArea";
import { Checkbox, CheckboxRenderView } from "./Checkbox";
// import { SingleCheckbox, SingleCheckboxRenderView } from "./SingleCheckbox";
import { Radio, RadioRenderView } from "./Radio";
import { Select, SelectRenderView } from "./Select";
import { InputTree, InputTreeRenderView } from "./InputTree";
import { InputNumber, InputNumberRenderView } from "./InputNumber";
import { DatePicker, DatePickerRenderView } from "./DatePicker";
import { DateRangePicker, DateRangePickerRenderView } from "./DateRangePicker";
import { TimePicker, TimePickerRenderView } from "./TimePicker";
import { TimeRangePicker, TimeRangePickerRenderView } from "./TimeRangePicker/";
import { Slider, SliderRenderView } from "./Slider";
import { Switch, SwitchRenderView } from "./Switch";
import { Captcha, CaptchaRenderView } from "./Captcha";

export const FormWidgets = {
  InputText,
  TextArea,
  Captcha,
  Checkbox,
  Radio,
  Select,
  InputNumber,
  // SingleCheckbox,
  InputTree,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  Slider,
  Switch,
};

export const FormRenders = {
  InputTextRenderView,
  TextAreaRenderView,
  CaptchaRenderView,
  CheckboxRenderView,
  RadioRenderView,
  SelectRenderView,
  InputNumberRenderView,
  // SingleCheckboxRenderView,
  InputTreeRenderView,
  DatePickerRenderView,
  DateRangePickerRenderView,
  TimePickerRenderView,
  TimeRangePickerRenderView,
  SliderRenderView,
  SwitchRenderView,
};
