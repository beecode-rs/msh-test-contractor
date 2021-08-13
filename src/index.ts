import { Contract } from './contract-type/contract'
import { objectUtil } from './util/object-util'

export const contractor = {
  unitTestJest: (contractLocation: string): void => {
    describe('Contract', () => {
      const { terms, mock, subject } = require(contractLocation).default as Contract // eslint-disable-line @typescript-eslint/no-var-requires

      terms.forEach((term) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!term.hasOwnProperty('result')) return
        const testTitle = `should fulfill contract input:${JSON.stringify(term.params)}`

        it(testTitle, () => {
          const restoreMock = mock?.jest && mock.jest(jest, term.params)

          const { fn, source, isConstructor } = subject

          if (isConstructor) expect(new source[fn](...term.params)).toEqual(term.result)
          else expect(objectUtil.get(source, fn)(...term.params)).toEqual(term.result)

          if (restoreMock) restoreMock()
        })
      })
    })
  },
}
