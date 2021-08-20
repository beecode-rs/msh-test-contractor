export interface MockStrategy {
  mock(options: { params?: any[] }): void
  restore(): void
}
