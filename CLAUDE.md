# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Clean TypeScript Skill

This project uses the **clean-typescript** skill for Claude Code assistance. When working on this codebase, leverage the skill for creating services, strategies, unit tests with Vitest, and following established TypeScript patterns.

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
  - `contractor-test-runner.ts` - Discovers and runs `*.contract.ts` files

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

- `*.contract.ts` - Contract definition files (auto-discovered by test runner)
- `*.test.ts` - Unit tests
- `*.int.test.ts` - Integration tests (in `__tests__/` directories)

### Strategy Pattern

Extensively used throughout. Each domain (subject, mocker, mock, expect, spy) has:
- A strategy interface defining the contract
- Multiple strategy implementations for different scenarios
- A service that selects the appropriate strategy

### Contract File Structure

```typescript
import { contractFactory } from '#src/contract/contractor-factory'

export default contractFactory(
  { module: require('./my-module.js'), subjectName: 'myFunction' },
  {
    functionName: {
      terms: [
        { params: ['input'], result: 'expected output' },
      ],
      mock: () => [/* revert functions */], // optional external mocks
    },
  }
)
```

### Test Execution Flow

1. `contract.test.ts` calls `contractorTestRunner.dir('./src')`
2. Runner discovers all `*.contract.ts` files via glob
3. For each contract, runs each term as a test case
4. Mocks are applied, subject executed, result compared

## Code Style

- Imports: Use `#src` path aliases (`import { x } from '#src/util'`)
- Formatting: Tabs (size 2), 130 char max, single quotes, no semicolons
- ESLint config from `@beecode/msh-config`
