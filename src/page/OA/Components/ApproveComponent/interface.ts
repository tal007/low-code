export interface IApproveNodeOptions {
  label: string;
  value: string;
}

export interface IDetails<T, U> {
  optionValue: T;
  optionRule: T;
  dimensionKey: T;
  relationType: T;
  fixedRelationKey: T;
  popupKey: T;
  relationOptions: U[];
  chooseRangeOptions: U[];
}

export interface IApproveData<T> {
  code: string;
  msg: string;
  data: T;
}

export interface IApproveNode {
  options: IApproveNodeOptions[];
  details: IDetails<string, IApproveNodeOptions>[];
}

export interface IApproveNodeState extends IApproveNode {
  activeNode: IDetails<string, IApproveNodeOptions> | undefined;
  stateSelectMethod: number;
}
