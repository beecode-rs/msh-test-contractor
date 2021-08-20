export interface MockerStrategy<T> {
  contractSpy(): T
  mockRestore(): void
}
