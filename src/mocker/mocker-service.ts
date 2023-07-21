import { SpecialFnName } from '#/enum/special-fn-name.js'
import { MockerJestClassStrategy } from '#/mocker/mocker-jest-class-strategy.js'
import { MockerJestFunctionStrategy } from '#/mocker/mocker-jest-function-strategy.js'
import { MockerJestObjectStrategy } from '#/mocker/mocker-jest-object-strategy.js'
import { MockerStrategy } from '#/mocker/mocker-strategy.js'
import { AnyContract } from '#/types/index.js'
import { typeUtil } from '#/util/type-util.js'

export const mockerService = {
	strategyFromContract: (contract: AnyContract): MockerStrategy<any> => {
		const { module, subjectName, fns } = contract
		const subject = module[subjectName]
		const { [SpecialFnName.SELF]: selfFunction } = fns
		if (typeUtil.isFunction(subject) && selfFunction) {
			return new MockerJestFunctionStrategy(contract)
		}
		if (typeUtil.isClass(subject)) {
			return new MockerJestClassStrategy(contract)
		}
		if (typeUtil.isObject(subject)) {
			return new MockerJestObjectStrategy(contract)
		}
		throw new Error('Unknown mocker')
	},
}
