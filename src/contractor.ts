import { mockService } from './mock/mock-service'
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
  describe(`${fnName} [contract]`, () => {
    const { terms, mock } = contract.fn[fnName]!
    const subjectStrategy = subjectService.subjectStrategyFromContract({ contract, fnName })
    const mockStrategy = mockService.mockStrategyFromFunctionMock(mock)

    terms.forEach((term) => {
      const testTitle = `input: ${JSON.stringify(term.params)}   output: ${JSON.stringify(term.result)}`
      it(testTitle, () => {
        mockStrategy.mock({ params: term.params })
        expect(subjectStrategy.exec(term.params)).toEqual(term.result)
        mockStrategy.restore()
      })
    })
  })
}