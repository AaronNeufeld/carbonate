import { AccountBalanceModel } from './accountBalance.model';
import { LoanAccountType, OfxAccountType, ServiceStatus } from './ofx';

export interface AccountModel {
  bankId?: string;
  branchId?: string;
  brokerId?: string;
  accountId?: string;
  ofxAccountType?: OfxAccountType;
  loanAccountType?: LoanAccountType;
  dateLastUpdated?: string;
  dateOfServerResponse?: string;
  serviceStatus?: ServiceStatus;
  ledgerBalance?: AccountBalanceModel;
  availableBalance?: AccountBalanceModel;
}
