export const objectUtil = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	stringifyOrNullUndefined: (param: any): any => {
		if (param == null) {
			return param
		}

		return JSON.stringify(param, Object.keys(param).sort())
	},
}
