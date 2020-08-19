import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utcPlugin from 'dayjs/plugin/utc'
import { OfxDateModel, OfxTimezoneModel, DATE_TIME_FORMAT } from 'src/ofxDate.model'

dayjs.extend(customParseFormat)
dayjs.extend(utcPlugin)

export class OfxDateUtil {

  public static parseOfxDate(ofxDate: string): OfxDateModel {
    if (!ofxDate) {
      return undefined;
    }

    const [datePart, tzPart] = ofxDate.split('[', 2)

    let parsed: Dayjs
    let timezone: OfxTimezoneModel
    switch (datePart.length) {
      case 8:
        parsed = dayjs.utc(datePart, 'YYYYMMDD')
        timezone = { utcOffset: 0 }
        break;
      case 14:
        parsed = dayjs.utc(datePart, 'YYYYMMDDHHmmss')
        timezone = { utcOffset: 0 }
        break;
      case 18:
        parsed = dayjs(datePart, 'YYYYMMDDHHmmss.SSS')
        break;
    }

    if (tzPart) {
      const [utcOffset, tzName] = tzPart.substring(0, tzPart.length - 1).split(':')
      timezone = {
        utcOffset: parseInt(utcOffset),
        tzName
      }
    }

    return {
      dateTime: parsed.format(DATE_TIME_FORMAT),
      timezone
    }
  }
}
