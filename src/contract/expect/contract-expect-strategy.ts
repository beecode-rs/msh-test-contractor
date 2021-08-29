export interface ContractExpectStrategy {
  test(fn: () => any): void
}
