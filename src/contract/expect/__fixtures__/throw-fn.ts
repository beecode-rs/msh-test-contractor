export const throwTestError = (): never => {
	throw new Error('test error')
}

export const throwExpectedError = (): never => {
	throw new Error('expected error')
}

export const throwValidationFailed = (): never => {
	throw new Error('validation failed for input')
}

export const noThrow = (): undefined => {
	return undefined
}
