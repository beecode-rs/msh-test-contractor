export class DummyClass {
	a(_a: string): string {
		return _a
	}
}

export const dummyModule = {
	dummySubject: {
		a: (_a: string): string => _a,
	},
}

export const dummyModuleFunction = { a: (_a: string): string => _a }
