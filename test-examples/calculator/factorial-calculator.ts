import { calculator } from './calculator.js'

export const factorialCalculator = {
	factorial(n: number): number {
		if (n < 0) {
			throw new Error('Negative numbers not supported')
		}

		return Array.from({ length: n }, (_, i) => {
			return i + 1
		}).reduce((acc, val) => {
			return calculator.multiply(acc, val)
		}, 1)
	},
}
