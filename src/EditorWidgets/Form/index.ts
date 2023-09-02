/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-09-27 10:31:03
 * @LastEditTime: 2023-05-23 16:14:34
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 入口文件
 */

import {
  InputText,
  InputTextRenderView,
  InputTextComponent,
} from "./InputText";
import { TextArea, TextAreaRenderView, TextAreaComponent } from "./TextArea";
import { Checkbox, CheckboxRenderView, CheckboxComponent } from "./Checkbox";
// import { SingleCheckbox, SingleCheckboxRenderView } from "./SingleCheckbox";
import { Radio, RadioRenderView, RadioComponent } from "./Radio";
import { Select, SelectRenderView, SelectComponent } from "./Select";
import { InputTree, InputTreeRenderView } from "./InputTree";
import {
  CascaderSelect,
  CascaderSelectRenderView,
  CascaderComponent,
} from "./CascaderSelect";
import {
  InputNumber,
  InputNumberRenderView,
  InputNumberComponent,
} from "./InputNumber";
import {
  DatePicker,
  DatePickerRenderView,
  DatePickerComponent,
} from "./DatePicker";
import {
  DateRangePicker,
  DateRangePickerRenderView,
  DateRangePickerComponent,
} from "./DateRangePicker";
import { TimePicker, TimePickerRenderView } from "./TimePicker";
import { TimeRangePicker, TimeRangePickerRenderView } from "./TimeRangePicker/";
import { Slider, SliderRenderView } from "./Slider";
import { Switch, SwitchRenderView } from "./Switch";
import { Captcha, CaptchaRenderView, CaptchaComponent } from "./Captcha";
import {
  PhoneNumber,
  PhoneNumberRenderView,
  PhoneNumberComponent,
} from "./PhoneNumber";
import { Rate, RateRenderView, RateComponent } from "./Rate";
import {
  MoneyInput,
  MoneyInputRenderView,
  MoneyInputComponent,
} from "./MoneyInput";
import { IDNumber, IDNumberRenderView, IDNumberComponent } from "./IDNumber";
import {
  ProvinceCity,
  ProvinceCityRenderView,
  ProvinceCityComponent,
} from "./ProvinceCity";
import {
  UploadFile,
  UploadFileRenderView,
  UploadFileComponent,
} from "./UploadFile";
import {
  HandWriteSign,
  HandWriteSignRenderView,
  HandWriteSignComponent,
} from "./HandWriteSign";
import {
  DetailedTableContainer,
  DetailedTableContainerRenderView,
} from "./DetailedTableContainer";
import {
  WordIdentify,
  WordIdentifyRenderView,
  WordIdentifyComponent,
} from "./WordIdentify";
import {
  CalculationFormula,
  CalculationFormulaRenderView,
  CalculationFormulaComponent,
} from "./CalculationFormula";
import { Academy, AcademyComponent, AcademyRenderView } from "./Academy";

import { User, UserComponent, UserRenderView } from "./User";
import { Time, TimeRenderView, TimeComponent } from "./Time";

export const FormWidgets = {
  InputText,
  TextArea,
  InputNumber,
  // Captcha,
  Radio,
  Checkbox,
  // Select,
  // SingleCheckbox,
  // InputTree,
  DatePicker,
  // DateRangePicker,
  // PhoneNumber,
  CascaderSelect,
  // TimePicker,
  // TimeRangePicker,
  // Slider,
  // Switch,
  // Rate,
  MoneyInput,
  // IDNumber,
  // ProvinceCity,
  UploadFile,
  // HandWriteSign,
  // DetailedTableContainer,
  // WordIdentify,
  // CalculationFormula,
  Academy,
  User,
  Time,
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
  CascaderSelectRenderView,
  DatePickerRenderView,
  // DateRangePickerRenderView,
  TimePickerRenderView,
  TimeRangePickerRenderView,
  SliderRenderView,
  SwitchRenderView,
  PhoneNumberRenderView,
  RateRenderView,
  MoneyInputRenderView,
  IDNumberRenderView,
  ProvinceCityRenderView,
  UploadFileRenderView,
  HandWriteSignRenderView,
  DetailedTableContainerRenderView,
  WordIdentifyRenderView,
  CalculationFormulaRenderView,
  AcademyRenderView,
  UserRenderView,
  TimeRenderView,
};

export const FormComponents = {
  InputTextComponent,
  TextAreaComponent,
  InputNumberComponent,
  RadioComponent,
  CheckboxComponent,
  DatePickerComponent,
  // DateRangePickerComponent,
  PhoneNumberComponent,
  CascaderComponent,
  RateComponent,
  MoneyInputComponent,
  IDNumberComponent,
  ProvinceCityComponent,
  UploadFileComponent,
  HandWriteSignComponent,
  WordIdentifyComponent,
  CalculationFormulaComponent,
  CaptchaComponent,
  SelectComponent,
  TimeComponent,
  UserComponent,
  AcademyComponent,
};
