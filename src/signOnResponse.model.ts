import { OfxDateModel } from "./ofxDate.model";
import { FinancialInstitutionModel } from "./financialInstitution.model";

export interface SignOnResponseModel {
    dateOfResponse: OfxDateModel;
    financialInstitution: FinancialInstitutionModel
}