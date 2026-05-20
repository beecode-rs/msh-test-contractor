export interface ICalculator {
	add(a: number, b: number): number
	multiply(a: number, b: number): number
}

export class Calculator implements ICalculator {
	add(a: number, b: number): number {
		return a + b
	}

	multiply(a: number, b: number): number {
		return a * b
	}
}
