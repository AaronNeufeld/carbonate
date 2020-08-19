import { AccountBalanceModel } from './accountBalance.model';
import { OfxAccountType, LoanAccountType, ServiceStatus } from './ofx';

export interface AccountFromModel {
  bankId?: string;
  branchId?: string;
  accountId?: string;
  ofxAccountType?: OfxAccountType;
}
