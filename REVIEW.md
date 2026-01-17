# Test-Contractor Project Review

## Executive Summary

The `test-contractor` package implements **contract-based testing** inspired by J B Rainsberger's "Integrated Tests Are A Scam" talk. The core premise is that integration tests are often unreliable because mocks can drift from actual implementations. This project solves that problem by creating a **single source of truth** (the contract) that defines both:

1. How a function should be mocked (consumer perspective)
2. What the actual function should return (provider perspective)

This ensures mocks always stay synchronized with real implementations.

---

## The Problem Being Solved

### Traditional Unit Testing Problem

```
Unit A calls Unit B
     │
     └──► Unit A test mocks Unit B's behavior
          (but mock might not match B's actual behavior)

Unit B is tested separately
          (but test assertions might not match what A expects)
```

**Result:** Tests pass individually, but integration fails because the mock doesn't reflect reality.

### Contract-Based Solution

```
Contract defines: "B.fn(x) → y"
     │
     ├──► Unit A test: uses contract to mock B (guaranteed correct mock)
     │
     └──► Unit B test: validates B.fn(x) actually returns y
```

**Result:** If either test fails, the contract is violated - mocks are always accurate.

---

## What's Done Well

### 1. Strong Architectural Foundation

The **Strategy Pattern** is used consistently and effectively throughout:

- `SubjectStrategy` - handles different invocation patterns (functions, classes, constructors)
- `ContractExpectStrategy` - handles different assertion types (equality, errors, function returns)
- `ContractMockStrategy` - handles mock setup/teardown
- `MockerStrategy` - handles different mock targets (functions, classes, objects)

This makes the codebase highly extensible without modifying existing code.

### 2. Type Safety

The generic types in `types/index.ts` provide compile-time safety:

```typescript
Contract<MODULE, SUBJECT_NAME, SUBJECT>
```

This ensures contracts reference actual module exports and function signatures.

### 3. Self-Dogfooding

The project tests itself using its own contract system. Every strategy class has a corresponding `.contract.ts` file. This is excellent validation of the concept.

### 4. Clean Separation of Concerns

```
contract/          → Test generation and running
contract-mock/     → Mock lifecycle management
subject/           → Subject invocation
jest-spy/          → Mock implementation generation
mocker/            → Public mocking API
```

### 5. Comprehensive Coverage of Subject Types

The system handles:
- Standalone functions
- Class methods (with constructor parameters)
- Constructors
- Getters (via `Object.getOwnPropertyDescriptor`)
- Functions that return functions (`returnFnParams`)
- Void functions
- Error throwing functions

### 6. Mock Restoration

The `ContractMockRevertFns` pattern ensures proper cleanup:

```typescript
mock: () => [() => { /* restore */ }]
```

This prevents test pollution between test cases.

---

## What Needs Improvement

### 1. Async/Promise Support (Critical Gap)

**Current state:** Not implemented (listed in TODO.md)

**Problem:** Most real-world code is async. Without Promise support:
- Can't test async functions properly
- Can't mock async dependencies
- Limits adoption in real projects

**Suggestion:** Add `ContractExpectAsyncStrategy` and async-aware mock implementations.

### 2. Parameter Matching via JSON.stringify

**Current implementation** (`object-util.ts:8`):
```typescript
JSON.stringify(param, Object.keys(param).sort())
```

**Problems:**
- Fails with circular references
- Loses type information (Date becomes string)
- Functions are ignored
- Symbol keys are ignored
- Undefined values behave differently in arrays vs objects
- Performance overhead for large objects

**Suggestion:** Use `fast-deep-equal` (already a dependency) for parameter matching instead of stringify comparison:

```typescript
import deepEqual from 'fast-deep-equal'
const foundTerm = terms.find(term => deepEqual(term.params, mockParams))
```

### 3. Error Comparison Only Checks Message

**Current implementation** (`contract-expect-throw-error-strategy.ts:17`):
```typescript
expect(() => fn()).toThrow(this._termResult.message)
```

**Problems:**
- Doesn't verify error type/class
- Doesn't check error properties (code, statusCode, etc.)
- Two different errors with same message pass

**Suggestion:** Support error class matching and property validation:

```typescript
terms: [{
  params: [invalidId],
  result: {
    errorClass: ValidationError,
    message: 'Invalid ID',
    code: 'INVALID_ID'
  }
}]
```

### 4. Limited Documentation and Examples

**Current state:** README.md is minimal (just the idea and install command)

**Problems:**
- No usage examples
- No explanation of contract structure
- No guide for common scenarios
- Hard for new users to adopt

**Suggestion:** Add comprehensive documentation:
- Quick start guide
- Contract definition examples
- Mocking examples
- Common patterns (async, classes, errors)
- Migration guide from traditional testing

### 5. Frozen Date in Global Contract

**Current implementation** (`date.contract.ts:16`):
```typescript
const mockedDate = new Date((options?.params ?? [])[0] ?? '2020-01-01')
```

**Problems:**
- Can't test time-dependent logic
- All date tests use same frozen time
- TODO.md mentions this but no solution

**Suggestion:** Allow date configuration per test or support time-travel utilities:

```typescript
dateContract.setMockDate('2025-06-15')
// or
terms: [{
  params: [],
  result: new Date('2025-06-15'),
  mockOptions: { now: '2025-06-15' }
}]
```

### 6. No Partial Matching Support

**Current state:** Parameters must match exactly.

**Problem:** Can't express "any string" or "object containing X".

**Suggestion:** Support matchers like Vitest's `expect.any()`:

```typescript
terms: [{
  params: [expect.any(String), { id: expect.any(Number) }],
  result: 'success'
}]
```

### 7. Contract Verbosity

**Current state:** Contracts can be verbose for simple cases.

**Example** (`subject-function-strategy.contract.ts`):
```typescript
const selfContract = contractFactory(
  { module: require('./subject-function-strategy'), subjectName: 'SubjectFunctionStrategy' },
  {
    [SpecialFnName.CONSTRUCTOR]: { terms: [...] },
    exec: { mock: () => [...], terms: [...] },
    fn: { terms: [...] }
  }
)
```

**Suggestion:** Provide shorthand syntax for common cases:

```typescript
// Shorthand for simple function
const contract = simpleContract(myModule, 'myFn', [
  [[1, 2], 3],      // [params, result]
  [[5, 5], 10],
])
```

### 8. No Test Isolation Guarantee

**Current state:** Tests share describe block, mocks rely on restore functions.

**Problem:** If a mock restore fails, subsequent tests may be polluted.

**Suggestion:** Use Vitest's `beforeEach`/`afterEach` for guaranteed isolation:

```typescript
afterEach(() => {
  vi.restoreAllMocks()
})
```

---

## Ideas for Solving Integration Test Removal

### Approach 1: Layered Contract Architecture

Define contracts at architectural boundaries:

```
┌─────────────────────────────────────────┐
│ HTTP Layer                              │
│ └─► Controller contracts (request/response)
├─────────────────────────────────────────┤
│ Business Layer                          │
│ └─► Service contracts (input/output)    │
├─────────────────────────────────────────┤
│ Data Layer                              │
│ └─► Repository contracts (query/result) │
└─────────────────────────────────────────┘
```

Each layer only needs contracts with its immediate dependencies.

### Approach 2: Contract Composition

Allow contracts to reference other contracts:

```typescript
const userServiceContract = contractFactory(
  { module: UserService, subjectName: 'UserService' },
  {
    getUser: {
      dependencies: [userRepositoryContract],  // Auto-mock
      terms: [{ params: [1], result: { id: 1, name: 'John' } }]
    }
  }
)
```

### Approach 3: Contract Generation from Types

Generate contracts from TypeScript interfaces:

```typescript
interface UserRepository {
  getUser(id: number): User | null
}

// Auto-generate contract skeleton
const contract = generateContract<UserRepository>({
  getUser: {
    terms: [
      { params: [1], result: { id: 1, name: 'John' } },
      { params: [999], result: null }
    ]
  }
})
```

### Approach 4: Contract Validation at Build Time

Add a build step that validates all contracts are satisfied:

```bash
npm run validate-contracts
# Checks that every contract term has:
# 1. A provider test that validates the implementation
# 2. At least one consumer that uses it
```

### Approach 5: Integration Test Generation

Use contracts to **generate** integration tests automatically:

```typescript
// From contracts, generate:
test('UserController → UserService → UserRepository integration', () => {
  // Wire up real implementations
  // Call top-level endpoint
  // Verify contracts are satisfied at each boundary
})
```

This provides integration coverage without manually writing integration tests.

### Approach 6: Contract Versioning

Add versioning to detect breaking changes:

```typescript
const contract = contractFactory(
  { module: UserService, subjectName: 'UserService', version: '2.0' },
  { /* ... */ }
)
```

CI can compare contract versions between branches to detect API changes.

---

## Specific Recommendations

### High Priority

1. **Add async/Promise support** - Required for real-world adoption
2. **Improve parameter matching** - Switch to `fast-deep-equal`
3. **Add documentation** - Examples, tutorials, API reference

### Medium Priority

4. **Flexible error assertions** - Error class and property matching
5. **Partial matching support** - Matchers for flexible contracts
6. **Date mock configuration** - Configurable frozen time

### Low Priority

7. **Contract shorthand syntax** - Reduce verbosity
8. **Contract composition** - Dependencies auto-mocking
9. **Build-time validation** - Contract completeness checks

---

## Conclusion

The `test-contractor` project has a **solid conceptual foundation** and **clean architecture**. The Strategy Pattern usage is exemplary, and the self-testing approach validates the concept well.

The main barriers to adoption are:
1. Missing async support
2. Limited documentation
3. Some edge cases in parameter/error matching

The core idea of replacing integration tests with contract-based unit tests is sound. With the improvements suggested above, particularly async support and better documentation, this could be a valuable tool for projects wanting to reduce reliance on slow, brittle integration tests while maintaining confidence in component interactions.

**The key insight is correct:** If contracts are the single source of truth for both mocking and validation, then passing unit tests guarantee integration correctness - without actually running integration tests.
