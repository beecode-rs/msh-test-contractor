import { AnyContract } from '../types/index'
import { typeUtil } from '../util/type-util'
import { MockerJestClassStrategy } from './mocker-jest-class-strategy'
import { MockerJestObjectStrategy } from './mocker-jest-object-strategy'
import { MockerStrategy } from './mocker-strategy'

export const mockerService = {
  strategyFromContract: (contract: AnyContract): MockerStrategy<any> => {
    const { module, subjectName } = contract
    const subject = module[subjectName]
    if (typeUtil.isClass(subject)) return new MockerJestClassStrategy(contract)
    if (typeUtil.isObject(subject)) return new MockerJestObjectStrategy(contract)
    throw new Error('Unknown mocker')
  },
}
