import { OfxBody } from './ofx-body';
import { OfxAccountBalanceAdapter } from './ofx-account-balance.carbonator';
import { OfxStatementTransactionAdapter } from './ofx-statement-transaction.adapter';
import { OfxInvestmentTransactionAdapter } from './ofx-investment-transaction.adapter';
import { StatementModel } from '../statement.model';
import { OfxInvestmentBalanceAdapter } from './ofx-investment-balance.adapter';
import { OfxInvestmentPositionAdapter } from './ofx-investment-position.adapter';
import * as Xml2JsParser from 'xml2js';
import { AccountModel } from '../account.model';
import { OfxAccountInfoAdapter } from './ofx-account-info.adapter';
import { OfxBankAccountAdapter } from './ofx-bank-account.adapter';
import { OfxCreditCardAccountAdapter } from './ofx-credit-card-account.adapter';
import { OfxInvestmentAccountAdapter } from './ofx-investment-account.adapter';
import { OfxDateUtil } from './ofx-date.util';

export class OfxCarbonator {

  async carbonateAccounts(xml: string): Promise<AccountModel[]> {
    const body = await this.convertFromXML(xml);
    console.log('body', body);
    return OfxAccountInfoAdapter.convertToAccountList(
      body.OFX.SIGNUPMSGSRSV1.ACCTINFOTRNRS.ACCTINFORS.ACCTINFO
    );
  }

  async carbonateStatement(xml: string): Promise<StatementModel> {
    const body = await this.convertFromXML(xml);

    if (body.OFX.BANKMSGSRSV1) {
      return this.carbonateBankStatement(body)
    } else if (body.OFX.CREDITCARDMSGSRSV1) {
      return this.carbonateCreditCardStatement(body)
    } else if (body.OFX.INVSTMTMSGSRSV1) {
      return this.carbonateInvestmentStatement(body)
    } else {
      console.error('Unknown message', body.OFX);
      throw new Error('Unknown message received from bank');
    }
  }

  private carbonateBankStatement(ofxBody: OfxBody): StatementModel {
    return {
      transactionSets: [
        {
          requestTransactionId: ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.TRNUID,
          dateStart: OfxDateUtil.parseOfxDate(ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.DTSTART),
          dateEnd: OfxDateUtil.parseOfxDate(ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.DTEND),
          account: OfxBankAccountAdapter.convertToAccount(undefined, ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM),
          currencyCode: ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.CURDEF,
          transactions: OfxStatementTransactionAdapter.convertTransactionList(ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN),
          ledgerBalance: OfxAccountBalanceAdapter.convertToAccountBalance(ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL),
          availableBalance: OfxAccountBalanceAdapter.convertToAccountBalance(ofxBody.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.AVAILBAL),
        }
      ]
    }
  }

  private carbonateCreditCardStatement(ofxBody: OfxBody): StatementModel {
    return {
      transactionSets: [
        {
          requestTransactionId: ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.TRNUID,
          dateStart: OfxDateUtil.parseOfxDate(ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTSTART),
          dateEnd: OfxDateUtil.parseOfxDate(ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTEND),
          account: OfxCreditCardAccountAdapter.convertToAccount(undefined, ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM),
          currencyCode: ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CURDEF,
          transactions: OfxStatementTransactionAdapter.convertTransactionList(ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN),
          ledgerBalance: OfxAccountBalanceAdapter.convertToAccountBalance(ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.LEDGERBAL),
          availableBalance: OfxAccountBalanceAdapter.convertToAccountBalance(ofxBody.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.AVAILBAL),
        }
      ]
    }
  }

  private carbonateInvestmentStatement(ofxBody: OfxBody): StatementModel {
    return {
      transactionSets: [
        {
          requestTransactionId: ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.TRNUID,
          dateStart: OfxDateUtil.parseOfxDate(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.INVTRANLIST.DTSTART),
          dateEnd: OfxDateUtil.parseOfxDate(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.INVTRANLIST.DTEND),
          account: OfxInvestmentAccountAdapter.convertToAccount(undefined, ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.INVACCTFROM),
          currencyCode: ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.CURDEF,
          transactions: OfxInvestmentTransactionAdapter.convertTransactionList(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.INVTRANLIST),
          ledgerBalance: OfxInvestmentBalanceAdapter.convertToAccountBalance(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS),
          availableBalance: OfxInvestmentBalanceAdapter.convertToAccountBalance(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS),
        }
      ],
      positions: OfxInvestmentPositionAdapter.convertToAccountPosition(ofxBody.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS)
    }
  }

  private convertFromXML(ofxString: string): Promise<OfxBody> {
    return new Promise((resolve, reject) => {
      if (!this.validOfxString(ofxString)) {
        reject(new Error('Attempting to convert an invalid string.'));
      }
      const ofxResult = ofxString.split('<OFX>', 2);
      const ofxPart = `<OFX>${ofxResult[1]}`;

      // TODO: Check headers?
      // const headerPart = ofxResult[0].split(/\r|\n/);

      const xml = ofxPart
        // Replace ampersand
        .replace(/&/g, `&#038;`)
        .replace(/&amp;/g, `&#038;`)
        // Remove empty spaces and line breaks between tags
        .replace(/>\s+</g, '><')
        // Remove empty spaces and line breaks before tags content
        .replace(/\s+</g, '<')
        // Remove empty spaces and line breaks after tags content
        .replace(/>\s+/g, '>')
        // Remove dots in start-tags names and remove end-tags with dots
        .replace(
          /<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)(<\/\1\.\2>)?/g,
          '<$1$2>$3'
        )
        // Add a new end-tags for the ofx elements
        .replace(/<(\w+?)>([^<]+)/g, '<$1>$2</<added>$1>')
        // Remove duplicate end-tags
        .replace(/<\/<added>(\w+?)>(<\/\1>)?/g, '</$1>');

      console.debug('string to parse', xml);
      let json;
      const parser = new Xml2JsParser.Parser({ explicitArray: false });
      parser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        }
        json = result;
        resolve(json);
      });
    });
  }

  private validOfxString(ofxString: string) {
    return ofxString.indexOf('<OFX>') > -1;
  }
}
