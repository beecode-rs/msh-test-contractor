export interface JestSpyStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mockImplementationFactory(): (...args: any[]) => any
}
