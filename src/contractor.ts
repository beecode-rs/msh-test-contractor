import { mockService } from './mock-strategy/mock-service'
import { subjectService } from './subject/subject-service'
import { Contract, ContractFunction, PropType } from './types/index'

export const contractor = <
  M,
  SN extends string,
  // @ts-ignore
  S extends PropType<M, SN>,
  C extends Contract<M, SN, S>,
  CFNK extends keyof PropType<C, 'fn'>
>(
  { subjectName, module, fn }: C,
  fnName: CFNK
): void => {
  describe(`${fnName} [contract]`, () => {
    const { terms, mock } = fn[fnName] as ContractFunction
    const subjectStrategy = subjectService.getSubjectStrategyFromContractSubject({
      subjectName,
      module,
      fnName: fnName.toString(),
    })
    const mockStrategy = mockService.getMockStrategyFromContractMock(mock)

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
