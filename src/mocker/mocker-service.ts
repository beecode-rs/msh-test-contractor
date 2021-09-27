import { SpecialFnName } from '../enum/special-fn-name'
import { AnyContract } from '../types'
import { typeUtil } from '../util/type-util'
import { MockerJestClassStrategy } from './mocker-jest-class-strategy'
import { MockerJestFunctionStrategy } from './mocker-jest-function-strategy'
import { MockerJestObjectStrategy } from './mocker-jest-object-strategy'
import { MockerStrategy } from './mocker-strategy'

export const mockerService = {
  strategyFromContract: (contract: AnyContract): MockerStrategy<any> => {
    const { module, subjectName, fns } = contract
    const subject = module[subjectName]
    const { [SpecialFnName.SELF]: selfFunction } = fns
    if (typeUtil.isFunction(subject) && selfFunction) return new MockerJestFunctionStrategy(contract)
    if (typeUtil.isClass(subject)) return new MockerJestClassStrategy(contract)
    if (typeUtil.isObject(subject)) return new MockerJestObjectStrategy(contract)
    throw new Error('Unknown mocker')
  },
}
