export interface ResultItem {
  processId: string;
  processName: string;
  processKey: string;
  icon?: any;
  groupId: string;
  // 0-未发布1-已发布2-已停用
  processStatus: 0 | 1 | 2;
  processType: number;
  processVersion?: any;
  draftFlag?: any;
  createTime: string;
  actionRef: MutableRefObject<ActionType>;
}

export interface Result {
  records: ResultItem[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  maxLimit?: any;
  countId?: any;
  keyword?: any;
  processStatus?: any;
  groupId?: any;
  pages: number;
}
