import { ContractSubject } from '../contract-type/contract'
import { SubjectConstructorStrategy } from './subject-constructor-strategy'
import { SubjectFunctionStrategy } from './subject-function-strategy'
import { SubjectStrategy } from './subject-strategy'

export const subjectService = {
  getSubjectStrategyFromContractSubject: (subject: ContractSubject): SubjectStrategy => {
    if (subject.isConstructor) return new SubjectConstructorStrategy(subject)
    return new SubjectFunctionStrategy(subject)
  },
}
