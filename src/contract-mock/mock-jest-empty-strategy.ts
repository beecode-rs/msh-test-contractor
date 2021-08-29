import { MockStrategy } from './mock-strategy'

export class MockJestEmptyStrategy implements MockStrategy {
  public mock(_options: { params?: any[] } = {}): void {
    // dummy call
  }

  public restore(): void {
    // dummy call
  }
}
