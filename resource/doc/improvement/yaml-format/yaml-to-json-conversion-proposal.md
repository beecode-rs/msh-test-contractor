# YAML to JSON Conversion Proposal

## Overview

This proposal defines how to convert the user-friendly YAML contract format into a JSON structure compatible with the existing `test-contractor` library.

---

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│ *.contract.yaml │ ──► │  YAML Parser     │ ──► │  Contract JSON      │
│ (User writes)   │     │  (transforms)    │     │  (Library uses)     │
└─────────────────┘     └──────────────────┘     └─────────────────────┘
```

---

## Source YAML Format (User-Facing)

```yaml
module: ./my-service
subject: MyService
subjectType: class

mocks:
  - ./dependency.contract.yaml

constructor:
  - params: ["config-string"]
    result: {}

methods:
  findById:
    terms:
      - params: [1]
        result: { id: 1, name: "John" }
      - params: [999]
        result: null
```

---

## Target JSON Format (Library-Facing)

The JSON format must align with the existing TypeScript types:

```typescript
// From src/types/index.ts
type Contract = {
  module: MODULE           // The actual module (resolved at runtime)
  subjectName: string      // Name of the function/class
  mock?: ContractMock      // Module-level mock function
  fns: ContractFns<SUBJECT> // Functions to test
}

type ContractFunction = {
  terms: ContractTerm[]
  mock?: ContractMock
}

type ContractTerm = {
  params: any[]
  result: any
  constructorParams?: any[]
  returnFnParams?: any[]
}
```

### JSON Output Structure

```json
{
  "module": "./my-service",
  "subjectName": "MyService",
  "subjectType": "class",
  "mocks": ["./dependency.contract.yaml"],
  "fns": {
    "constructor": {
      "terms": [
        {
          "params": ["config-string"],
          "result": {}
        }
      ]
    },
    "findById": {
      "terms": [
        {
          "params": [1],
          "result": { "id": 1, "name": "John" }
        },
        {
          "params": [999],
          "result": null
        }
      ]
    }
  }
}
```

---

## Field Mapping

| YAML Field | JSON Field | Notes |
|------------|------------|-------|
| `module` | `module` | Direct copy (path resolved at runtime) |
| `subject` | `subjectName` | Renamed for clarity |
| `subjectType` | `subjectType` | Added for strategy selection |
| `mocks` | `mocks` | Array of mock contract paths |
| `constructor` | `fns.constructor` | Moved into `fns` object |
| `terms` (top-level) | `fns.default` | For function subjects |
| `methods` | `fns.*` | Each method becomes a key in `fns` |

---

## Conversion Rules

### 1. Shorthand String Parsing

Convert shorthand strings to structured objects:

```yaml
# YAML (shorthand)
terms:
  - "[1, 2] => 3"
  - "([db-config]); [userId] => user"
```

```json
// JSON
{
  "terms": [
    { "params": [1, 2], "result": 3 },
    { "constructorParams": ["db-config"], "params": ["userId"], "result": "user" }
  ]
}
```

**Regex Patterns:**
```typescript
// With constructor: "([ctorParams]); [params] => result"
const WITH_CTOR = /^\(([^)]*)\);\s*\[([^\]]*)\]\s*=>\s*(.+)$/

// Basic: "[params] => result"
const BASIC = /^\[([^\]]*)\]\s*=>\s*(.+)$/
```

### 2. Special Type Parsing

Parse TypeScript-style special types:

```yaml
# YAML
result: new Error("Something went wrong")
result: Promise.resolve({ id: 1 })
result: Promise.reject(new Error("Not found"))
```

```json
// JSON (preserved as strings for runtime parsing)
{
  "result": { "__type": "Error", "message": "Something went wrong" },
  "result": { "__type": "PromiseResolve", "value": { "id": 1 } },
  "result": { "__type": "PromiseReject", "error": { "__type": "Error", "message": "Not found" } }
}
```

### 3. Subject Type Inference

If not explicitly set:
- `class` - if `methods` or `constructor` defined
- `function` - if only top-level `terms` defined

### 4. Method to Fns Mapping

```yaml
# YAML
methods:
  findById:
    mocks: [...]
    setup: "..."
    terms: [...]
```

```json
// JSON
{
  "fns": {
    "findById": {
      "mocks": [...],
      "setup": "...",
      "terms": [...]
    }
  }
}
```

---

## Extended JSON Schema

To support all YAML features, the JSON format extends the base types:

```typescript
// Extended ContractTerm
type JsonContractTerm = {
  params: any[]
  result: any
  constructorParams?: any[]
  returnFnParams?: any[]
  setup?: string           // NEW: Setup function code
  timeout?: number         // NEW: Test timeout
  skip?: boolean | string  // NEW: Skip flag
  only?: boolean           // NEW: Run only this term
}

// Extended ContractFunction
type JsonContractFunction = {
  terms: JsonContractTerm[]
  mock?: ContractMock
  mocks?: string[]         // NEW: Mock contract paths
  setup?: string           // NEW: Method-level setup
}

// Extended Contract
type JsonContract = {
  module: string           // Path (resolved at runtime)
  subjectName: string
  subjectType?: 'class' | 'function' | 'constant'
  mock?: ContractMock
  mocks?: string[]         // NEW: Mock contract paths
  fns: Record<string, JsonContractFunction>
}
```

---

## Complete Example

### Input: YAML Contract

```yaml
$schema: https://example.com/schemas/contract-v1.json
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
        result: Promise.resolve({ sent: true, messageId: "msg-abc123" })
```

### Output: JSON Contract

```json
{
  "$schema": "https://example.com/schemas/contract-v1.json",
  "module": "./services/user-service",
  "subjectName": "UserService",
  "subjectType": "class",
  "mocks": [
    "./repositories/user-repo.contract.yaml",
    "./services/email.contract.yaml"
  ],
  "fns": {
    "constructor": {
      "terms": [
        {
          "params": [{ "db": "mock-db", "logger": "mock-logger" }],
          "result": {}
        }
      ]
    },
    "findById": {
      "terms": [
        {
          "params": [1],
          "result": { "id": 1, "name": "John", "email": "john@example.com" }
        },
        {
          "params": [999],
          "result": null
        },
        {
          "params": [-1],
          "result": { "__type": "Error", "message": "Invalid ID" }
        }
      ]
    },
    "create": {
      "mocks": ["./validators/user-validator.contract.yaml"],
      "terms": [
        {
          "params": [{ "name": "John", "email": "john@example.com" }],
          "result": { "id": 1, "name": "John", "created": true }
        },
        {
          "params": [{ "name": "" }],
          "result": { "__type": "Error", "message": "Name required" }
        }
      ]
    },
    "sendWelcomeEmail": {
      "terms": [
        {
          "params": [1],
          "result": {
            "__type": "PromiseResolve",
            "value": { "sent": true, "messageId": "msg-abc123" }
          }
        }
      ]
    }
  }
}
```

---

## Implementation Components

### 1. YAML Parser Module (`src/parser/`)

```
src/parser/
├── index.ts                    # Main export
├── yaml-parser.ts              # YAML file reader
├── shorthand-parser.ts         # Shorthand string parsing
├── special-type-parser.ts      # Error/Promise parsing
└── contract-transformer.ts     # YAML -> JSON transformation
```

### 2. Parser Interface

```typescript
interface YamlContractParser {
  // Parse YAML file to JSON contract
  parseFile(path: string): Promise<JsonContract>

  // Parse YAML string to JSON contract
  parseString(yaml: string): JsonContract

  // Parse multiple YAML files (for mocks resolution)
  parseFiles(paths: string[]): Promise<JsonContract[]>
}
```

### 3. Integration with Existing Library

```typescript
// New entry point for YAML-based testing
import { yamlContractor } from 'test-contractor/yaml'

// Auto-discovers and runs *.contract.yaml files
yamlContractor.testDir('./src')

// Or parse individual files
const contract = await yamlContractor.parse('./user.contract.yaml')
contractor(contract, 'findById')
```

---

## Special Type Encoding

### Error Objects

```typescript
// YAML
result: new Error("Message")

// JSON encoding
{ "__type": "Error", "message": "Message" }

// Runtime decoding
if (result.__type === 'Error') {
  return new Error(result.message)
}
```

### Promise Objects

```typescript
// YAML - Resolve
result: Promise.resolve({ id: 1 })

// JSON encoding
{ "__type": "PromiseResolve", "value": { "id": 1 } }

// YAML - Reject
result: Promise.reject(new Error("Failed"))

// JSON encoding
{ "__type": "PromiseReject", "error": { "__type": "Error", "message": "Failed" } }

// Runtime decoding
if (result.__type === 'PromiseResolve') {
  return Promise.resolve(result.value)
}
if (result.__type === 'PromiseReject') {
  return Promise.reject(new Error(result.error.message))
}
```

---

## Summary

| Aspect | YAML (Source) | JSON (Target) |
|--------|---------------|---------------|
| **Purpose** | Human-friendly authoring | Machine-readable, library-compatible |
| **Format** | Flexible (shorthand/native/block) | Structured JSON object |
| **Module** | Path string | Path string (resolved at runtime) |
| **Subject** | `subject` field | `subjectName` field |
| **Methods** | `methods` object | `fns` object |
| **Constructor** | `constructor` array | `fns.constructor` |
| **Special Types** | TypeScript syntax | Encoded with `__type` marker |
| **Shorthand** | `"[a, b] => c"` | `{ params: [a, b], result: c }` |

---

## Next Steps

1. **Implement YAML Parser** - Create `src/parser/` module
2. **Add Special Type Handling** - Error and Promise encoding/decoding
3. **Create JSON Schema** - Validate JSON output structure
4. **Update Test Runner** - Support `*.contract.yaml` discovery
5. **Add CLI Command** - `npx test-contractor yaml-to-json ./contract.yaml`
