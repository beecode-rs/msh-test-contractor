# Full Examples

Each example shows the TypeScript source file and its corresponding contract YAML. Use these as starting points.

## Table of Contents

- [Simple Function](#simple-function)
- [Function with Error](#function-with-error)
- [Class with Constructor and Methods](#class-with-constructor-and-methods)
- [Object Export with Multiple Methods](#object-export-with-multiple-methods)
- [Function with Dependencies (Contract-Level Mock)](#function-with-dependencies)
- [Method-Level Mock](#method-level-mock)
- [mockFunction (Internal Method Mocking)](#mockfunction)
- [Async Function (Promises)](#async-function)
- [Global Class Mock (Date)](#global-class-mock)

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

---

## Function with Error

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

---

## Class with Constructor and Methods

```typescript
// calculator.ts
export class Calculator {
	private readonly _value: number

	constructor(initial: number) {
		this._value = initial
	}

	add(n: number): number {
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

---

## Object Export with Multiple Methods

```typescript
// string-ops.ts
export const StringOps = {
	upper: (s: string): string => s.toUpperCase(),
	lower: (s: string): string => s.toLowerCase(),
	capitalize: (s: string): string =>
		s.split(' ').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' '),
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

## Function with Dependencies

```typescript
// logger.ts
export const logger = {
	debug: (msg: string): void => {
		console.log(`[DEBUG] ${msg}`)
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

---

## Method-Level Mock

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

---

## mockFunction

```typescript
// logger.ts
export const logger = {
	_message: (type: string, message: string): string => {
		return `${new Date().toISOString()}:${type.toUpperCase()}:${message}`
	},
	debug: (message: string): string => {
		const formatted = logger._message('DEBUG', message)
		console.log(formatted)
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

---

## Async Function

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
      - params: [1]
        result: Promise.resolve({ id: 1, name: "John" })
      - params: [42]
        result: Promise.resolve("ok")
      - params: [999]
        result: Promise.resolve(null)
      - params: [-1]
        result: Promise.reject(new Error("User not found"))
```

---

## Global Class Mock

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
