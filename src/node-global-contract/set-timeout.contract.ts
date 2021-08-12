export default {
  subject: { fn: 'setTimeout' },
  mock: {
    jest: (jest: any, _inputParams?: any[]): (() => void) => {
      jest.useFakeTimers()

      return (): void => {
        jest.useRealTimers()
      }
    },
  },
  contracts: [
    {
      inputParams: [jest.fn(), 1000],
    },
  ],
}
