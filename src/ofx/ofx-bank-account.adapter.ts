import { AccountModel } from '../account.model';
import { OfxBankAccount, OfxBankAccountFrom } from './ofx-body';

export class OfxBankAccountAdapter {
  public static convertToAccount(
    accountInfo: OfxBankAccount,
    accountFrom?: OfxBankAccountFrom
  ): AccountModel {
    if (accountFrom) {
      return {
        bankId: accountFrom.BANKID,
        accountId: accountFrom.ACCTID,
        ofxAccountType: accountFrom.ACCTTYPE,
      }
    } else {
      return {
        accountId: accountInfo.BANKACCTINFO.BANKACCTFROM.ACCTID,
        ofxAccountType: accountInfo.BANKACCTINFO.BANKACCTFROM.ACCTTYPE,
        bankId: accountInfo.BANKACCTINFO.BANKACCTFROM.BANKID,
        serviceStatus: accountInfo.BANKACCTINFO.SVCSTATUS
      }
    }
  }
}
