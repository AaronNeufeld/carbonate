import { OfxCreditCardAccount, OfxCreditCardAccountFrom } from './ofx-body';
import { AccountModel } from '../account.model';

export class OfxCreditCardAccountAdapter {
  public static convertToAccount(
    accountInfo?: OfxCreditCardAccount,
    accountFrom?: OfxCreditCardAccountFrom
  ): AccountModel {

    if (accountInfo) {
      return {
        bankId: accountInfo.CCACCTINFO.CCACCTFROM.BANKID,
        branchId: accountInfo.CCACCTINFO.CCACCTFROM.BRANCHID,
        accountId: accountInfo.CCACCTINFO.CCACCTFROM.ACCTID,
        serviceStatus: accountInfo.CCACCTINFO.SVCSTATUS,
        ofxAccountType: 'CREDITCARD'
      }
    } else {
      return {
        accountId: accountFrom.ACCTID,
        bankId: accountFrom.BANKID,
        branchId: accountFrom.BRANCHID,
        ofxAccountType: 'CREDITCARD'
      }
    }
  }
}
