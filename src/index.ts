import { objectUtil } from './util/object-util'

export const contractor = {
  unitTestJest: (contractLocation: string): void => {
    describe('Contract', () => {
      const { contracts, mock, subject } = require(contractLocation).default as any // eslint-disable-line @typescript-eslint/no-var-requires

      contracts.forEach((par: { inputParams: any; result: any }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!par.hasOwnProperty('result')) return
        const testTitle = `should fulfill contract input:${JSON.stringify(par.inputParams)}`

        it(testTitle, () => {
          const restoreMock = mock?.jest && mock.jest(jest, par.inputParams)

          const { object, fn, module } = subject

          if (module) {
            if (fn) expect(objectUtil.get(module, fn)(...par.inputParams)).toEqual(par.result)
          } else {
            if (object) expect(new (eval(object))(...par.inputParams)).toEqual(par.result)
            if (fn) expect(eval(object)(...par.inputParams)).toEqual(par.result)
          }

          if (restoreMock) restoreMock()
        })
      })
    })
  },
}
