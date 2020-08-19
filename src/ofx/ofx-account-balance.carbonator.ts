import { OfxBalance } from './ofx-body';
import { AccountBalanceModel } from '../accountBalance.model';
import { OfxDateUtil } from './ofx-date.util';

export class OfxAccountBalanceAdapter {
  public static convertToAccountBalance(
    balance: OfxBalance
  ): AccountBalanceModel | undefined {
    if (!balance) {
      return
    }

    return {
      balanceAmount: parseFloat(balance.BALAMT),
      tsBalanceAsOf: OfxDateUtil.parseOfxDate(balance.DTASOF)
    };
  }
}
