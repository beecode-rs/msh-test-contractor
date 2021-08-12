export default {
  subject: { object: 'Date' },
  mock: {
    jest: (jest: any, inputParams?: any[]): (() => void) => {
      const realDateNow = Date.bind(global.Date)

      const DATE_TO_USE = new Date((inputParams ?? [])[0] ?? '2020-01-01')
      const _Date = Date
      global.Date = jest.fn(() => DATE_TO_USE)
      global.Date.UTC = _Date.UTC
      global.Date.parse = _Date.parse
      global.Date.now = _Date.now

      return (): void => {
        global.Date = realDateNow
      }
    },
  },
  contracts: [
    {
      inputParams: [],
      result: new Date('2020-01-01'),
    },
    {
      inputParams: ['2020-01-02'],
      result: new Date('2020-01-02'),
    },
  ],
}
