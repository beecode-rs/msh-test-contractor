import { SubjectConstructorStrategy } from './subject-constructor-strategy'
import { SubjectFunctionStrategy } from './subject-function-strategy'
import { SubjectStrategy } from './subject-strategy'

export const subjectService = {
  getSubjectStrategyFromContractSubject: ({
    module,
    subjectName,
    fnName,
  }: {
    module: any
    subjectName: string
    fnName: string
  }): SubjectStrategy => {
    if (fnName === '_constructor') return new SubjectConstructorStrategy({ module, subjectName })
    return new SubjectFunctionStrategy({ module, subjectName, fnName })
  },
}
