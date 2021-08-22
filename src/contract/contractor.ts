import { contractMockService } from '../contract-mock/contract-mock-service'
import { subjectService } from '../subject/subject-service'
import { Contract, ContractFn, PropType } from '../types'
import { contractorService } from './contractor-service'

export const contractor = <
  M,
  SN extends Extract<keyof M, string>,
  S extends PropType<M, SN>,
  C extends Contract<M, SN, S>,
  CFNK extends Extract<keyof PropType<C, 'fns'>, string>
>(
  contract: C,
  fnName: CFNK
): void => {
  const { terms, mock } = contract.fns[fnName]! as ContractFn
  const mockStrategy = contractMockService.strategyFromFunctionMock(mock)

  describe(contractorService.testDescription({ fnName }), () => {
    terms.forEach((term) => {
      const subjectStrategy = subjectService.strategyFromContract({ contract, fnName, term })

      it(contractorService.testName({ term }), () => {
        mockStrategy.mock({ params: term.params })
        const result = subjectStrategy.exec(term)
        expect(result).toEqual(term.result)
        mockStrategy.restore()
      })
    })
  })
}
