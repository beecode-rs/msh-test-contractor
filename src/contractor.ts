import { Contract } from './contract-type/contract'
import { mockService } from './mock-strategy/mock-service'
import { subjectService } from './subject/subject-service'

export const contractor = (contract: Contract): void => {
  describe(`${contract.subject.fn} [contract]`, () => {
    const { terms, mock, subject } = contract // eslint-disable-line @typescript-eslint/no-var-requires
    const subjectStrategy = subjectService.getSubjectStrategyFromContractSubject(subject)
    const mockStrategy = mockService.getMockStrategyFromContractMock(mock)

    terms.forEach((term) => {
      if (!term.hasOwnProperty('result')) return // eslint-disable-line no-prototype-builtins
      const testTitle = `should fulfill contract input:${JSON.stringify(term.params)}`

      it(testTitle, () => {
        mockStrategy.mock(term.params)
        expect(subjectStrategy.exec(term.params)).toEqual(term.result)
        mockStrategy.restore()
      })
    })
  })
}
