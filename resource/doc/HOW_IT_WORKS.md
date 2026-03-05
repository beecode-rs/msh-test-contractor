# How Test-Contractor Works

A comprehensive guide to understanding the contract-based testing library.

## Overview

**test-contractor** is a contract-based testing library inspired by J.B. Rainsberger's "Integrated Tests Are A Scam" philosophy. It creates **provider/consumer contracts** between units to make mocks reliable.

### Core Philosophy

Traditional mocks are brittle because they're manually configured and can drift from actual behavior. Test-contractor solves this by:

1. **Defining contracts** that specify exact input/output behavior
2. **Generating mocks from contracts** - mocks always match the contract
3. **Validating providers** - ensuring the actual implementation fulfills the contract

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Contract Definition                              │
│                    (*.contract.ts files)                            │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   contractorTestRunner                               │
│              (Discovers & runs contracts)                           │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       contractor                                     │
│                 (Main test executor)                                │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  1. SubjectService    → Select execution strategy           │   │
│  │  2. ContractMockService → Apply external mocks              │   │
│  │  3. mocker            → Create contract spy                 │   │
│  │  4. ContractExpectService → Assert results                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Concepts

### Contract

A **Contract** defines the obligation of a function (provider) - given certain parameters, it returns a certain result.

```typescript
interface Contract<M, SN, S> {
	module: M           // The module containing the subject
	subjectName: SN     // Name of the function/class to test
	mock?: ContractMock // Optional external mock setup
	fns: ContractFns<S> // Function definitions with terms
}
```

### Term

A **Term** is a single input/output case within a contract.

```typescript
interface ContractTerm {
	params: any[]              // Input parameters
	result: any                // Expected output (or Error)
	constructorParams?: any[]  // For class methods: which instance
	returnFnParams?: any[]     // For async: params for result function
}
```

---

## Module Structure

```
src/
├── contract/                    # Core contract execution
│   ├── contractor.ts            # Main test runner
│   ├── contractor-factory.ts    # Contract creation factory
│   ├── contractor-test-runner.ts # Discovers *.contract.ts files
│   ├── contractor-service.ts    # Test naming utilities
│   └── expect/                  # Assertion strategies
│       ├── contract-expect-service.ts
│       ├── contract-expect-any-equal-strategy.ts
│       ├── contract-expect-function-result-equal-strategy.ts
│       └── contract-expect-throw-error-strategy.ts
│
├── mocker/                      # Mock generation from contracts
│   ├── mocker.ts                # Entry point: mocker.contract(), mocker.function()
│   ├── mocker-service.ts        # Strategy selector
│   ├── mocker-vitest-function-strategy.ts
│   ├── mocker-vitest-class-strategy.ts
│   └── mocker-vitest-object-strategy.ts
│
├── subject/                     # Subject execution strategies
│   ├── subject-service.ts       # Strategy selector
│   ├── subject-function-strategy.ts
│   ├── subject-class-function-strategy.ts
│   └── subject-constructor-strategy.ts
│
├── contract-mock/               # External mock injection
│   ├── contract-mock-service.ts
│   ├── mock-vitest-strategy.ts
│   └── mock-vitest-empty-strategy.ts
│
├── vitest-spy/                  # Spy implementations
│   ├── vitest-spy-service.ts
│   ├── vitest-spy-function-strategy.ts
│   └── vitest-spy-class-function-strategy.ts
│
├── types/                       # TypeScript definitions
│   └── index.ts
│
└── enum/                        # Enums
    └── special-fn-name.ts       # CONSTRUCTOR, SELF
```

---

## Strategy Pattern Architecture

The library heavily uses the **Strategy Pattern** for flexibility:

### Mocker Strategies

| Strategy | Purpose | When Used |
|----------|---------|-----------|
| `MockerVitestFunctionStrategy` | Spies on a single function | Plain function subjects |
| `MockerVitestClassStrategy` | Spies on class, creates mock object | Class subjects |
| `MockerVitestObjectStrategy` | Spies on each object method | Object subjects |

### Subject Strategies

| Strategy | Purpose | When Used |
|----------|---------|-----------|
| `SubjectFunctionStrategy` | Execute plain function | Default for functions |
| `SubjectClassFunctionStrategy` | Execute class method | When `constructorParams` exist |
| `SubjectConstructorStrategy` | Instantiate class | When fnName is `CONSTRUCTOR` |

### Expect Strategies

| Strategy | Purpose | When Used |
|----------|---------|-----------|
| `ContractExpectAnyEqualStrategy` | Deep equality check | Default comparison |
| `ContractExpectFunctionResultEqualStrategy` | Async function comparison | When `returnFnParams` defined |
| `ContractExpectThrowErrorStrategy` | Error assertion | When result is an `Error` |

---

## Test Execution Flow

### 1. Discovery Phase

```typescript
contractorTestRunner.dir('./src')
```

- Scans directory for `*.contract.ts` files using glob
- Loads each contract file
- Schedules tests for each function/term

### 2. Contract Execution

For each contract function:

```
describe("functionName [contract]", () => {
  terms.forEach((term) => {
    it("input: [...] output: [...]", async () => {
      // 1. Apply module-level mocks (external deps)
      moduleMockStrategy.mock({ params: term.params })

      // 2. Apply function-level mocks
      functionMockStrategy.mock({ params: term.params })

      // 3. Get subject execution strategy
      const subjectStrategy = subjectService.strategyFromContractFunction(...)

      // 4. Execute and assert
      const expectStrategy = contractExpectService.fromTerm({ term })
      await expectStrategy.test(() => subjectStrategy.exec(term))

      // 5. Cleanup
      functionMockStrategy.restore()
      moduleMockStrategy.restore()
    })
  })
})
```

### 3. Mock Generation

When `mocker.contract(contract)` is called:

1. **Detect subject type** (function/class/object)
2. **Select appropriate strategy**
3. **Create Vitest spy** with implementation that:
   - Receives parameters
   - Finds matching term by comparing stringified params
   - Returns the expected result from that term

---

## Usage Examples

### Simple Function Contract

```typescript
// simple-function.ts
export const simpleFunction = (n: number): number => {
	if (n > 10) throw new Error('number is greater than ten')
	return n
}

// simple-function.contract.ts
import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import * as simpleFunction from './simple-function'

export default contractFactory(
	{ module: simpleFunction, subjectName: 'simpleFunction' },
	{
		[SpecialFnName.SELF]: {
			terms: [
				{ params: [1], result: 1 },
				{ params: [11], result: new Error('number is greater than ten') },
			],
		},
	}
)
```

### Class Contract

```typescript
// dummy-class.ts
export class DummyClass {
	constructor(private a: number, private b: number) {}

	add(c: number): number {
		return this.a + this.b + c
	}
}

// dummy-class.contract.ts
import { contractFactory } from '#src/contract/contractor-factory'
import { SpecialFnName } from '#src/enum/special-fn-name'
import * as dummyClass from './dummy-class'

export default contractFactory(
	{ module: dummyClass, subjectName: 'DummyClass' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{ params: [1, 2], result: { __a: 1, __b: 2 } },
			],
		},
		add: {
			terms: [
				{ constructorParams: [1, 2], params: [3], result: 6 },
				{ constructorParams: [5, 5], params: [10], result: 20 },
			],
		},
	}
)
```

### Contract with External Mocks

```typescript
// logger.contract.ts - Define contract for dependency
export default contractFactory(
	{ module: logger, subjectName: 'Logger' },
	{
		log: { terms: [{ params: ['message'], result: undefined }] },
	}
)

// service.contract.ts - Use dependency's contract for mocking
import { mocker } from '#src/mocker/mocker'
import loggerContract from './logger.contract'

export default contractFactory(
	{
		mock: () => [mocker.contract(loggerContract).mockRestore],
		module: service,
		subjectName: 'Service',
	},
	{
		process: {
			terms: [
				{ params: ['input'], result: 'processed: input' },
			],
		},
	}
)
```

---

## Special Function Names

Defined in `src/enum/special-fn-name.ts`:

| Name | Purpose |
|------|---------|
| `CONSTRUCTOR` | Indicates class constructor - used to test instantiation |
| `SELF` | Indicates the function should be called on itself (not as a method) |

---

## Mock Restoration

All mocks provide a `mockRestore()` function for cleanup:

```typescript
const { mockRestore, spy } = mocker.contract(myContract)

// After tests complete
mockRestore() // Restores original implementation
```

When using contracts with external mocks, restore functions are collected:

```typescript
mock: (): ContractMockRevertFns => {
	return [
		mocker.contract(dep1Contract).mockRestore,
		mocker.contract(dep2Contract).mockRestore,
	]
}
```

---

## Key Benefits

### 1. Reliable Mocks
- Mocks are generated from contracts, not manually configured
- Contracts define exact behavior
- Mocks always match the contract specification

### 2. Contract-First Development
- Define contract before implementation
- Contract serves as documentation
- Validates provider implementation

### 3. Type Safety
- Full TypeScript support with generics
- Type inference from contract definitions
- Compile-time validation

### 4. Flexible Subject Support
- Plain functions
- Class constructors
- Class methods with instance state
- Object methods

### 5. Integration with Vitest
- Uses native Vitest spy API
- Tests run as standard Vitest tests
- Works with existing test infrastructure

---

## Running Tests

```bash
# Run all contract tests via discovery
npx vitest run contract.test.ts

# Run specific contract file
npx vitest run my-module.contract.ts
```

In your test file:

```typescript
// contract.test.ts
import { contractorTestRunner } from '#src/contract/contractor-test-runner'

contractorTestRunner.dir('./src')
```

---

## Comparison with Traditional Mocking

| Aspect | Traditional Mocking | Test-Contractor |
|--------|---------------------|-----------------|
| Mock definition | Manual per-test | Contract-based |
| Mock accuracy | Can drift | Always matches contract |
| Documentation | Separate | Contract IS documentation |
| Refactoring | Update all mocks | Update contract once |
| Provider validation | Separate tests | Built-in |
