import { SpecialFnName } from 'src/enum/special-fn-name'

export const fnUtil = {
	isConstructor: (fnName: string): boolean => {
		return fnName === SpecialFnName.CONSTRUCTOR
	},
}
