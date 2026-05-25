export interface VitestSpyStrategy {
	mockImplementationFactory(): (...args: any[]) => any // eslint-disable-line @typescript-eslint/no-explicit-any
}
