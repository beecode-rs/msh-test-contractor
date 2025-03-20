import { SpecialFnName } from '#src/enum/special-fn-name'
import { MockerJestClassStrategy } from '#src/mocker/mocker-jest-class-strategy'
import { MockerJestFunctionStrategy } from '#src/mocker/mocker-jest-function-strategy'
import { MockerJestObjectStrategy } from '#src/mocker/mocker-jest-object-strategy'
import { type MockerStrategy } from '#src/mocker/mocker-strategy'
import { type AnyContract } from '#src/types/index'
import { typeUtil } from '#src/util/type-util'

export const mockerService = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
