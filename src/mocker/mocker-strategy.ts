export interface MockerStrategy<T> {
  mockRestore(): void
  contractSpy(): T
}
