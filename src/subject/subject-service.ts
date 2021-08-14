import { SubjectConstructorStrategy } from './subject-constructor-strategy'
import { SubjectFunctionStrategy } from './subject-function-strategy'
import { SubjectStrategy } from './subject-strategy'

export const subjectService = {
  getSubjectStrategyFromContractSubject: ({ name, module, fn }: { name: string; module: any; fn: string }): SubjectStrategy => {
    if (fn === '_constructor') return new SubjectConstructorStrategy({ name, module })
    return new SubjectFunctionStrategy({ name, module, fn })
  },
}
