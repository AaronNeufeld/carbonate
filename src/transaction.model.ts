import { OfxDateModel } from "./ofxDate.model";

export interface TransactionModel {
  fitId?: string;
  datePosted?: OfxDateModel;
  dateAvailable?: OfxDateModel;
  amount?: number;
  transactionType?: string;
  name?: string;
  payee?: PayeeModel;
  extendedName?: string;
  checkNumber?: string;
  refNumber?: string;
  memo?: string;
  correctFitId?: string;
  correctAction?: string;
  // Investment
  quantity?: number;
  price?: number;
  action?: string;
  commission?: number;
  secId?: string;
  serverTransactionId?: string;
  imageData?: any;
  dateTrade?: OfxDateModel;
  dateSettle?: OfxDateModel;
}

export interface PayeeModel {
  name: string;
}
