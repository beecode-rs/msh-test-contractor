import { Calculator, type ICalculator } from './calculator.js'

export class FactorialCalculator {
	protected readonly _calc: ICalculator

	constructor(calc: ICalculator = new Calculator()) {
		this._calc = calc
	}

	factorial(n: number): number {
		if (n < 0) {
			throw new Error('Negative numbers not supported')
		}

		return Array.from({ length: n }, (_, i) => {
			return i + 1
		}).reduce((acc, val) => {
			return this._calc.multiply(acc, val)
		}, 1)
	}
}
