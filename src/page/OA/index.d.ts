export interface ProcessResult {
  id: string;
  processId: string;
  processData: string;
  processConfig?: any;
  extraConfig?: any;
  processKey: string;
}

export interface FormSettingResult {
  id: string;
  key?: any;
  name: string;
  processId: string;
  processVersion?: any;
  structureJson: string;
}

export interface Solution {
  processId: string;
  processName: string;
  processKey: string;
  icon?: any;
  groupId: string;
  processType: number;
  processRemark?: any;
}

export interface FlowSolution {
  processId?: string;
  processName: string;
  processKey?: string;
  icon?: string;
  groupId: string;
  processType: integer;
  processRemark?: string;
}

export interface ProcessBinary {
  id?: string;
  processId: string;
  processData: string;
  processConfig?: string;
  extraConfig?: string;
  processKey?: string;
}

export interface FormSetting {
  id?: string;
  processId: string;
  structureJson: string;
}
