import { PositionModel } from './position.model';
import { TransactionSetModel } from './transactionSet.model';

export interface StatementModel {
  transactionSets: TransactionSetModel[];
  positions?: PositionModel[];
}
