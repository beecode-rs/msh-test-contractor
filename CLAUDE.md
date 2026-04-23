# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Clean TypeScript Skill

This project uses the **clean-typescript** skill for Claude Code assistance. When working on this codebase, leverage the skill for creating services, strategies, unit tests with Vitest and best practices from skill.

## Commands

```bash
# Build (ESM to dist/)
npm run build

# Build (CommonJS to lib/)
npm run build-cjs

# Run all tests (unit + integration + e2e)
npm run test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:int

# Run a single test file
npx vitest run src/path/to/file.test.ts

# Run tests in watch mode
npx vitest src/path/to/file.test.ts

# Lint
npm run lint

# Lint and fix
npm run lint-fix

# Type check without emit
npm run tsc-check

# Watch mode (build + clean)
npm run watch
```

## Architecture

This is a contract-based testing library inspired by "Integrated Tests Are A Scam" (J.B. Rainsberger). It creates provider/consumer contracts between units to make mocks reliable.

### Core Concepts

**Contract**: Defines the obligation of a function (provider) - given certain parameters, it returns a certain result. Contracts serve dual purpose:

1. Generate reliable mocks for consumer tests
2. Validate provider actually fulfills the contract

**Term**: A single input/output case within a contract (params → result)

### Key Modules

- `src/contract/` - Core contract runner and factory
  - `contractor.ts` - Main test runner that executes contract terms
  - `contractor-factory.ts` - Factory for creating type-safe contracts
  - `contractor-test-runner.ts` - Discovers and runs `*.contract.ts` and `*.contract.yaml` files

- `src/mocker/` - Mock generation from contracts
  - `mocker.ts` - Entry point with `mocker.contract()` and `mocker.function()`
  - Strategies: `MockerJestClassStrategy`, `MockerJestFunctionStrategy`, `MockerJestObjectStrategy`

- `src/subject/` - Subject execution strategies
  - `SubjectFunctionStrategy` - For plain function subjects
  - `SubjectClassFunctionStrategy` - For class method subjects
  - `SubjectConstructorStrategy` - For class constructor subjects

- `src/contract-mock/` - Mock injection during contract tests
- `src/jest-spy/` - Vitest spy implementations
- `src/contract/expect/` - Assertion strategies for contract terms

### File Naming Conventions

- `*.contract.yaml` - YAML contract definitions (auto-discovered by test runner)
- `*.contract.ts` - TypeScript contract definitions (auto-discovered by test runner)
- `*.test.ts` - Unit tests
- `*.int.test.ts` - Integration tests (in `__tests__/` directories)

### Strategy Pattern

Extensively used throughout. Each domain (subject, mocker, mock, expect, spy) has:

- A strategy interface defining the contract
- Multiple strategy implementations for different scenarios
- A service that selects the appropriate strategy

### Contract File Structure (YAML — preferred)

```yaml
# Function contract — test/simple-function.contract.yaml
subject: simpleFunction
module: ./simple-function.js
subjectType: function
methods:
  __self__:              # __self__ references the function itself
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: number is greater than ten
```

```yaml
# Class contract — test/dummy-class.contract.yaml
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
```

```yaml
# Contract with mocks — test/dummy-function.contract.yaml
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

```yaml
# Method with mockFunction — test/logger.contract.yaml
methods:
  _message:
    mock:
      - ./date-mock.yaml
    terms:
      - params: ['type', 'test-message']
        result: '2020-01-01T00:00:00.000Z:TYPE:test-message'
  debug:
    mockFunction: [_message]   # mock internal methods within same subject
    terms:
      - params: ['test-message']
        result: '2020-01-01T00:00:00.000Z:DEBUG:test-message'
```

#### YAML Contract Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `subject` | yes | Name of the exported function/class |
| `module` | yes | Relative path to the JS module |
| `subjectType` | yes | `function` or `class` |
| `constructor` | class only | Constructor term definitions |
| `methods` | yes | Map of method names to term definitions |
| `methods.__self__` | — | For function subjects, references the function itself |
| `mock` | no | List of contract YAML paths to use as mocks |
| `mockFunction` | no | List of internal method names to mock within same subject |
| Term: `params` | yes | Input parameters array |
| Term: `result` | one of | Expected return value |
| Term: `error` | one of | Expected thrown error (string or object) |
| Term: `constructorParams` | class | Constructor args for class method calls |

### Contract File Structure (TypeScript — legacy)

```typescript
import { contractFactory } from '#src/contract/contractor-factory'

export default contractFactory(
	{ module: require('./my-module.js'), subjectName: 'myFunction' },
	{
		functionName: {
			terms: [{ params: ['input'], result: 'expected output' }],
			mock: () => [
				/* revert functions */
			], // optional external mocks
		},
	}
)
```

### Test Execution Flow

1. `contract.test.ts` calls `contractorTestRunner.dir('./src')`
2. Runner discovers all `*.contract.ts` and `*.contract.yaml` files via glob
3. For each contract, runs each term as a test case
4. Mocks are applied, subject executed, result compared

## Code Style

- Imports: Use `#src` path aliases (`import { x } from '#src/util'`)
- Formatting: Tabs (size 2), 130 char max, single quotes, no semicolons
- ESLint config from `@beecode/msh-config`
