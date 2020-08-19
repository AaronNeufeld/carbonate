import { OfxInvestmentAccount, OfxInvestmentAccountFrom } from './ofx-body';
import { AccountModel } from '../account.model';

export class OfxInvestmentAccountAdapter {
  public static convertToAccount(
    accountInfo: OfxInvestmentAccount,
    accountFrom?: OfxInvestmentAccountFrom
  ): AccountModel {
    if (accountInfo) {
      return {
        accountId: accountInfo.INVACCTINFO.INVACCTFROM.ACCTID,
        ofxAccountType: 'INVESTMENT',
        serviceStatus: accountInfo.INVACCTINFO.SVCSTATUS,
        brokerId: accountInfo.INVACCTINFO.INVACCTFROM.BROKERID
      }
    } else {
      return {
        accountId: accountFrom.ACCTID,
        brokerId: accountFrom.BROKERID
      }
    }
  }
}
