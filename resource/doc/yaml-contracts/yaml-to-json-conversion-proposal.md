# YAML Contract Format Reference

## Overview

YAML contract files (`.contract.yaml`) are the user-facing format for defining contracts. They are parsed at runtime into the internal `YamlContractModel`, then loaded into the `AnyContract` type used by the test runner. This document describes the YAML format, the internal model, and how conversion works.

---

## Architecture

```
┌─────────────────────┐     ┌─────────────────────────┐     ┌──────────────────────┐
│ *.contract.yaml     │ ──► │  YamlParserContract     │ ──► │  YamlContractModel   │
│ (User writes)       │     │  (contract-parser.ts)   │     │  (yaml-contract-     │
└─────────────────────┘     └─────────────────────────┘     │   model.ts)          │
                                                            └──────────────────────┘
                                                                     │
                                                            ┌────────▼─────────────┐
                                                            │ YamlParserContract-  │
                                                            │ Loader               │
                                                            │ (contract-loader.ts) │
                                                            │ resolves modules,    │
                                                            │ loads mocks, creates │
                                                            │ AnyContract          │
                                                            └──────────────────────┘
                                                                     │
                                                            ┌────────▼─────────────┐
                                                            │  contractorTest-     │
                                                            │  Runner.dir()        │
                                                            │  discovers & runs    │
                                                            │  *.contract.yaml     │
                                                            └──────────────────────┘
```

### Implementation Location

```
src/business/
├── model/
│   └── yaml-contract-model.ts           # YamlContractModel type + validator
└── component/yaml-parser/
    ├── contract-parser.ts                # YAML → YamlContractModel parsing
    ├── contract-loader.ts                # File loading, module resolution, mock loading
    ├── shorthand-parser.ts               # Shorthand "=> " syntax parsing
    ├── special-object.ts                 # Dispatches special type parsing
    ├── error.ts                          # new Error("...") regex parsing
    ├── promise.ts                        # Promise.resolve/reject regex parsing
    ├── date.ts                           # new Date("...") regex parsing
    ├── regex.ts                          # new RegExp("...") regex parsing
    └── index.ts                          # Public exports
```

---

## YAML Contract Format (User-Facing)

### Function Contract

```yaml
subject: simpleFunction
module: ./simple-function.js
subjectType: function
methods:
  __self__:                              # __self__ references the function itself
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: number is greater than ten
```

### Class Contract

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
  externalAdd:
    mock:
      - ./dummy-function.contract.yaml
    terms:
      - constructorParams: [1, 2]
        params: [3]
        result: 6
```

### Function Contract with Mocks

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

### Contract with Mocked Internal Methods

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
    mockFunction: [_message]             # mock _message within same subject
    terms:
      - params: ['test-message']
        result: '2020-01-01T00:00:00.000Z:DEBUG:test-message'
```

---

## YAML Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `subject` | yes | Name of the exported function/class |
| `module` | yes | Relative path to the JS module (or `global`) |
| `subjectType` | inferred | `function` or `class`. Inferred if omitted. |
| `mock` | no | List of contract YAML paths to use as module-level mocks |
| `constructor` | class only | Object with `terms` array for constructor tests |
| `methods` | yes | Map of method names to function definitions |

### Method Definition Fields

| Field | Required | Description |
|-------|----------|-------------|
| `terms` | yes | Array of test cases (input/output pairs) |
| `mock` | no | List of contract YAML paths to use as per-method mocks |
| `mockFunction` | no | List of internal method names to mock within same subject |

### Term Fields

| Field | Required | Description |
|-------|----------|-------------|
| `params` | yes | Input parameters array |
| `result` | one of | Expected return value |
| `error` | one of | Expected thrown error (string or object) |
| `constructorParams` | class | Constructor arguments for class method calls |
| `returnFnParams` | no | Parameters for functions returned by the subject |

### Special Method Names

| Name | Meaning |
|------|---------|
| `__self__` | For function subjects, references the function itself (maps to `SELF` internally) |
| `CONSTRUCTOR` | Internal name for constructor terms (used in `mockFunction`) |

---

## Internal Model (YamlContractModel)

Defined in `src/business/model/yaml-contract-model.ts`:

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
  subjectName: string
  subjectType: YamlContractSubjectType
  module: string
  mock?: string[]
  fns: Record<string, YamlContractFunction>
}
```

The model is validated by `YamlContractModelValidator` which enforces:
- Every term must have either `result` or `error` (not both)
- `params`, `constructorParams`, and `returnFnParams` must be arrays when present
- `mock` and `mockFunction` arrays must contain non-empty strings
- `subjectName`, `module` must be non-empty strings
- `subjectType` must be `'function'` or `'class'`
- `fns` must be an object with valid `YamlContractFunction` values

---

## Field Mapping: YAML to Model

| YAML Field | Model Field | Transformation |
|------------|-------------|----------------|
| `subject` | `subjectName` | Direct copy |
| `module` | `module` | Direct copy (path resolved at load time) |
| `subjectType` | `subjectType` | Inferred if omitted |
| `mock` | `mock` | Direct copy (singular, not plural) |
| `constructor` | `fns.CONSTRUCTOR` | Moved into `fns` object with key `CONSTRUCTOR` |
| `methods.__self__` | `fns.SELF` | `__self__` maps to `SELF` |
| `methods.<name>` | `fns.<name>` | Key names preserved as-is |

### Subject Type Inference

When `subjectType` is not explicitly set:
- `'class'` if a `constructor` section is present
- `'function'` otherwise

---

## Special Type Parsing (Post-Parse Regex)

The implementation does **not** use custom js-yaml tags. Instead, string values are checked against regex patterns after standard YAML parsing. This happens recursively on all term fields (`params`, `result`, `error`, `constructorParams`, `returnFnParams`).

### Error

```yaml
result: new Error("Something went wrong")
```

Pattern: `/^new Error\(\s*(['"`])(.*?)\1\s*(?:,\s*(\{[^}]+\}))?\s*\)$/`

Supports an optional options object for setting `error.name`:
```yaml
result: new Error("message", { name: "TypeError" })
```

### Date

```yaml
result: new Date("2020-01-01")
```

Pattern: `/^new Date\(\s*(['"`])(.*?)\1\s*\)$/`

### RegExp

```yaml
result: new RegExp("pattern", "flags")
```

Pattern: `/^new RegExp\(\s*(['"`])(.*?)\1\s*(?:,\s*(['"`])(.*?)\3\s*)?\)$/`

### Promise

```yaml
result: Promise.resolve({ id: 1 })
result: Promise.resolve("hello")
result: Promise.reject(new Error("Not found"))
```

Patterns:
- `/^Promise\.resolve\((.*)\)$/s`
- `/^Promise\.reject\((.*)\)$/s`

The inner value of `Promise.resolve`/`Promise.reject` is parsed as JSON-like (handles primitives, quoted strings, objects, arrays). `Promise.reject` with `new Error(...)` delegates to the error parser.

### Special Markers

| Marker | Result |
|--------|--------|
| `__fn__` | No-op function: `function () { return undefined }` |
| `__fn_identity__` | Identity function: `function (a) { return a }` |
| `__class_ref:ClassName__` | Constructor from `globalThis` (e.g. `__class_ref:Date__`) |
| `__import__:modulePath:property` | Dynamic import placeholder, resolved at load time |

The `__import__` marker is resolved by `YamlParserContractLoader` (not the parser). The loader imports the module and extracts the property using dot-notation paths (e.g., `__import__:./utils.js:helpers.formatDate`).

---

## Shorthand Syntax Parsing

Shorthand terms use a single-key object where the value is a string with `=>` arrow syntax:

```yaml
terms:
  - myMethod: "[1, 2] => 3"
  - add: "([1, 2]); [3] => 6"            # with constructorParams
```

Parsed by `ShorthandParser` using these patterns:
- Basic: `[params] => result`
- With constructor: `(constructorParams); [params] => result`

The `=>` is found at depth 0 (outside brackets, braces, and strings). Both `params` and `constructorParams` must be valid JSON arrays. The `result` must be valid JSON.

Converted to:
```typescript
{ params: [1, 2], result: 3 }
{ constructorParams: [1, 2], params: [3], result: 6 }
```

---

## Conversion Flow

### 1. Parse (contract-parser.ts)

`YamlParserContract.parseString` reads the raw YAML and produces a `YamlContractModel`:

1. Load YAML via `js-yaml`
2. Map `subject` to `subjectName`
3. Move `constructor.terms` into `fns.CONSTRUCTOR`
4. Map `methods` entries to `fns`, converting `__self__` to `SELF`
5. Infer `subjectType` if not set
6. Recursively apply special object parsing on all term values
7. Parse shorthand terms (single-key objects with `=>` strings)

### 2. Load (contract-loader.ts)

`YamlParserContractLoader.load` takes a parsed model and produces an `AnyContract`:

1. Resolve `module` path to actual module via dynamic import
2. Load mock contracts from `mock` paths (with circular reference detection)
3. Attach per-method mocks from `fn.mock` paths
4. Set up `mockFunction` mocks (mocking internal methods within same subject)
5. Resolve `__import__` placeholders in term values
6. Transform `YamlContractTerm` to `ContractTerm` (error field becomes result)
7. Return an `AnyContract` ready for the test runner

### 3. Run (contractor-test-runner.ts)

`contractorTestRunner.dir('./path')` discovers and executes contracts:

1. Glob for `**/*.contract.yaml` files (excluding `__fixtures__`)
2. For each file, load via `YamlParserContractLoader`
3. Wrap in a `describe` block named after `subjectName`
4. Run `contractor(contract, fnName)` for each function

---

## Complete Example

### Input: YAML Contract

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
  callClass:
    terms:
      - params: [1, 2, 3]
        result: 6
  errorIfMoreThenTen:
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: 'More then 10'
```

### Intermediate: YamlContractModel

```json
{
  "subjectName": "dummyFunction",
  "subjectType": "function",
  "module": "./dummy-function.js",
  "mock": ["./logger.contract.yaml", "./dummy-class.contract.yaml"],
  "fns": {
    "add": {
      "terms": [
        { "params": [1, 2], "result": 3 }
      ]
    },
    "callClass": {
      "terms": [
        { "params": [1, 2, 3], "result": 6 }
      ]
    },
    "errorIfMoreThenTen": {
      "terms": [
        { "params": [1], "result": 1 },
        { "params": [11], "error": "More then 10" }
      ]
    }
  }
}
```

### Output: AnyContract (at runtime)

The loader resolves the module, loads mocks, and converts error terms. Error values are transformed: the `error` field is removed and the Error object becomes the `result`:

```json
{
  "module": "[resolved module object]",
  "subjectName": "dummyFunction",
  "mock": "[function that sets up mocks and returns revert functions]",
  "fns": {
    "add": {
      "terms": [
        { "constructorParams": [], "params": [1, 2], "result": 3 }
      ]
    },
    "callClass": {
      "terms": [
        { "constructorParams": [], "params": [1, 2, 3], "result": 6 }
      ]
    },
    "errorIfMoreThenTen": {
      "terms": [
        { "constructorParams": [], "params": [1], "result": 1 },
        { "constructorParams": [], "params": [11], "result": "[Error: More then 10]" }
      ]
    }
  }
}
```

Key differences from the intermediate model:
- `module` is the actual imported module object, not a string path
- `mock` is a function (not an array of paths)
- `error` from terms is converted to `result` as an Error instance
- `constructorParams` defaults to `[]` when not specified
- Per-function `mock` entries become mock setup functions

---

## Test Runner API

```typescript
import { contractorTestRunner } from 'test-contractor'

// Discover and run all *.contract.yaml in a directory
await contractorTestRunner.dir('./src')

// Run a specific contract file
contractorTestRunner.file('./src/my-service.contract.yaml')

// Run an already-loaded contract
contractorTestRunner.contract(myAnyContract)
```

The `dir()` method uses glob to find `**/*.contract.yaml` files (excluding `__fixtures__` directories) and runs each one sequentially.

---

## Summary

| Aspect | YAML (Source) | Model (Intermediate) | AnyContract (Runtime) |
|--------|---------------|----------------------|-----------------------|
| **Purpose** | Human authoring | Validated data structure | Test execution |
| **Module** | Path string | Path string | Resolved module object |
| **Subject** | `subject` field | `subjectName` field | `subjectName` field |
| **Methods** | `methods` object | `fns` object | `fns` object |
| **Constructor** | `constructor` section | `fns.CONSTRUCTOR` | `fns.CONSTRUCTOR` |
| **Self** | `methods.__self__` | `fns.SELF` | `fns.SELF` |
| **Errors** | `error:` field on term | `error` field preserved | Converted to Error in `result` |
| **Special types** | TypeScript-like strings | Parsed to real objects | Real objects |
| **Mocks** | `mock:` (singular) | `mock: string[]` | `mock: ContractMock` function |
| **Mock functions** | `mockFunction: [name]` | `mockFunction: string[]` | Resolved to internal mocks |
