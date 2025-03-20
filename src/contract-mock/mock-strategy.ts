export interface MockStrategy {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mock(options?: { params?: any[] }): void
	restore(): void
}
