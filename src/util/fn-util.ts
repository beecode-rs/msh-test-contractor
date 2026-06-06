import { SpecialFnName } from '#src/business/model/special-fn-name.js'

export const fnUtil = {
	isConstructor: (fnName: string): boolean => {
		return fnName === SpecialFnName.CONSTRUCTOR
	},
}
