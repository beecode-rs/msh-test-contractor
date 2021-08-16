export class DummyClass {
  private readonly __a: number
  private readonly __b: number

  constructor(a: number, b: number) {
    this.__a = a
    this.__b = b
  }

  public sum(): number {
    return this.__a + this.__b
  }
}
