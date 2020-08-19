import { TransactionModel } from './transaction.model';
import { AccountFromModel } from './accountFrom.model';
import { AccountBalanceModel } from './accountBalance.model';
import { OfxDateModel } from './ofxDate.model';

export interface TransactionSetModel {
  requestTransactionId: string;
  dateStart: OfxDateModel,
  dateEnd: OfxDateModel,
  account: AccountFromModel;
  currencyCode?: string;
  transactions: TransactionModel[];
  ledgerBalance?: AccountBalanceModel;
  availableBalance?: AccountBalanceModel;
}
