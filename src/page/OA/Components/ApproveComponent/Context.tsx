import { request } from "@/hooks/useAjax";
import React from "react";

export const ApproveContext = React.createContext<IApproveContext>(null);

interface IApproveContext {
  dyRenderComponentApi: () => Promise<unknown>;
  saveApproveApi: (data: any) => Promise<unknown>;
}

class ApproveContextPrivider extends React.Component<
  React.PropsWithChildren,
  IApproveContext
> {
  constructor(props) {
    super(props);
    this.state = {
      dyRenderComponentApi: this.dyRenderComponentApi,
      saveApproveApi: this.saveApproveApi,
    };
  }

  /**
   * @author 梁强
   * @date 2023-05-25 星期四
   * @function 获取配置文件
   * @param {}
   * @return {}
   */
  public dyRenderComponentApi = () =>
    request.get("/bpms/identity/approver/component");

  /**
   * @author 梁强
   * @date 2023-05-26 星期五
   * @function 保存审批人接口
   * @param {}
   * @return {}
   */
  public saveApproveApi = data =>
    request.post("/identity/approver/node/settings", data);

  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <ApproveContext.Provider value={this.state}>
        {children}
      </ApproveContext.Provider>
    );
  }
}

export default ApproveContextPrivider;
