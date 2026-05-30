# Contract YAML Format - Implementation Reference

This document describes the YAML contract format as it is currently implemented in `test-contractor`. It covers the file structure, all supported fields, special value markers, and the internal representation.

---

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
```

---

## Complete Schema

```yaml
# Module path (required) - relative path to JS module, or 'global' for globalThis
module: ./my-service

# Subject name: class or function exported from the module (required)
subject: MyService

# Subject type (required): 'function' or 'class'
# Inferred automatically: 'class' if constructor field exists, 'function' otherwise
subjectType: class

# Optional: Mock contracts to load at the contract level
mock:
  - ./dependency.contract.yaml
  - ./another.contract.yaml

# Optional: Constructor terms (for class subjects only)
constructor:
  - params: [config-string]
    result: {}

  - params: [db-connection, options]
    result:
      connected: true

# Required: Methods map
# For function subjects, use __self__ to test the function itself
methods:
  # Function subject: test the function directly
  __self__:
    terms:
      - params: [1]
        result: 1

  # Class method
  methodName:
    # Optional: Method-specific mock contracts
    mock:
      - ./service.contract.yaml

    # Optional: Internal method names to mock within same subject
    mockFunction:
      - _internalHelper

    # Required: Test terms
    terms:
      - "[param1, param2] => result"

  anotherMethod:
    terms:
      - params: [1, 2]
        result: 3
      - params: [-1]
        error: Invalid input
```

### Field Reference

| Field | Level | Required | Description |
|-------|-------|----------|-------------|
| `module` | contract | yes | Relative path to JS module, or `global` |
| `subject` | contract | yes | Name of the exported function/class (mapped to `subjectName` internally) |
| `subjectType` | contract | auto | `function` or `class`. Auto-inferred from presence of `constructor` |
| `mock` | contract | no | List of contract YAML paths to use as mocks |
| `constructor` | contract | no | Constructor term definitions (class subjects). Stored internally as `fns.CONSTRUCTOR` |
| `methods` | contract | yes | Map of method names to term definitions. Stored internally as `fns` |
| `methods.__self__` | methods | - | For function subjects, references the function itself. Stored internally as `fns.SELF` |
| `mock` | method | no | List of contract YAML paths to use as mocks for this specific method |
| `mockFunction` | method | no | List of internal method names to mock within the same subject |
| `terms` | method | yes | Array of test terms (input/output cases) |
| Term: `params` | term | no | Input parameters array |
| Term: `result` | term | one of | Expected return value |
| Term: `error` | term | one of | Expected thrown error (string or object) |
| Term: `constructorParams` | term | no | Constructor args for class method calls |
| Term: `returnFnParams` | term | no | Parameters to call the returned function with |

---

## Special Value Markers (Post-Parse String Transformation)

The parser recognizes TypeScript-style string patterns and transforms them into real JavaScript objects after YAML parsing. This is done by `special-object.ts`, which delegates to dedicated parsers. The transformation is recursive -- it applies to all string values in params, result, error, constructorParams, and returnFnParams, including within nested objects and arrays.

### Special Object Parsers

| String Pattern | JavaScript Result | Parser |
|----------------|-------------------|--------|
| `new Error("message")` | `Error` instance | `error.ts` |
| `new Error("message", { name: "CustomName" })` | `Error` with custom `.name` | `error.ts` |
| `Promise.resolve(value)` | Resolved `Promise` | `promise.ts` |
| `Promise.reject(new Error("msg"))` | Rejected `Promise` | `promise.ts` |
| `new Date("2024-01-15")` | `Date` instance | `date.ts` |
| `new RegExp("pattern", "flags")` | `RegExp` instance | `regex.ts` |

### Marker Tokens

| Token | JavaScript Result |
|-------|-------------------|
| `__fn__` | No-op function: `() => {}` |
| `__fn_identity__` | Identity function: `(x) => x` |
| `__class_ref:ClassName__` | Class reference from `globalThis` (e.g. `__class_ref:Date__` -> `Date`) |
| `__import__:modulePath:propertyName__` | Dynamically imported property (resolved at load time) |

### Error Pattern

```
new Error("message")
new Error('message')
new Error("message", { name: "CustomErrorName" })
```

The error parser uses the regex `/^new Error\(\s*(['"`])(.*?)\1\s*(?:,\s*(\{[^}]+\}))?\s*\)$/` and supports:
- Single, double, or backtick quotes
- Optional second argument with a `name` property for custom error names

### Promise Pattern

```
Promise.resolve(42)
Promise.resolve("hello")
Promise.resolve(null)
Promise.resolve(undefined)
Promise.resolve({ id: 1, name: "test" })
Promise.reject(new Error("failed"))
Promise.reject("error reason")
```

The promise parser uses:
- Resolve: `/^Promise\.resolve\((.*)\)$/s`
- Reject: `/^Promise\.reject\((.*)\)$/s`

Inner values are parsed as JSON-like (unquoted object keys are supported, single quotes are converted to double quotes).

### Date Pattern

```
new Date("2024-01-15")
new Date("2024-01-15T10:30:00Z")
new Date('2024-06-20')
```

Regex: `/^new Date\(\s*(['"`])(.*?)\1\s*\)$/`

Invalid dates are silently ignored (the string is left unchanged).

### RegExp Pattern

```
new RegExp("^[a-z]+$")
new RegExp("^[a-z]+$", "gi")
new RegExp('^test$', 'i')
```

Regex: `/^new RegExp\(\s*(['"`])(.*?)\1\s*(?:,\s*(['"`])(.*?)\3\s*)?\)$/`

Invalid regular expressions are silently ignored (the string is left unchanged).

### Usage in YAML

Special values can appear anywhere a string value is expected. They are quoted in YAML to ensure the parser receives them as strings for post-parse transformation:

```yaml
terms:
  # Error as result
  - params: [-1]
    result: 'new Error("Invalid ID")'

  # Error as thrown error
  - params: [-1]
    error: 'new Error("Invalid ID")'

  # Resolved promise as result
  - params: [1]
    result: 'Promise.resolve({ id: 1, name: "John" })'

  # Rejected promise as error
  - params: [999]
    error: 'Promise.reject(new Error("User not found"))'

  # Date and RegExp in params
  - params:
      - 'new Date("2024-01-15")'
      - 'new RegExp("^[a-z]+$", "gi")'
    result: true

  # No-op function as param
  - params:
      - __fn__
    result: ok

  # Class reference as param
  - params:
      - __class_ref:Date__
    result: true
```

---

## TypeScript Model Types

The internal representation after parsing, from `src/business/model/yaml-contract-model.ts`:

```typescript
export type YamlContractSubjectType = 'function' | 'class'

export type YamlContractTerm = {
  params?: unknown[]
  result?: unknown
  error?: unknown
  constructorParams?: unknown[]
  returnFnParams?: unknown[]
}

export type YamlContractFunction = {
  terms: YamlContractTerm[]
  mock?: string[]
  mockFunction?: string[]
}

export type YamlContractModel = {
  subjectName: string       // mapped from YAML 'subject'
  subjectType: YamlContractSubjectType
  module: string
  mock?: string[]
  fns: Record<string, YamlContractFunction>  // mapped from YAML 'methods'
}
```

### Key Field Mappings (YAML to Model)

| YAML Field | Model Field | Notes |
|------------|-------------|-------|
| `subject` | `subjectName` | Renamed during parsing |
| `methods` | `fns` | Renamed during parsing |
| `constructor` | `fns.CONSTRUCTOR` | Moved into fns with special key |
| `methods.__self__` | `fns.SELF` | Moved into fns with special key |
| `mock` | `mock` | Same at both contract and method level |

---

## error vs result on Terms

Each term must have either `result` or `error` (validated by `YamlContractModelValidator`):

- `result`: The expected return value. The test runner compares the actual return against this.
- `error`: The expected thrown error. The test runner catches the thrown value and compares. The `error` field supports:
  - A plain string: `error: Something went wrong` (converted to `new Error("Something went wrong")`)
  - A special object string: `error: 'new Error("Custom error")'` (parsed to an Error instance)
  - An object with `message`: `error: { message: "fail", name: "CustomError" }`
  - A promise: `error: 'Promise.reject(new Error("async fail"))'`

---

## mockFunction (Intra-Subject Mocking)

The `mockFunction` field on a method definition allows mocking other methods within the same subject. This is useful for testing methods that depend on internal helpers:

```yaml
subject: logger
module: ./logger.js
subjectType: function
methods:
  _message:
    mock:
      - ./date-mock.yaml
    terms:
      - params: ['type', 'test-message']
        result: '2020-01-01T00:00:00.000Z:TYPE:test-message'
  debug:
    mockFunction: [_message]
    terms:
      - params: ['test-message']
        result: '2020-01-01T00:00:00.000Z:DEBUG:test-message'
```

When `debug` is tested, the `_message` method of the same subject is mocked according to its own contract terms. A method cannot mock itself via `mockFunction`.

---

## __self__ Convention for Function Subjects

Function subjects use `methods.__self__` to define terms for the function itself. This is because the `methods` map is the standard location for all callable members:

```yaml
subject: simpleFunction
module: ./simple-function.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: number is greater than ten
```

Internally, `__self__` is mapped to the special key `SELF` in the model's `fns` record.

---

## __import__ Dynamic Import Marker

The `__import__:modulePath:propertyName` marker allows referencing values from external modules:

```yaml
terms:
  - params:
      - __import__:./constants.js:MAX_VALUE
    result: 100
```

This is resolved during contract loading (in `contract-loader.ts`). The path is resolved relative to the contract file. Nested properties are supported with dot notation: `__import__:./config.js:database.host`.

The `mock` field also supports `__import__:` prefixed paths to load mock functions from external modules:

```yaml
mock:
  - __import__:./my-mock-function.js
```

In this case, the referenced module must export a default function that returns an array of revert functions.

---

## Full Examples

### Simple Function Contract

```yaml
subject: simpleFunction
module: ./simple-function.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: number is greater than ten
```

### Class with Constructor and Methods

```yaml
subject: DummyClass
module: ./dummy-class.js
subjectType: class
constructor:
  terms:
    - params: [1, 2]
      result: { __a: 1, __b: 2 }
methods:
  add:
    terms:
      - constructorParams: [1, 2]
        params: [3]
        result: 6
  sub:
    terms:
      - constructorParams: [1, 2]
        params: [1]
        result: 2
```

### Function with Dependencies (Contract-Level Mock)

```yaml
subject: dummyFunction
module: ./dummy-function.js
subjectType: function
mock:
  - ./logger.contract.yaml
  - ./dummy-class.contract.yaml
methods:
  add:
    terms:
      - params: [1, 2]
        result: 3
  errorIfMoreThenTen:
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: 'More then 10'
```

### Method-Level Mock and mockFunction

```yaml
subject: logger
module: ./logger.js
subjectType: function
methods:
  _message:
    mock:
      - ./date-mock.yaml
    terms:
      - params: ['type', 'test-message']
        result: '2020-01-01T00:00:00.000Z:TYPE:test-message'
  debug:
    mockFunction: [_message]
    terms:
      - params: ['test-message']
        result: '2020-01-01T00:00:00.000Z:DEBUG:test-message'
```

### Multi-Method Function Contract

```yaml
subject: calculator
module: ./calculator.js
subjectType: function
methods:
  add:
    terms:
      - params: [1, 2]
        result: 3
      - params: [0, 0]
        result: 0
      - params: [-1, 5]
        result: 4
  divide:
    terms:
      - params: [10, 2]
        result: 5
      - params: [10, 0]
        error: Division by zero
```

### Class with Constructor Terms

```yaml
subject: Calculator
module: ./calculator.js
subjectType: class
constructor:
  terms:
    - params: []
      result: {}
methods:
  add:
    terms:
      - params: [2, 3]
        result: 5
      - params: [0, 0]
        result: 0
  multiply:
    terms:
      - params: [2, 3]
        result: 6
```

### Special Objects in Nested Structures

```yaml
subject: myService
module: ./my-service.js
subjectType: function
methods:
  complexOp:
    terms:
      - params:
          - error: 'new Error("nested error")'
            date: 'new Date("2024-06-01")'
        result: true
```

### Method with Per-Function Mock

```yaml
subject: DummyClass
module: ./dummy-class.js
subjectType: class
constructor:
  terms:
    - params: [1, 2]
      result: { __a: 1, __b: 2 }
methods:
  externalAdd:
    mock:
      - ./dummy-function.contract.yaml
    terms:
      - constructorParams: [1, 2]
        params: [3]
        result: 6
```

---

## Implementation Structure

The YAML parser lives at `src/business/component/yaml-parser/`:

```
src/business/component/yaml-parser/
  index.ts              # Public exports
  contract-parser.ts    # Parses YAML string/file to YamlContractModel
  contract-loader.ts    # Loads contract files, resolves mocks, creates AnyContract
  shorthand-parser.ts   # Shorthand "[params] => result" parsing
  special-object.ts     # Dispatches special string marker parsing
  error.ts              # Parses new Error("...") strings
  promise.ts            # Parses Promise.resolve/reject strings
  date.ts               # Parses new Date("...") strings
  regex.ts              # Parses new RegExp("...") strings
```

The model type definitions are at `src/business/model/yaml-contract-model.ts`.

Special function name enums are at `src/enum/special-fn-name.ts`:
- `CONSTRUCTOR` -- internal key for constructor terms
- `SELF` -- internal key for `__self__` method

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

### Special Value Syntax Reference

| Pattern | Result Type |
|---------|-------------|
| `new Error("msg")` | `Error` |
| `new Error("msg", { name: "N" })` | `Error` with `.name` |
| `Promise.resolve(val)` | Resolved `Promise` |
| `Promise.reject(err)` | Rejected `Promise` |
| `new Date("iso")` | `Date` |
| `new RegExp("p", "f")` | `RegExp` |
| `__fn__` | `() => undefined` |
| `__fn_identity__` | `(x) => x` |
| `__class_ref:Name__` | Class from `globalThis` |
| `__import__:path:prop` | Dynamic import |

This format provides:
- **Flexibility**: Choose the syntax that fits each case
- **Readability**: Native YAML for complex objects, shorthand for simple
- **Type Safety**: Full TypeScript type definitions with validation
- **Familiarity**: Uses TypeScript syntax for special types (`new Error("msg")`, `Promise.resolve(value)`)
