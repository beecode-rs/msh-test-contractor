export const simpleFunction = (a: number): number => {
	if (a > 10) {
		throw new Error('number is greater than ten')
	}

	return a
}
