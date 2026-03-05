 	# Contract YAML Format - Final Proposal

## Overview

A flexible YAML format for defining test contracts that supports multiple syntaxes:
- **Shorthand**: Quick one-liners for simple cases
- **Full**: Structured YAML for complex objects
- **Mixed**: Combine formats within a single term

---

## Format Specification

### 1. Shorthand String Format

For simple, quick definitions:

```yaml
terms:
  # Simple primitives
  - "[1, 2] => 3"
  - "['hello'] => 'world'"

  # With constructor params (wrapped in parens, delimited by semicolon)
  - "([db-config]); [user-id] => user-object"
```

**Shorthand Syntax:**
- `[params] => result` - Basic form
- `([ctorParams]); [params] => result` - With constructor params
- Delimiter: `;` separates constructor from method params
- Constructor params are wrapped in `()` to distinguish from method params

### 2. Full Object Format (YAML Native)

For complex data structures - no escaping needed:

```yaml
terms:
  - params:
      - name: John
        email: john@example.com
        roles:
          - admin
          - user
    result:
      id: 1
      success: true

  # With constructor params
  - constructorParams:
      - host: localhost
        port: 5432
    params:
      - userId: 123
    result:
      user: null

  # Multiple params: simple type + complex object
  - params:
      - 123  # simple userId
      - name: John        # complex user object
        email: john@example.com
        preferences:
          theme: dark
          notifications: true
    result:
      created: true
      userId: 123

  # Multiple params: string + object + array
  - params:
      - "admin@example.com"  # simple string (admin email)
      - action: create       # complex action config
        scope: user
        permissions:
          - read
          - write
      - ["log", "audit"]     # simple array (tags)
    result:
      authorized: true

  # Constructor + method params: both mixed types
  - constructorParams:
      - "production"         # simple string (environment)
      - retries: 3           # complex config object
        timeout: 5000
    params:
      - 42                   # simple number (resourceId)
      - include:
          - metadata
          - relations
        exclude: ["internal"]
    result:
      resource: found
```

### 3. Block Scalar Format

For embedding JSON/expressions without escaping:

```yaml
terms:
  # Literal block (preserves newlines)
  - params:
      - |
        {
          "name": "John",
          "nested": {
            "deep": true
          }
        }
    result: "ok"

  # Folded block (single line)
  - params:
      - >
        { "complex": "object", "with": ["many", "fields"] }
    result: { success: true }
```

### 4. Mixed Format

Mix shorthand, native, and block scalars as needed:

```yaml
terms:
  # Shorthand for simple
  - "[1] => 2"

  # Native for params, shorthand for result
  - params:
      - name: John
        age: 30
        address:
          street: 123 Main St
          city: NYC
    result: "user-created"

  # Block scalar for params, native for result
  - params:
      - |
        { "query": "SELECT * FROM users WHERE id = ?", "params": [123] }
    result:
      rows:
        - id: 123
          name: John
      count: 1

  # Shorthand params, native result
  - params: [123]
    result:
      user:
        id: 123
        profile:
          name: John
          avatar: null

  # Multiple params: simple + complex (mixed formats)
  - params:
      - 123                        # simple (native)
      - |                          # complex (block scalar JSON)
        { "name": "John", "settings": { "theme": "dark" } }
    result: "ok"

  # Simple string + native object + simple array
  - params:
      - "user@example.com"         # simple string
      - role: admin                # complex object (native)
        permissions:
          - read
          - write
          - delete
      - ["tag1", "tag2"]           # simple array
    result:
      invited: true

  # Constructor (mixed) + params (mixed)
  - constructorParams:
      - "dev"                      # simple environment
      - host: localhost            # complex db config
        port: 5432
        ssl: true
    params:
      - 42                         # simple id
      - fields:                    # complex query options
          - id
          - name
          - email
        filters:
          status: active
    result:
      data: loaded
```

---

## Complete Schema

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json

# Module path (required)
module: ./my-service

# Subject name: class, function, or constant (required)
subject: MyService

# Optional: Subject type
# - class (default if methods defined)
# - function (default if only terms)
# - constant
subjectType: class

# Optional: Mock contracts to load
mocks:
  - ./dependency.contract.yaml
  - ./another.contract.yaml

# Optional: Constructor terms
constructor:
  - params: [config-string]
    result: {}

  - constructorParams: [db-connection]
    params: [options]
    result:
      connected: true

# Optional: Terms for function subjects
terms:
  - "[input] => output"

# Optional: Methods for class subjects
methods:
  methodName:
    # Optional: Method-specific mocks
    mocks:
      - ./service.contract.yaml

    # Optional: Setup function to run before terms
    setup: |
      (ctx) => {
        ctx.db = createTestDb()
        return () => ctx.db.close()
      }

    # Required: Test terms
    terms:
      - "[param1, param2] => result"

  anotherMethod:
    terms:
      - params: [1, 2]
        result: 3
```

---

## Custom YAML Tags (Runtime Objects)

To get real JavaScript objects at runtime (not just JSON strings), we use **custom YAML tags** with `js-yaml`:

### Available Tags

| Tag | YAML Example | JavaScript Result |
|-----|--------------|-------------------|
| `!error` | `!error "Message"` | `new Error("Message")` |
| `!resolve` | `!resolve { id: 1 }` | `Promise.resolve({ id: 1 })` |
| `!reject` | `!reject "Failed"` | `Promise.reject(new Error("Failed"))` |
| `!date` | `!date "2024-01-15"` | `new Date("2024-01-15")` |
| `!regex` | `!regex "/^[a-z]+$/gi"` | `new RegExp("^[a-z]+$", "gi")` |

### Usage Example

```yaml
terms:
  # Returns real Error object
  - params: [-1]
    result: !error "Invalid ID"

  # Returns real Promise
  - params: [1]
    result: !resolve { id: 1, name: "John" }

  # Returns rejected Promise
  - params: [999]
    result: !reject "User not found"
```

### Implementation

```typescript
import yaml from 'js-yaml'

const ErrorYamlType = new yaml.Type('!error', {
  kind: 'scalar',
  construct: (data: string) => new Error(data),
})

const PromiseResolveYamlType = new yaml.Type('!resolve', {
  kind: 'mapping', // or 'scalar' for simple values
  construct: (data) => Promise.resolve(data),
})

const CONTRACT_SCHEMA = yaml.DEFAULT_SCHEMA.extend({
  explicit: [ErrorYamlType, PromiseResolveYamlType, /* ... */],
})

// Parse with custom schema
const contract = yaml.load(yamlContent, { schema: CONTRACT_SCHEMA })

// Result is real JS objects
contract.methods.findById.terms[0].result // => Error object
contract.methods.findById.terms[1].result // => Promise object
```

---

## TypeScript Parameter Types

### Primitive Types

| Type | YAML Example | Description |
|------|--------------|-------------|
| `string` | `"hello"` or `'hello'` | Text values |
| `number` | `42` or `3.14` or `1e10` | Integers and floats |
| `boolean` | `true` or `false` | Boolean values |
| `null` | `null` or `~` | Null/undefined |
| `undefined` | `undefined` (or omit key) | Explicit undefined |

### Composite Types

| Type | YAML Example | Description |
|------|--------------|-------------|
| `array` | `[1, 2, 3]` | Array/list |
| `object` | `{ key: value }` | Plain object |

### Special Types

| Type | YAML Example | Description |
|------|--------------|-------------|
| `Error` | `new Error("message")` | Error instance (matches TypeScript syntax) |
| `Promise` | `Promise.resolve(value)` | Resolved promise (test runner awaits) |
| `Promise` | `Promise.reject(new Error("msg"))` | Rejected promise |

---

## Special Type Definitions

### Error Types

```yaml
# Simple error (matches TypeScript syntax)
result: new Error("Something went wrong")

# Error in params
params:
  - new Error("Input validation failed")
```

### Promise Types

```yaml
# Resolved promise - test runner awaits and compares the resolved value
result: !resolve { id: 1, name: "John" }

# Rejected promise - test runner catches and compares the error
result: !reject "User not found"

# Simple resolved value
result: !resolve "success"
```

> **Note:** We use custom YAML tags (`!resolve`, `!reject`, `!error`) instead of TypeScript syntax.
> This allows js-yaml to create real JavaScript objects at runtime.

---

## Full Examples

### Simple Function Contract

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json
module: ./utils/math
subject: add

terms:
  - "[1, 2] => 3"
  - "[-1, 1] => 0"
  - params: [0.1, 0.2]
    result: 0.3
```

### Function with Constructor Shorthand

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json
module: ./services/db-client
subject: DbClient
subjectType: class

constructor:
  - params: ["postgresql://localhost:5432/test"]
    result: {}

methods:
  query:
    terms:
      # Shorthand with constructor override
      - "(['sqlite://memory']); ['SELECT 1'] => [{ value: 1 }]"
      - "(['sqlite://memory']); ['SELECT * FROM users'] => []"
```

### Service with Dependencies

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json
module: ./services/user-service
subject: UserService
subjectType: class

mocks:
  - ./repositories/user-repo.contract.yaml
  - ./services/email.contract.yaml

constructor:
  - params:
      - db: mock-db
        logger: mock-logger
    result: {}

methods:
  findById:
    terms:
      - params: [1]
        result:
          id: 1
          name: John
          email: john@example.com

      - params: [999]
        result: null

      - params: [-1]
        result: new Error("Invalid ID")

  create:
    mocks:
      - ./validators/user-validator.contract.yaml
    terms:
      - params:
          - name: John
            email: john@example.com
        result:
          id: 1
          name: John
          created: true

      - params:
          - name: ""
        result: new Error("Name required")

  sendWelcomeEmail:
    terms:
      - params: [1]
        result:
          sent: true
          messageId: "msg-abc123"
```

### Complex Nested Objects

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json
module: ./services/order-service
subject: OrderService

methods:
  createOrder:
    terms:
      # Using native YAML - clean and readable
      - params:
          - userId: 123
            items:
              - productId: 1
                quantity: 2
                price: 9.99
              - productId: 5
                quantity: 1
                price: 19.99
            shipping:
              address:
                street: 123 Main St
                city: New York
                zip: "10001"
                country: USA
              method: express
            payment:
              method: credit_card
              token: tok_visa
        result:
          orderId: "ord-abc123"
          total: 39.97
          status: pending
          estimatedDelivery: "2024-01-15"

      # Mixed: JSON block for params, shorthand for result
      - params:
          - |
            {
              "userId": 456,
              "items": [{"productId": 10, "quantity": 1}],
              "rush": true
            }
        result: "order-created"

      # Error case
      - params:
          - userId: null
            items: []
        result: new Error("Invalid order")
```

### Async Operations

```yaml
$schema: https://your-domain.com/schemas/contract-v1.json
module: ./services/api-client
subject: ApiClient

methods:
  fetchUser:
    terms:
      # Resolved promise
      - params: [1]
        result: Promise.resolve({ id: 1, name: "John", email: "john@example.com" })

      # Rejected promise
      - params: [999]
        result: Promise.reject(new Error("User not found"))

  fetchAll:
    terms:
      # Resolved with array
      - params: []
        result:
          Promise.resolve:
            - id: 1
              name: John
            - id: 2
              name: Jane
```

---

## TypeScript Parser Interface

```typescript
// Core types
export type Primitive = string | number | boolean | null | undefined
export type JsonValue = Primitive | JsonValue[] | { [key: string]: JsonValue }

// Special type pattern detectors
export const ERROR_PATTERN = /^new Error\((.*)\)$/
export const PROMISE_RESOLVE_PATTERN = /^Promise\.resolve\((.*)\)$/
export const PROMISE_REJECT_PATTERN = /^Promise\.reject\((.*)\)$/

// Term definition
export interface Term {
  params?: unknown[]
  constructorParams?: unknown[]
  result: unknown
  setup?: string // Setup function body
  timeout?: number // Test timeout override
  skip?: boolean | string
  only?: boolean
}

// Shorthand parser regex patterns
// Basic: "[params] => result"
// With ctor: "([ctorParams]); [params] => result"
export const SHORTHAND_PATTERNS = {
  withConstructor: /^\(([^)]*)\);\s*\[([^\]]*)\]\s*=>\s*(.+)$/,
  basic: /^\[([^\]]*)\]\s*=>\s*(.+)$/,
} as const

// Method definition
export interface MethodDefinition {
  mocks?: string[]
  setup?: string
  terms: Term[]
}

// Contract definition
export interface ContractDefinition {
  $schema?: string
  module: string
  subject: string
  subjectType?: 'class' | 'function' | 'constant'
  mocks?: string[]
  constructor?: Term[]
  terms?: Term[]
  methods?: Record<string, MethodDefinition>
}
```

---

## Summary

| Format | Use Case | Example |
|--------|----------|---------|
| Shorthand | Simple values | `"[1, 2] => 3"` |
| Shorthand + ctor | With constructor | `"([db]); [userId] => user"` |
| Native YAML | Complex objects | `params: [{ name: John }]` |
| Literal Block `|` | JSON/expressions | `params: [\| { "a": 1 } \|]` |
| Folded Block `>` | Long single line | `params: [> { long object } >]` |
| Mixed | Best of both | `params: [complex], result: "simple"` |

### Shorthand Syntax Reference

```
[params] => result                    # Basic
([ctorParams]); [params] => result    # With constructor
```

- `;` - Delimiter between constructor and method params
- `()` - Wraps constructor params to distinguish from method params
- `[]` - Wraps the params array
- `=>` - Separates params from result

This format provides:
- **Flexibility**: Choose the syntax that fits each case
- **Readability**: Native YAML for complex objects, shorthand for simple
- **Type Safety**: Full TypeScript type definitions
- **Familiarity**: Uses TypeScript syntax for special types (`new Error("msg")`, `Promise.resolve(value)`)
