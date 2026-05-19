import { DummyClass } from './dummy-class'
import { logger } from './logger'

export const dummyFunction = {
	add: (a: number, b: number): number => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		logger.debug(`add ${a} and ${b}`)

		return a + b
	},
	callClass: (a: number, b: number, c: number): number => {
		const someClass = new DummyClass(a, b)

		return someClass.add(c)
	},
	callClassMultiFun: (a: number, b: number, c: number, d: number): number => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const someClass = new DummyClass(a, b)

		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		return someClass.add(c) + someClass.sub(d)
	},
	errorIfMoreThenTen: (a: number): number => {
		if (a > 10) {
			throw new Error('More then 10')
		}

		return a
	},
	sub: (a: number, b: number): number => {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		logger.debug(`sub ${a} and ${b}`)

		return a - b
	},
}
