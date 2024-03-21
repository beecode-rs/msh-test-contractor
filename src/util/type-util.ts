export const typeUtil = {
	isClass: (module: any): boolean => {
		return typeUtil.isObject(module) && typeUtil.isFunction(module)
	},
	isFunction: (module: any): boolean => {
		return module instanceof Function
	},
	isObject: (module: any): boolean => {
		return module instanceof Object
	},
}
