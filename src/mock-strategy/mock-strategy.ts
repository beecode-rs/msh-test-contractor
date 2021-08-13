export interface MockStrategy {
  mock(params: any[]): void
  restore(): void
}
