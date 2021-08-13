import { Contract, ContractMockRevertFn } from '../contract-type/contract'

export default {
  Date: {
    subject: {
      fn: 'Date',
      source: global,
      isConstructor: true,
    },
    mock: {
      jest: (jest: any, params: any[] = []): ContractMockRevertFn => {
        const realDate = Date.bind(global.Date)

        const mockedDate = new Date(params[0] ?? '2020-01-01')
        const _Date = Date
        global.Date = jest.fn(() => mockedDate)
        global.Date.UTC = _Date.UTC
        global.Date.parse = _Date.parse
        global.Date.now = _Date.now

        return (): void => {
          global.Date = realDate
        }
      },
    },
    terms: [
      {
        params: [],
        result: new Date('2020-01-01'),
      },
      {
        params: ['2020-01-02'],
        result: new Date('2020-01-02'),
      },
    ],
  },
} as { [k: string]: Contract }
