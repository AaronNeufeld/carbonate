export interface FinancialInstitutionModel {
    /** Defines a namespace for financial institution IDs, see `fid` below */
    organization?: string;
    /** The ID of the financial institution, unique with the `organization` */
    fid?: string;
    /** Bank ID from the ACCTFROM tag */
    bankId?: string;
    /** Bank Id from Intuit licensing */
    intuitBID?: string;
}