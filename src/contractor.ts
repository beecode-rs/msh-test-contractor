import { Contract } from './contract-type/contract'
import { mockService } from './mock-strategy/mock-service'
import { subjectService } from './subject/subject-service'

export const contractor = (contract: Contract, fn: string): void => {
  const { name, module } = contract
  describe(`${fn} [contract]`, () => {
    const { terms, mock } = contract.fn[fn]
    const subjectStrategy = subjectService.getSubjectStrategyFromContractSubject({ name, module, fn })
    const mockStrategy = mockService.getMockStrategyFromContractMock(mock)

    terms.forEach((term) => {
      const testTitle = `should fulfill contract input:${JSON.stringify(term.params)}`

      it(testTitle, () => {
        mockStrategy.mock({ params: term.params })
        expect(subjectStrategy.exec(term.params)).toEqual(term.result)
        mockStrategy.restore()
      })
    })
  })
}
