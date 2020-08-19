import { OfxDateModel } from "./ofxDate.model";

export interface AccountBalanceModel {
  balanceAmount: number;
  tsBalanceAsOf?: OfxDateModel;
}
