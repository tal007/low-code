/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Date: 2022-11-03 09:45:59
 * @LastEditTime: 2023-01-10 10:33:41
 * @LastEditors: 刘玉田
 * @Description: 菜单
 */

import { actionTypeMap } from "@/SettingPanelSchema/EventHandler/actionTypeMap";
import type { Tab } from "rc-tabs/lib/interface";
import { Jump } from "./Children/Jump";
import { OpenPage } from "./Children/OpenPage";
import { Refresh } from "./Children/Refresh";
import { Back } from "./Children/Back";
import { OpenModal } from "./Children/OpenModal";
import { CloseModal } from "./Children/CloseModal";
import { Message } from "./Children/Message";
import { Ajax } from "./Children/Ajax";
import { Download } from "./Children/Download";
import { Show } from "./Children/Show";
import { Enabled } from "./Children/Enabled";
import { Reload } from "./Children/Reload";
import { SetValue } from "./Children/SetValue";
import { Submit } from "./Children/Submit";
import { Reset } from "./Children/Reset";
import { Validate } from "./Children/Validate";
import { Action } from "./Children/Action";
import { Copy } from "./Children/Copy";
import { Custom } from "./Children/Custom";

const keys = actionTypeMap.keys();
const values = actionTypeMap.values();

export const tabItems: Tab[] = [
  { label: "event.jump", key: "jump", children: <Jump /> },
  { label: "event.openPage", key: "openPage", children: <OpenPage /> },
  { label: "event.refresh", key: "refresh", children: <Refresh /> },
  { label: "event.back", key: "back", children: <Back /> },
  { label: "event.openModal", key: "openModal", children: <OpenModal /> },
  { label: "event.closeModal", key: "closeModal", children: <Jump /> },
  { label: "event.message", key: "message", children: <Message /> },
  { label: "event.ajax", key: "ajax", children: <Ajax /> },
  { label: "event.download", key: "download", children: <Download /> },
  { label: "event.show", key: "show", children: <Show /> },
  { label: "event.enabled", key: "enabled", children: <Jump /> },
  { label: "event.reload", key: "reload", children: <Jump /> },
  { label: "event.setValue", key: "setValue", children: <Jump /> },
  { label: "event.formSubmit", key: "submit", children: <Submit /> },
  { label: "event.formReset", key: "reset", children: <Reset /> },
  { label: "event.formValidate", key: "validate", children: <Validate /> },
  { label: "event.action", key: "action", children: <Jump /> },
  { label: "event.copy", key: "copy", children: <Copy /> },
  { label: "event.custom", key: "custom", children: <Jump /> },
];
