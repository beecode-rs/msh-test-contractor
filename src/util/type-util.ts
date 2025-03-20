export const typeUtil = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isClass: (module: any): boolean => {
		return typeUtil.isObject(module) && typeUtil.isFunction(module)
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isFunction: (module: any): boolean => {
		return module instanceof Function
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isObject: (module: any): boolean => {
		return module instanceof Object
	},
}
