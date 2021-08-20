import { mockService } from './contract-mock/mock-service'
import { subjectService } from './subject/subject-service'
import { Contract, PropType } from './types'

export const contractor = <
  M,
  SN extends Extract<keyof M, string>,
  S extends PropType<M, SN>,
  C extends Contract<M, SN, S>,
  CFNK extends Extract<keyof PropType<C, 'fn'>, string>
>(
  contract: C,
  fnName: CFNK
): void => {
  const { terms, mock } = contract.fn[fnName]!
  const mockStrategy = mockService.strategyFromFunctionMock(mock)

  describe(`${fnName} [contract]`, () => {
    terms.forEach((term) => {
      const subjectStrategy = subjectService.strategyFromContract({ contract, fnName, term })

      const testTitle = `input: ${JSON.stringify(term.params)}   output: ${JSON.stringify(term.result)}`
      it(testTitle, () => {
        mockStrategy.mock({ params: term.params })
        expect(subjectStrategy.exec(term)).toEqual(term.result)
        mockStrategy.restore()
      })
    })
  })
}
