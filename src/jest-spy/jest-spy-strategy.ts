export interface JestSpyStrategy {
	mockImplementationFactory(): (...args: any[]) => any
}
