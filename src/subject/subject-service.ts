import { SpecialFnName } from '../enum/special-fn-name'
import { AnyContract, ContractTerm } from '../types'
import { fnUtil } from '../util/fn-util'
import { SubjectClassFunctionStrategy } from './subject-class-function-strategy'
import { SubjectConstructorStrategy } from './subject-constructor-strategy'
import { SubjectFunctionStrategy } from './subject-function-strategy'
import { SubjectFromContract, SubjectStrategy } from './subject-strategy'

export const subjectService = {
  strategyFromContractFunction: ({
    contract: { module, subjectName, fns },
    fnName,
    term: { constructorParams },
  }: {
    contract: AnyContract
    fnName: string
    term: ContractTerm
  }): SubjectStrategy => {
    const subjectFromContract = { module, subjectName } as SubjectFromContract
    if (fnUtil.isConstructor(fnName)) return new SubjectConstructorStrategy({ subjectFromContract })
    if (Object.keys(fns ?? {}).includes(SpecialFnName.CONSTRUCTOR)) {
      if (!constructorParams) throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`)
      return new SubjectClassFunctionStrategy({ subjectFromContract, constructorParams, fnName })
    }
    return new SubjectFunctionStrategy({ subjectFromContract, fnName })
  },
}
