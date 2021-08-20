export interface JestSpyStrategy {
  mockImplementation(): (...args: any[]) => any
}
