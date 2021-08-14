import { Contract, ContractMockRevertFn } from '../contract-type/contract'

const mock = {
  jest: (jest: any, { params }: { params: any[] } = { params: [] }): ContractMockRevertFn => {
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
}

const self = {
  name: 'Date',
  module: global,
  fn: {
    _constructor: {
      mock,
      // mock: {
      // jest: (): ContractMockRevertFn => {
      //   const restoreAll = [mocker(self, 'now')]
      //   return (): void => {
      //     restoreAll.forEach((um) => um())
      //   }
      // },
      // },
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
    now: {
      mock: {
        jest: (jest: any): ContractMockRevertFn => {
          const spy = jest.spyOn(global.Date, 'now')
          spy.mockReturnValue(1577833200000)

          return (): void => {
            spy.mockRestore()
          }
        },
      },
      terms: [
        {
          params: [],
          result: 1577833200000,
        },
      ],
    },
  },
} as Contract

export default self
