export interface MockStrategy {
	mock(options?: { params?: any[] }): void // eslint-disable-line @typescript-eslint/no-explicit-any
	restore(): void
}
