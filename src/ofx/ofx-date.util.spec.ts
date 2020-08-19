import { OfxDateUtil } from "./ofx-date.util"

describe('OfxDateUtil', () => {

  describe('parseOfxDateAsDate', () => {
    const fn = OfxDateUtil.parseOfxDate

    it('should return same if passed null or undefined', () => {
      expect(fn(null)).toBe(undefined)
      expect(fn(undefined)).toBe(undefined)
    })

    it('should return date at midnight if no time component', () => {
      expect(fn('20200404')).toEqual('2020-04-04')
    })

    it('should parse a date with time', () => {
      expect(fn('20200324064300')).toEqual('2020-03-24')
    })

    it('should parse a date with offset but no timezone code', () => {
      expect(fn('20200324120000[-5]')).toEqual('2020-03-24')
    })

    it('should parse a date with offset and timezone code', () => {
      expect(fn('20200324120000[-8:PST]')).toEqual('2020-03-24')
    })
  })

  // describe('parseOfxDateAsTimestamp', () => {
  //   const fn = OfxDateUtil.parseOfxDateAsTimestamp

  //   it('should return same if passed null or undefined', () => {
  //     expect(fn(null)).toBe(undefined)
  //     expect(fn(undefined)).toBe(undefined)
  //   })

  //   it('should return date at midnight if no time component', () => {
  //     expect(fn('20200404')).toEqual('2020-04-04 00:00:00.000')
  //   })

  //   it('should parse a date with offset but no timezone code', () => {
  //     expect(fn('20200324120000[-5]')).toEqual('2020-03-24 17:00:00.000')
  //   })

  //   it('should parse a date with offset and timezone code', () => {
  //     expect(fn('20200324120000[-8:PST]')).toEqual('2020-03-24 20:00:00.000')
  //   })
  // })
})