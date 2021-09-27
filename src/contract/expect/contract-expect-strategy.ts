export interface ContractExpectStrategy {
  test(fn: () => any): Promise<void>
}
