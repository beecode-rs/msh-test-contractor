import { dummyFunction } from './dummy-function'

export class DummyClass {
	private readonly __a: number
	private readonly __b: number

	constructor(a: number, b: number) {
		this.__a = a
		this.__b = b
	}

	add(c: number): number {
		return this.__a + this.__b + c
	}

	sub(c: number): number {
		return this.__a + this.__b - c
	}

	externalAdd(c: number): number {
		return dummyFunction.add(this.__a, this.__b) + c
	}
}
