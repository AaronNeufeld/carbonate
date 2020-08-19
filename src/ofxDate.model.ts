export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'

export interface OfxDateModel {
    /** The date and time in "YYYY-MM-DD HH:mm:ss.SSS" format (see DATE_TIME_FORMAT) */
    dateTime: string,
    timezone: OfxTimezoneModel
}

export interface OfxTimezoneModel {
    /** The positive or negative offset from UTC */
    utcOffset: number;
    /** The name of the timezone, if provided */
    tzName?: string;
}