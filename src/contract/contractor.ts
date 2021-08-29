import { contractMockService } from '../contract-mock/contract-mock-service'
import { subjectService } from '../subject/subject-service'
import { Contract, ContractFn, PropType } from '../types'
import { contractorService } from './contractor-service'
import { contractExpectService } from './expect/contract-expect-service'

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
    try {
      terms.forEach((term) => {
        const subjectStrategy = subjectService.strategyFromContractFunction({ contract, fnName, term })

        it(contractorService.testName({ term }), () => {
          mockStrategy.mock({ params: term.params })
          const expectStrategy = contractExpectService.fromTerm({ term })
          expectStrategy.test(() => subjectStrategy.exec(term))
          mockStrategy.restore()
        })
      })
    } catch (err) {
      console.error(`Error running test on contract:${contract.subjectName}, fn:${fnName}`) // eslint-disable-line no-console
      throw err
    }
  })
}
