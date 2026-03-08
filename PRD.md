# PRD: Special Object Parsers for YAML

## Introduction

Implement parsers for JavaScript objects that need special handling in YAML contract definitions. These parsers recognize JavaScript-style syntax strings (e.g., `new Error("msg")`, `Promise.resolve(value)`) and convert them to real JS objects at runtime.

## Goals

- Parse `new Error("message")` syntax to create Error objects
- Parse `Promise.resolve(value)` and `Promise.reject(error)` syntax to create Promise objects
- Parse `new Date("2024-01-15")` syntax to create Date objects
- Parse `new RegExp("pattern", "flags")` syntax to create RegExp objects
- Provide type guards for TypeScript type safety
- Ensure all parsers work correctly with unit test verification

## Success Metrics

- All 4 special object parsers correctly convert string syntax to real JS objects
- Unit tests pass for each parser
- Type guards correctly identify parsed objects
- Typecheck passes with no errors

## User Stories

### US-001: Create error-parser.ts for new Error() syntax

**Description:** As a developer, I need to parse `new Error("message")` strings in YAML contracts so that error results can be represented naturally.

**Acceptance Criteria:**
- [x] Create `src/yaml/types/error-parser.ts`
- [x] Parse `new Error("message")` string to create `Error` object
- [x] Parse `new Error("message", { name: "CustomError" })` for custom error names
- [x] Include `isErrorString()` type guard to detect error syntax
- [x] Include `ErrorParsed` TypeScript interface
- [x] Typecheck passes
- [x] Unit test: `new Error("message")` creates Error with correct message
- [x] Unit test: error properties are preserved (message, name)
- [x] Unit test: invalid syntax returns null or throws appropriate error
- [x] Unit tests pass

### US-002: Create promise-parser.ts for Promise.resolve/reject syntax

**Description:** As a developer, I need to parse `Promise.resolve()` and `Promise.reject()` strings in YAML contracts so that async results can be tested.

**Acceptance Criteria:**
- [x] Create `src/yaml/types/promise-parser.ts`
- [x] Parse `Promise.resolve({ id: 1 })` to create resolved promise
- [x] Parse `Promise.reject(new Error("failed"))` to create rejected promise
- [x] Support nested special objects (e.g., `Promise.reject(new Error("msg"))`)
- [x] Include `isPromiseResolveString()` and `isPromiseRejectString()` type guards
- [x] Include `PromiseResolveParsed` and `PromiseRejectParsed` TypeScript interfaces
- [x] Typecheck passes
- [x] Unit test: `Promise.resolve({ id: 1 })` creates resolved promise with value
- [x] Unit test: `Promise.reject(new Error("failed"))` creates rejected promise with Error
- [x] Unit test: nested error parsing works correctly
- [x] Unit tests pass

### US-003: Create date-parser.ts for new Date() syntax

**Description:** As a developer, I need to parse `new Date("2024-01-15")` strings in YAML contracts so that date-based tests can be represented.

**Acceptance Criteria:**
- [x] Create `src/yaml/types/date-parser.ts`
- [x] Parse `new Date("2024-01-15")` to create Date object
- [x] Parse `new Date("2024-01-15T10:30:00Z")` for ISO timestamps
- [x] Include `isDateString()` type guard
- [x] Include `DateParsed` TypeScript interface
- [x] Typecheck passes
- [x] Unit test: `new Date("2024-01-15")` creates correct Date object
- [x] Unit test: ISO timestamp format works correctly
- [x] Unit test: invalid date strings return null or throw appropriate error
- [x] Unit tests pass

### US-004: Create regex-parser.ts for new RegExp() syntax

**Description:** As a developer, I need to parse `new RegExp("pattern", "flags")` strings in YAML contracts so that pattern-matching tests can be represented.

**Acceptance Criteria:**
- [x] Create `src/yaml/types/regex-parser.ts`
- [x] Parse `new RegExp("^[a-z]+$", "gi")` to create RegExp object
- [x] Support both string and object syntax representations
- [x] Include `isRegexString()` type guard
- [x] Include `RegexParsed` TypeScript interface
- [x] Typecheck passes
- [x] Unit test: `new RegExp("^[a-z]+$", "gi")` creates RegExp with correct pattern and flags
- [x] Unit test: regex.exec() works correctly on created RegExp
- [x] Unit test: invalid regex patterns return null or throw appropriate error
- [x] Unit tests pass

### US-005: Create index.ts barrel export with unified parser

**Description:** As a developer, I need a central export file that combines all parsers so that the YAML parser can detect and convert special objects.

**Acceptance Criteria:**
- [x] Create `src/yaml/types/index.ts`
- [x] Export all parser files (error-parser, promise-parser, date-parser, regex-parser)
- [x] Create `parseSpecialObject(value: unknown)` function that detects and parses any special type
- [x] Export type guards and interfaces from all parsers
- [x] Typecheck passes
- [x] Unit test: `parseSpecialObject("new Error('msg')")` returns Error
- [x] Unit test: `parseSpecialObject("Promise.resolve(1)")` returns Promise
- [x] Unit test: regular values pass through unchanged
- [x] Unit tests pass

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Regex parsing complexity for nested objects | Use recursive parsing for nested special objects |
| Ambiguous syntax (e.g., string containing "new Error") | Only parse when string starts with known patterns |
| Stack trace loss in Error objects | Error objects created at parse time will have accurate stack |
| Promise timing in tests | Use async/await in tests, ensure promises settle before assertions |
| Date timezone issues | Always use ISO format, document timezone behavior |

## Dependencies

- Task 1 must be complete: `js-yaml` package installed
- Existing test-contractor TypeScript configuration

## Non-Goals

- No parsing for Map, Set, or other ES6 collections (future task)
- No parsing for custom class instances (only built-in types)
- No serialization back to string (only parsing from string to JS)
- No browser-specific handling (Node.js only)

## Technical Considerations

### Parsing Pattern

Each parser follows this pattern:
```typescript
// Detection regex
const ERROR_PATTERN = /^new Error\((.+)\)$/

// Parser function
export function parseError(value: unknown): Error | null {
  if (typeof value !== 'string') return null
  const match = value.match(ERROR_PATTERN)
  if (!match) return null
  // Extract and create Error
}

// Type guard
export function isErrorString(value: unknown): boolean {
  return typeof value === 'string' && ERROR_PATTERN.test(value)
}
```

### Unified Parser

```typescript
export function parseSpecialObject(value: unknown): unknown {
  if (typeof value !== 'string') return value

  // Try each parser in order
  const error = parseError(value)
  if (error) return error

  const promise = parsePromise(value)
  if (promise) return promise

  const date = parseDate(value)
  if (date) return date

  const regex = parseRegex(value)
  if (regex) return regex

  return value // Return unchanged if no match
}
```

### File Structure

```
src/yaml/types/
├── error-parser.ts      # new Error() parsing
├── promise-parser.ts    # Promise.resolve/reject parsing
├── date-parser.ts       # new Date() parsing
├── regex-parser.ts      # new RegExp() parsing
└── index.ts             # barrel export + unified parser
```

### Test File Location

Tests should be placed in `src/yaml/types/__tests__/` directory following the project convention.

### Usage in YAML Contracts

```yaml
methods:
  findById:
    terms:
      - params: [-1]
        result: new Error("Invalid ID")           # Error parsing
      - params: [1]
        result: Promise.resolve({ id: 1 })        # Promise resolve
      - params: [2]
        result: Promise.reject(new Error("NF"))   # Promise reject
      - params: [3]
        result: new Date("2024-01-15")            # Date parsing
      - params: [4]
        result: new RegExp("^[a-z]+$", "gi")      # RegExp parsing
```
