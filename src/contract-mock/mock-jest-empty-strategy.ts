import { MockStrategy } from './mock-strategy'

export class MockJestEmptyStrategy implements MockStrategy {
  public mock(): void {
    // dummy call
  }

  public restore(): void {
    // dummy call
  }
}
