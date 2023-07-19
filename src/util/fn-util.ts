import { SpecialFnName } from '#/enum/special-fn-name.js'

export const fnUtil = {
	isConstructor: (fnName: string): boolean => {
		return fnName === SpecialFnName.CONSTRUCTOR
	},
}
