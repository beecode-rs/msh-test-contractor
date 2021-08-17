import { AnyContract } from '../types'
import { fnUtil } from '../util/fn-util'
import { SubjectConstructorStrategy } from './subject-constructor-strategy'
import { SubjectFunctionStrategy } from './subject-function-strategy'
import { SubjectFomContract, SubjectStrategy } from './subject-strategy'

export const subjectService = {
  subjectStrategyFromContract: ({
    contract: { module, subjectName },
    fnName,
  }: {
    contract: AnyContract
    fnName: string
  }): SubjectStrategy => {
    const subjectFromContract = { module, subjectName } as SubjectFomContract
    if (fnUtil.isConstructor(fnName)) return new SubjectConstructorStrategy({ subjectFromContract })
    return new SubjectFunctionStrategy({ subjectFromContract, fnName })
  },
}
