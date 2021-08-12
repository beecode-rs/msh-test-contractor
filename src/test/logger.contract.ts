export default {
  subject: {
    fn: 'logger._message',
    module: require('./logger'),
  },
  mock: {
    jest: (jest: any): (() => void) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const unmockDate = require('../node-global-contract/new-date.contract').default.mock.jest(jest)

      return (): void => {
        unmockDate()
      }
    },
  },
  contracts: [
    {
      inputParams: ['type', 'test-message'],
      result: '2020-01-01T00:00:00.000Z:TYPE:test-message',
    },
    {
      inputParams: ['DEBUG', 'test-message'],
      result: '2020-01-01T00:00:00.000Z:DEBUG:test-message',
    },
    {
      inputParams: ['error', 'test-message'],
      result: '2020-01-01T00:00:00.000Z:ERROR:test-message',
    },
  ],
}
