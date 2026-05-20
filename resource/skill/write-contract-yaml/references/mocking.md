# Mocking in Contract YAML

Mocks replace real dependencies with contract-defined stubs during test execution. This lets you test a function in isolation without its actual dependencies running.

## Contract-Level Mock

Place `mock` at the top level. The listed contract files are loaded, their exports are mocked, and the mocks apply to every method in the contract.

```yaml
subject: orderService
module: ./order-service.js
subjectType: function
mock:
  - ./logger.contract.yaml
  - ./payment-gateway.contract.yaml
methods:
  createOrder:
    terms:
      - params:
          - item: book
            price: 29.99
        result:
          orderId: 'ord-123'
          status: confirmed
```

When `createOrder` runs, any call to `logger.debug(...)` or `payment-gateway.charge(...)` is intercepted by the mock and returns the value defined in the respective contract's terms.

## Method-Level Mock

Place `mock` inside a specific method. Only that method gets the mock — other methods run without it.

```yaml
methods:
  findById:
    terms:
      - constructorParams: ['db']
        params: [1]
        result: { id: 1, name: John }
  sendEmail:
    mock:
      - ./email-service.contract.yaml
    terms:
      - constructorParams: ['db']
        params: [1, 'Welcome!']
        result: { sent: true }
```

`findById` runs without mocks. `sendEmail` has the email service mocked.

## mockFunction — Mock Internal Methods

`mockFunction` replaces methods on the same subject object. When method A calls method B internally, and B is listed in `mockFunction`, B gets replaced by a mock built from its own contract terms.

```yaml
subject: logger
module: ./logger.js
subjectType: function
methods:
  _message:
    mock:
      - ./date.contract.yaml
    terms:
      - params: ['INFO', 'disk full']
        result: '2020-01-01T00:00:00.000Z:INFO:disk full'
  debug:
    mockFunction: [_message]
    terms:
      - params: ['disk full']
        result: '2020-01-01T00:00:00.000Z:DEBUG:disk full'
```

When testing `debug`, the `_message` method is mocked. So `debug` internally calls `_message('DEBUG', 'disk full')` but gets back the canned result from `_message`'s terms instead of executing the real `_message` code.

## Mocking Global Classes (Date)

To mock a global class like `Date`, combine three things:

1. `module: global` — resolves from `globalThis`
2. `mockFunction: [CONSTRUCTOR]` — replaces the constructor within the method's scope
3. A mock module via `__import__:` that swaps `globalThis.Date` before/after the test

```yaml
subject: Date
module: global
subjectType: class
mock:
  - __import__:./date-mock.js
constructor:
  terms:
    - params: []
      result: new Date("2020-01-01")
methods:
  toISOString:
    mockFunction: [CONSTRUCTOR]
    terms:
      - constructorParams: []
        params: []
        result: '2020-01-01T00:00:00.000Z'
```

The `date-mock.js` file is a module exporting a `ContractMock` function that replaces and restores `globalThis.Date`.

## Circular Mock Protection

The loader tracks which contract files have been loaded to prevent infinite recursion. Mock dependencies of mocks are automatically stripped — only the top-level mock's terms are used.

## How Mocks Work at Runtime

1. The loader reads the referenced `.contract.yaml` file
2. Builds a mock function from its terms (params match → return result)
3. Wraps the subject's dependency with `vi.fn()` (Vitest mock)
4. Each matching call returns the contract-defined result
5. After the test, mocks are restored automatically
