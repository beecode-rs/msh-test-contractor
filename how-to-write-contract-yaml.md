# How to Write contract.yaml Files

Contract YAML files define test cases for functions and classes. The test runner discovers all `*.contract.yaml` files and executes each term as a test case.

Every contract has three required fields — `subject`, `module`, and `subjectType` — plus a `methods` block (or `constructor` block for classes) containing the test terms.

The `module` field points to the compiled JS file (`.js`), not the TypeScript source (`.ts`). Both files live side-by-side in the same directory.

---

## Simple Function

```typescript
// math.ts
export const add = (a: number, b: number): number => a + b
```

```yaml
# math.contract.yaml
subject: add
module: ./math.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [1, 2]
        result: 3
      - params: [0, 0]
        result: 0
      - params: [-1, 5]
        result: 4
```

`__self__` is the method name used when the subject is a plain function — it calls the function itself.

---

## Error Terms

Use `error` instead of `result` to assert that the function throws:

```typescript
// divide.ts
export const divide = (a: number, b: number): number => {
	if (b === 0) throw new Error('Division by zero')
	return a / b
}
```

```yaml
# divide.contract.yaml
subject: divide
module: ./divide.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [10, 2]
        result: 5
      - params: [10, 0]
        error: Division by zero
```

`error` can be a bare string (matched against the thrown error message) or a quoted string.

---

## All Primitive Types

YAML native types are supported directly in `params` and `result`:

```typescript
// format.ts
export const format = (value: unknown): unknown => {
	if (typeof value === 'string') return value.toUpperCase()
	if (typeof value === 'boolean') return !value
	return value
}
```

```yaml
# format.contract.yaml
subject: format
module: ./format.js
subjectType: function
methods:
  __self__:
    terms:
      # string
      - params: ['hello']
        result: 'HELLO'
      # number (integer, float, negative)
      - params: [42]
        result: 42
      - params: [3.14]
        result: 3.14
      - params: [-1]
        result: -1
      # boolean
      - params: [true]
        result: false
      # null
      - params: [null]
        result: null
```

---

## Objects and Arrays

```typescript
// user-service.ts
type User = { id: number; name: string; created: boolean }

export const getUser = (input: { name: string; email: string }): User => ({
	id: 1,
	name: input.name,
	created: true,
})
```

```yaml
# user-service.contract.yaml
subject: getUser
module: ./user-service.js
subjectType: function
methods:
  __self__:
    terms:
      # object params and result
      - params:
          - name: John
            email: john@example.com
        result:
          id: 1
          name: John
          created: true
      # array params and result
      - params:
          - [1, 2, 3]
        result: [1, 2, 3]
      # nested objects
      - params:
          - user:
              name: Jane
              address:
                city: NYC
                zip: '10001'
        result:
          success: true
      # mixed: multiple params of different types
      - params:
          - 123
          - name: test
          - ['a', 'b']
        result:
          userId: 123
          items: 2
```

---

## Class with Constructor

```typescript
// calculator.ts
export class Calculator {
	private readonly _value: number

	constructor(initial: number) {
		this._value = initial
	}

	add(n: number): number {
		this._value + n // simplified
		return this._value + n
	}

	reset(): number {
		return 0
	}
}
```

```yaml
# calculator.contract.yaml
subject: Calculator
module: ./calculator.js
subjectType: class
constructor:
  terms:
    - params: [0]
      result: { _value: 0 }
    - params: [10]
      result: { _value: 10 }
methods:
  add:
    terms:
      - constructorParams: [0]
        params: [5]
        result: 5
      - constructorParams: [10]
        params: [3]
        result: 13
  reset:
    terms:
      - constructorParams: [99]
        params: []
        result: 0
```

For class subjects, each method term needs `constructorParams` to instantiate the class, then `params` for the method call arguments.

---

## Multiple Methods (Object Export)

When the subject is an exported object with multiple functions, each key under `methods` maps to a property on that object:

```typescript
// string-ops.ts
export const StringOps = {
	upper: (s: string): string => s.toUpperCase(),
	lower: (s: string): string => s.toLowerCase(),
	capitalize: (s: string): string =>
		s
			.split(' ')
			.map((w) => w[0]?.toUpperCase() + w.slice(1))
			.join(' '),
}
```

```yaml
# string-ops.contract.yaml
subject: StringOps
module: ./string-ops.js
subjectType: function
methods:
  upper:
    terms:
      - params: ['hello']
        result: 'HELLO'
  lower:
    terms:
      - params: ['HELLO']
        result: 'hello'
  capitalize:
    terms:
      - params: ['hello world']
        result: 'Hello World'
```

---

## Contract-Level Mocks

Use `mock` at the top level to apply mocks from other contract files. The mocked dependencies are replaced for every method in the contract.

```typescript
// logger.ts
export const logger = {
	debug: (msg: string): void => {
		console.log(`[DEBUG] ${msg}`) // eslint-disable-line no-console
	},
}
```

```typescript
// order-service.ts
import { logger } from './logger'

export const orderService = {
	createOrder: (input: { item: string; price: number }) => {
		logger.debug(`Creating order: ${input.item}`)
		return { orderId: 'ord-123', status: 'confirmed' }
	},
}
```

```yaml
# order-service.contract.yaml
subject: orderService
module: ./order-service.js
subjectType: function
mock:
  - ./logger.contract.yaml
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

The `mock` entry loads `logger.contract.yaml` and uses its terms to create a mock. When `createOrder` calls `logger.debug(...)`, the mock intercepts the call and returns the value defined in `logger.contract.yaml` — no real logging happens.

---

## Method-Level Mocks

Use `mock` on a specific method to scope the mock to that method only:

```typescript
// email-service.ts
export const emailService = {
	send: (userId: number, body: string): { sent: boolean } => {
		// sends a real email
		return { sent: true }
	},
}
```

```typescript
// user-service-class.ts
import { emailService } from './email-service'

export class UserService {
	constructor(private db: string) {}

	findById(id: number) {
		return { id, name: 'John' }
	}

	sendEmail(userId: number, body: string) {
		return emailService.send(userId, body)
	}
}
```

```yaml
# user-service-class.contract.yaml
subject: UserService
module: ./user-service-class.js
subjectType: class
constructor:
  terms:
    - params: ['db-connection']
      result: {}
methods:
  findById:
    terms:
      - constructorParams: ['db-connection']
        params: [1]
        result:
          id: 1
          name: John
  sendEmail:
    mock:
      - ./email-service.contract.yaml
    terms:
      - constructorParams: ['db-connection']
        params: [1, 'Welcome!']
        result:
          sent: true
```

`findById` runs without mocks. `sendEmail` loads `email-service.contract.yaml` so the real email service is replaced.

---

## mockFunction — Mock Internal Methods

`mockFunction` replaces internal methods within the same subject. Useful when a method delegates to another method you want to control.

```typescript
// logger.ts
export const logger = {
	_message: (type: string, message: string): string => {
		return `${new Date().toISOString()}:${type.toUpperCase()}:${message}`
	},
	debug: (message: string): string => {
		const formatted = logger._message('DEBUG', message)
		console.log(formatted) // eslint-disable-line no-console
		return formatted
	},
}
```

```yaml
# logger.contract.yaml
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

When `debug` is tested, `_message` is mocked using its own contract terms — so `debug` calls `_message('DEBUG', 'disk full')` and gets back the value defined in `_message`'s terms, without executing the real `_message` implementation. The special value `CONSTRUCTOR` can be used to mock the class constructor itself.

---

## Error Objects — `new Error(...)`

Use `new Error(...)` syntax in `result` to assert the function returns an Error instance:

```typescript
// validator.ts
export const validate = (n: number): number => {
	if (n < 0) throw new Error('Invalid input')
	if (n === null) throw new Error('Value required')
	return n
}
```

```yaml
# validator.contract.yaml
subject: validate
module: ./validator.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [10]
        result: 10
      - params: [-1]
        result: new Error("Invalid input")
      # with custom error name
      - params: [null]
        result: new Error("Value required", { name: "ValidationError" })
```

---

## Date Objects — `new Date(...)`

```typescript
// date-util.ts
export const createDate = (iso: string): Date => new Date(iso)
```

```yaml
# date-util.contract.yaml
subject: createDate
module: ./date-util.js
subjectType: function
methods:
  __self__:
    terms:
      - params: ['2024-01-15']
        result: new Date("2024-01-15")
      - params: ['2024-06-20T10:30:00Z']
        result: new Date("2024-06-20T10:30:00Z")
```

---

## RegExp Objects — `new RegExp(...)`

```typescript
// pattern-util.ts
export const createPattern = (source: string, flags: string): RegExp =>
	new RegExp(source, flags)
```

```yaml
# pattern-util.contract.yaml
subject: createPattern
module: ./pattern-util.js
subjectType: function
methods:
  __self__:
    terms:
      - params: ['^[a-z]+$', 'gi']
        result: new RegExp("^[a-z]+$", "gi")
      - params: ['\\d+', '']
        result: new RegExp("\\d+")
```

---

## Promise.resolve and Promise.reject

The test runner handles promises automatically — resolved promises are awaited and the resolved value is compared; rejected promises are caught and the error is compared.

```typescript
// api.ts
export const fetchUser = async (id: number) => {
	if (id < 0) throw new Error('User not found')
	if (id === 999) return null
	if (id === 42) return 'ok'
	return { id, name: 'John' }
}
```

```yaml
# api.contract.yaml
subject: fetchUser
module: ./api.js
subjectType: function
methods:
  __self__:
    terms:
      # resolved promise — object
      - params: [1]
        result: Promise.resolve({ id: 1, name: "John" })
      # resolved promise — primitive
      - params: [42]
        result: Promise.resolve("ok")
      # resolved promise — null
      - params: [999]
        result: Promise.resolve(null)
      # rejected promise
      - params: [-1]
        result: Promise.reject(new Error("User not found"))
```

`Promise.resolve(...)` supports all value types inside: numbers, strings, booleans, null, undefined, objects, arrays, and `new Error(...)`.

---

## Function Stubs

Use `__fn__` for a no-op function or `__fn_identity__` for an identity function:

```typescript
// processor.ts
export const processWithCallback = (cb: (...args: unknown[]) => unknown): unknown => {
	const result = cb()
	return result === undefined ? null : result
}
```

```yaml
# processor.contract.yaml
subject: processWithCallback
module: ./processor.js
subjectType: function
methods:
  __self__:
    terms:
      # __fn__ — a function that returns undefined
      - params: [__fn__]
        result: null
      # __fn_identity__ — a function that returns its first argument
      - params: [__fn_identity__]
        result: null
```

---

## Class References — `__class_ref:Name__`

Resolve a class constructor from the global scope:

```typescript
// type-check.ts
export const isClass = (value: unknown): boolean => {
	return typeof value === 'function' && /^\s*class\s/.test(value.toString())
}
```

```yaml
# type-check.contract.yaml
subject: isClass
module: ./type-check.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [__class_ref:Date__]
        result: true
      - params: [__class_ref:Error__]
        result: true
      - params: [{}]
        result: false
```

---

## Import References — `__import__:path:property`

Dynamically import a module and access a property. Useful when a term needs to reference a real class or function from another module.

```typescript
// test-data.ts
export class MyClass {
	exec() {
		return 'real-execution'
	}
}
```

```typescript
// my-strategy.ts
export class MyStrategy {
	constructor(private moduleRef: unknown) {}

	exec(): unknown {
		return this.moduleRef
	}
}
```

```yaml
# my-strategy.contract.yaml
subject: MyStrategy
module: ./my-strategy.js
subjectType: class
constructor:
  terms:
    - params:
        - moduleRef: __import__:./test-data.js:MyClass
      result:
        _moduleRef: __import__:./test-data.js:MyClass
methods:
  exec:
    terms:
      - constructorParams:
          - moduleRef: __import__:./test-data.js:MyClass
        params: []
        result: __import__:./test-data.js:MyClass
```

Supports dot-notation for nested properties: `__import__:./module.js:obj.nested.prop`.

---

## Special Module Paths

| Module value | Resolves to |
|---|---|
| `./my-module.js` | Relative file import |
| `node:path` | Node.js built-in module |
| `global` | Global scope (`globalThis`) |

```typescript
// (no file needed — node:path is a built-in)
```

```yaml
# node-path.contract.yaml
subject: join
module: node:path
subjectType: function
methods:
  default:
    terms:
      - params: ['a', 'b']
        result: 'a/b'
```

```yaml
# date.contract.yaml
# Tests the global Date class directly
subject: Date
module: global
subjectType: class
constructor:
  terms:
    - params: ['2020-01-01']
      result: new Date("2020-01-01")
methods:
  toISOString:
    mockFunction: [CONSTRUCTOR]
    terms:
      - constructorParams: ['2020-01-01']
        params: []
        result: '2020-01-01T00:00:00.000Z'
```

---

## Mocking Global Classes (Date, etc.)

To mock a global class like `Date`, use `mockFunction: [CONSTRUCTOR]` on the method. This replaces the constructor within the test so that `new Date()` calls return your controlled values:

```typescript
// date-mock.ts
import type { ContractMock } from 'test-contractor'

const mock: ContractMock = () => {
	const OriginalDate = Date
	// @ts-expect-error mock
	globalThis.Date = class MockDate extends OriginalDate {
		constructor(...args: unknown[]) {
			if (args.length === 0) return new OriginalDate('2020-01-01')
			return new OriginalDate(...args as [string])
		}
	}
	return [() => { globalThis.Date = OriginalDate }]
}
export default mock
```

```yaml
# date.contract.yaml
subject: Date
module: global
subjectType: class
mock:
  - __import__:./date-mock.js
constructor:
  terms:
    - params: []
      result: new Date("2020-01-01")
    - params: ['2020-01-01']
      result: new Date("2020-01-01")
methods:
  toISOString:
    mockFunction: [CONSTRUCTOR]
    terms:
      - constructorParams: []
        params: []
        result: '2020-01-01T00:00:00.000Z'
```

The `mock` entry uses `__import__:./date-mock.js` to load the mock module above, which replaces `globalThis.Date` before the test runs and restores it afterward.

---

## Shorthand Syntax

For quick one-liner terms, use the arrow syntax:

```yaml
methods:
  __self__:
    terms:
      - "[1, 2] => 3"
      - "[0, 0] => 0"
      # with constructor params
      - "([10]); [5] => 15"
```

Format: `[params] => result` or `([constructorParams]); [params] => result`.

Values inside brackets are parsed as JSON arrays. The result is parsed as JSON.

---

## Full Reference

### Contract-Level Fields

| Field | Required | Description |
|---|---|---|
| `subject` | yes | Exported function or class name |
| `module` | yes | Import path (`./file.js`, `node:path`, `global`) |
| `subjectType` | yes | `function` or `class` |
| `mock` | no | List of contract paths or `__import__:` mocks |
| `constructor` | class | Constructor term definitions |
| `methods` | yes | Map of method names to terms |

### Method-Level Fields

| Field | Required | Description |
|---|---|---|
| `terms` | yes | Array of test cases |
| `mock` | no | Contract paths to mock for this method only |
| `mockFunction` | no | Internal method names to mock |

### Term Fields

| Field | Required | Description |
|---|---|---|
| `params` | yes | Arguments passed to the function/method |
| `result` | one of | Expected return value |
| `error` | one of | Expected thrown error message |
| `constructorParams` | class | Constructor args to instantiate the class |
| `returnFnParams` | no | Expected params for a returned function |

### Special Object Syntax

| Syntax | Resolves to |
|---|---|
| `new Error("msg")` | `Error` instance |
| `new Error("msg", { name: "Custom" })` | `Error` with custom `.name` |
| `new Date("2024-01-15")` | `Date` instance |
| `new RegExp("pattern", "flags")` | `RegExp` instance |
| `Promise.resolve(value)` | Resolved promise (awaited by runner) |
| `Promise.reject(new Error("msg"))` | Rejected promise (caught by runner) |
| `__fn__` | No-op function: `() => undefined` |
| `__fn_identity__` | Identity function: `(a) => a` |
| `__class_ref:Date__` | Class constructor from global scope |
| `__import__:./path.js:exportName` | Dynamically imported value |
