import { MockStrategy } from './mock-strategy'

export class MockEmptyStrategy implements MockStrategy {
  public mock(_params: any[]): void {
    // dummy call
  }

  public restore(): void {
    // dummy call
  }
}
