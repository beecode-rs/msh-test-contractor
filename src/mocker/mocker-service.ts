import { SpecialFnName } from '#src/enum/special-fn-name.js'
import { type MockerStrategy } from '#src/mocker/mocker-strategy.js'
import { MockerVitestClassStrategy } from '#src/mocker/mocker-vitest-class-strategy.js'
import { MockerVitestFunctionStrategy } from '#src/mocker/mocker-vitest-function-strategy.js'
import { MockerVitestObjectStrategy } from '#src/mocker/mocker-vitest-object-strategy.js'
import { type AnyContract } from '#src/types/index.js'
import { typeUtil } from '#src/util/type-util.js'

export const mockerService = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	strategyFromContract: (contract: AnyContract): MockerStrategy<any> => {
		const { module, subjectName, fns } = contract
		const subject = module[subjectName]
		const { [SpecialFnName.SELF]: selfFunction } = fns
		if (typeUtil.isFunction(subject) && selfFunction) {
			return new MockerVitestFunctionStrategy(contract)
		}
		if (typeUtil.isClass(subject)) {
			return new MockerVitestClassStrategy(contract)
		}
		if (typeUtil.isObject(subject)) {
			return new MockerVitestObjectStrategy(contract)
		}
		throw new Error('Unknown mocker')
	},
}
