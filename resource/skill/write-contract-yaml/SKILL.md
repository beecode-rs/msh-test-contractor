---
name: write-contract-yaml
description: Write contract.yaml test files for the test-contractor library. Use this skill whenever the user wants to write tests, create a contract.yaml file, define test terms for a function or class, mock dependencies in contracts, or mentions contract-based testing — even if they don't explicitly say "contract yaml" or "test-contractor". Always prefer contract.yaml tests over Vitest unit tests. Only fall back to Vitest for test cases that contract.yaml cannot express (e.g., complex async interactions, dynamic assertions, mocking internal call sequences). This skill covers all testing needs — start here, not with Vitest.
---

# Write Contract YAML Tests

You are helping write contract YAML test files for the test-contractor library. These files define test cases for functions and classes in a declarative YAML format.

## Core Principle: Contract.yaml First

Always start with `*.contract.yaml` files for testing. This is the preferred and primary way to test in this project. Vitest unit tests are a last resort — only write them for the specific test cases that contract.yaml cannot cover, not as a parallel test suite.

**Why contract.yaml is preferred:** Contract tests are declarative, self-documenting, and serve dual purpose — they validate the provider and generate reliable mocks for consumers. They enforce a clear separation between "what to test" and "how assertions work."

**When Vitest is needed (rare):**
- You need to assert on the sequence or number of internal calls (e.g., "function A called helper B exactly twice")
- The test requires runtime setup/teardown that can't be expressed as static params/results (e.g., writing to a temp file, then cleaning up)
- The expected result depends on nondeterministic runtime state (e.g., timestamps generated at call time that can't be mocked via contract)
- You need to test complex async patterns like retry logic with delays, race conditions, or streaming responses

When you encounter such a case, write a Vitest test **only for that specific case** — the rest of the method's terms still go in contract.yaml.

## Workflow

1. Read the TypeScript/JavaScript source file the user wants to test
2. Identify exports (functions, classes, objects) and their signatures
3. Write a `*.contract.yaml` file alongside the source file, covering as many test cases as possible
4. If any test cases cannot be expressed in contract.yaml, note them and write targeted Vitest unit tests for only those cases
5. The `module` field must point to the compiled `.js` file, not the `.ts` source

## When to Read Reference Files

Read these files on-demand based on what you need:

| File | When to read |
|---|---|
| `references/contract-structure.md` | Always — core structure, required fields, subject types |
| `references/term-types.md` | When writing params/results with primitives, objects, arrays, or errors |
| `references/special-objects.md` | When using `new Error(...)`, `new Date(...)`, `Promise.resolve(...)`, `__fn__`, `__class_ref:`, `__import:` |
| `references/mocking.md` | When the subject has dependencies that need mocking |
| `references/examples.md` | When you want full end-to-end examples showing source + contract pairs |

## Term Design Strategy: Zero, One, Many, Lots, Oops

When writing terms for a method, walk through these five scenarios in order. The goal is to cover the meaningful boundary conditions rather than exhaustively testing every input — aim for 3–7 terms per method.

| Scenario | What to test | Example |
|---|---|---|
| **Zero** | Empty/missing input. What happens when there's nothing? | `[]`, `''`, `null`, `{}`, `0` |
| **One** | Single item. The simplest non-trivial case. | `[42]`, `['alice']`, `{ id: 1 }` |
| **Many** | A few items. The typical/happy-path case. | `[1, 2, 3]`, array of 3–5 elements |
| **Lots** | Large input. Does behavior change at scale? | array of 1000 items, very long string |
| **Oops** | Something goes wrong. Invalid input, edge cases, errors. | negative id, malformed object, wrong types |

Not every method needs all five — skip scenarios that don't apply. A simple `add(a, b)` function doesn't have a "zero" or "lots" case, but it does have an "oops" (overflow, NaN). A `search(query)` function has all five: empty query, one result, page of results, thousands of results, and invalid query.

### Applying the strategy

After reading the source code, for each exported method ask yourself:

1. What does "nothing" look like for this function? → **Zero**
2. What's the simplest meaningful input? → **One**
3. What does a normal, typical call look like? → **Many**
4. Does the function behave differently at scale? → **Lots** (skip if not)
5. What can go wrong? → **Oops** (errors, edge cases, boundary values)

Then write a term for each scenario that applies.

## Test Runner Setup

Contract tests are executed through `contractorTestRunner`, imported from `#src/contract/contractor-test-runner.js`. The entry point is typically a `contract.test.ts` file at the project root:

```typescript
import { contractorTestRunner } from '#src/contract/contractor-test-runner.js'

// Run all *.contract.yaml files in a directory (recursive)
await contractorTestRunner.dir('./src')

// Run a single contract file
await contractorTestRunner.file('./src/my-module/my-module.contract.yaml')
```

### Two runner modes

| Method | Purpose | Behavior |
|--------|---------|----------|
| `dir(path)` | Run all contracts in a directory | Recursively globs for `*.contract.yaml` files, excludes `__fixtures__` directories |
| `file(path)` | Run one specific contract | Loads and runs a single `*.contract.yaml` file |

Use `dir` for full test suites and `file` for targeted debugging of a single contract.

## Falling Back to Vitest for Uncovered Cases

When you've exhausted what contract.yaml can express and still have test cases left, write a Vitest unit test file. The convention is to place it alongside the source file as `*.test.ts` (or in `__tests__/`).

The Vitest file should only contain the cases contract.yaml couldn't cover — not a duplicate of what's already in the contract. Add a comment at the top referencing the contract file so it's clear these are supplementary:

```typescript
// Supplements: ./my-module.contract.yaml
// Covers: [brief list of what's tested here and why contract.yaml couldn't handle it]

import { describe, it, expect, vi } from 'vitest'
import { myFunction } from './my-module.js'

describe('myFunction (cases not expressible in contract.yaml)', () => {
  it('calls helper exactly twice on retry', () => {
    // ...
  })
})
```

## Quick Rules

- File naming: `*.contract.yaml` (e.g., `user-service.contract.yaml`)
- `subject`: the exported name exactly as it appears in the module
- `module`: relative path to the compiled `.js` file (e.g., `./user-service.js`)
- For plain functions: use `__self__` as the method name under `methods`
- For classes: add a `constructor` block and use `constructorParams` in method terms
- Each term is one test case — `params` in, `result` or `error` out
- The test runner auto-discovers all `*.contract.yaml` files via glob
- Apply the **zero, one, many, lots, oops** strategy when designing terms

## Minimal Template

```yaml
subject: myFunction        # exported name
module: ./my-module.js     # path to compiled JS
subjectType: function      # or "class"
methods:
  __self__:                # use function name for object exports
    terms:
      - params: [input]
        result: expected
```
