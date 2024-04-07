export const objectUtil = {
	stringifyOrNullUndefined: (param: any): any => {
		if (param == null) {
			return param
		}

		return JSON.stringify(param, Object.keys(param).sort())
	},
}
