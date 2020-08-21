import { PositionModel } from './position.model';
import { TransactionSetModel } from './transactionSet.model';
import { SignOnResponseModel } from './signOnResponse.model';

export interface StatementModel {
  signOnResponse: SignOnResponseModel;
  transactionSets: TransactionSetModel[];
  positions?: PositionModel[];
}
