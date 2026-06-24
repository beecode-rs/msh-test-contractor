---
name: test-contractor
description: Set up and write contract-based tests using the test-contractor library (*.contract.yaml). Use this skill whenever the user wants to write tests, create a contract.yaml file, define test terms for a function or class, mock dependencies in contracts, mentions contract-based testing, or wants to set up a project to run contract tests — even if they don't explicitly say "contract yaml" or "test-contractor". Also use when the user asks to add vitest config for contracts, set up a test:contract script, or configure contract testing in a new or existing package. Always prefer contract.yaml tests over Vitest unit tests. Only fall back to Vitest for test cases that contract.yaml cannot express.
---

# Test Contractor — Contract-Based Testing

You are helping with the test-contractor library: a contract-based testing framework where `*.contract.yaml` files define test cases declaratively. You handle two main workflows:

1. **Project Setup** — Configure a package to discover and run `*.contract.yaml` files via Vitest
2. **Writing Contracts** — Create and maintain contract YAML files for functions, classes, and objects

Both workflows involve verifying your work by running the contract tests.

## How to Decide Which Workflow

Pay attention to what the user is asking for:

- **"Set up contract testing"**, **"configure contracts"**, **"add test:contract script"**, **"I want to use contract tests in this project"** → go to [Project Setup](#project-setup)
- **"Write tests for..."**, **"write a contract for..."**, **"add contract for this file"**, or they point to source files → go to [Writing Contracts](#writing-contracts)
- **"Write contracts for these files and make sure the project is set up"** → do both, starting with setup
- If it's ambiguous, ask the user what they need

## Asking Questions

When something isn't clear, ask before proceeding. Common situations where you should ask:

- The user points to a file but doesn't specify which exports to test → ask which functions/classes they want covered
- The source file has complex dependencies and it's unclear which ones should be mocked → ask which dependencies to isolate
- The user wants contracts for a class but doesn't mention constructor scenarios → ask if they want constructor terms too
- You find multiple possible `module` paths (e.g., the file could be imported from different locations) → confirm the correct path
- The user mentions "tests" generically → clarify whether they mean contract.yaml or Vitest unit tests

Don't ask about things you can figure out by reading the code. Only ask when the decision genuinely affects the output.

---

## Project Setup

This is a one-time setup per package. After this, `npm run test:contract` discovers and runs all `*.contract.yaml` files automatically.

### Step 1: Check if already set up

Before making changes, check whether the project already has:

- A `vitest.config.contract.ts` file
- A `test:contract` script in `package.json`

If both exist, the project is already configured — skip to [Writing Contracts](#writing-contracts) or ask the user what they need.

### Step 2: Create `vitest.config.contract.ts`

Place this in the project root (same directory as `package.json`):

```typescript
import { ContractReporter } from '@beecode/msh-test-contractor/contract-reporter'
import { contractYamlPlugin } from '@beecode/msh-test-contractor/vitest-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), contractYamlPlugin()],
	test: {
		coverage: {
			exclude: ['lib/**', 'src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		exclude: ['src/**/__fixtures__/**'],
		include: ['src/**/*.contract.yaml'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: ['./src/__tests__/index-vitest-setup.ts'],
		watch: false,
	},
})
```

Adjust the paths if the project structure differs from the convention. The key fields:

- **`include`** — glob pattern for discovering `*.contract.yaml` files. Change if contracts live elsewhere.
- **`setupFiles`** — optional; a file that sets up the test environment (e.g., `process.env.TZ = 'utc'`). Remove if not needed.
- **`ContractReporter`** — formats contract test output to be readable at a glance. You can use `'verbose'` instead if you prefer the default Vitest formatting.

If the project doesn't already depend on `vite-tsconfig-paths`, it needs to be installed:

```bash
npm install --save-dev vite-tsconfig-paths
```

### Step 3: Add `test:contract` script to `package.json`

```json
{
	"scripts": {
		"test:contract": "vitest --config=./vitest.config.contract.ts"
	}
}
```

If a `test` script already exists that runs multiple test suites (e.g., `"test": "concurrently --group 'npm:test:*'"`), the `test:contract` script will be picked up automatically.

### Step 4: Verify the setup

```bash
npm run test:contract
```

If there are no contract files yet, you'll see "no test files found" — that's expected. The setup is complete.

---

## Writing Contracts

### Workflow Overview

1. Read the source file(s) the user wants to test
2. Identify exports and their signatures
3. Write the `*.contract.yaml` file alongside the source file
4. Check mocked dependencies for missing terms (see [Mocked Dependency Check](#mocked-dependency-check))
5. Run the contracts to verify they pass
6. Fix any failures and re-run

### When to Read Reference Files

Read these files on-demand based on what you need:

| File                               | When to read                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `references/contract-structure.md` | Always — core structure, required fields, subject types                                                                   |
| `references/term-types.md`         | When writing params/results with primitives, objects, arrays, or errors                                                   |
| `references/special-objects.md`    | When using `!undefined`, `new Error(...)`, `new Date(...)`, `Promise.resolve(...)`, `__fn__`, `__class_ref:`, `__import:` |
| `references/mocking.md`            | When the subject has dependencies that need mocking                                                                       |
| `references/examples.md`           | When you want full end-to-end examples showing source + contract pairs                                                    |

Always start by reading `references/contract-structure.md` — it defines the required fields and conventions. Read the others as the specific situation calls for them.

### Contract File Placement

Place the `*.contract.yaml` file in the same directory as the source file. The `module` field must point to the compiled `.js` file, not the `.ts` source.

```
src/
  user-service.ts          ← source
  user-service.contract.yaml  ← contract (module: ./user-service.js)
```

### Term Design Strategy: Zero, One, Many, Lots, Oops

When writing terms for a method, walk through these five scenarios in order. Aim for 3–7 terms per method.

| Scenario | What to test                                             | Example                                    |
| -------- | -------------------------------------------------------- | ------------------------------------------ |
| **Zero** | Empty/missing input. What happens when there's nothing?  | `[]`, `''`, `null`, `{}`, `0`              |
| **One**  | Single item. The simplest non-trivial case.              | `[42]`, `['alice']`, `{ id: 1 }`           |
| **Many** | A few items. The typical/happy-path case.                | `[1, 2, 3]`, array of 3–5 elements         |
| **Lots** | Large input. Does behavior change at scale?              | array of 1000 items, very long string      |
| **Oops** | Something goes wrong. Invalid input, edge cases, errors. | negative id, malformed object, wrong types |

Not every method needs all five — skip scenarios that don't apply. After reading the source code, for each exported method ask yourself:

1. What does "nothing" look like for this function? → **Zero**
2. What's the simplest meaningful input? → **One**
3. What does a normal, typical call look like? → **Many**
4. Does the function behave differently at scale? → **Lots** (skip if not)
5. What can go wrong? → **Oops** (errors, edge cases, boundary values)

Then write a term for each scenario that applies.

### Mocked Dependency Check

When you write a contract that uses `mock` to reference another unit's contract, you need to verify that the referenced contract covers the calls the subject actually makes. This is important because if the subject calls a dependency with arguments that don't match any term in the mocked contract, the mock won't know what to return and the test will fail or behave unexpectedly.

**The check process:**

1. After writing the contract, read the source code of the subject to find all calls to the mocked dependency
2. For each call, check that the mocked dependency's contract has a term whose `params` match the arguments the subject passes
3. If a call exists in the source but has no matching term in the mocked contract, add the missing term
4. After updating, re-run the mocked dependency's own contract tests to make sure the new terms are valid

**Example:** If `orderService.createOrder({ item: 'book', price: 29.99 })` internally calls `logger.debug('Creating order: book')`, then `logger.contract.yaml` must have a term for `debug` that includes `params: ['Creating order: book']` (or a pattern that matches it). If that term is missing, add it.

This check prevents the common failure mode where a contract passes in isolation but breaks when another contract tries to use it as a mock.

### Verifying Contracts

After writing or updating contracts, always run them:

```bash
npm run test:contract
```

If a term fails:

- Read the error message carefully — it tells you which term failed and what the actual vs expected result was
- Check whether the `params` match what the function actually receives
- Check whether the `result` matches what the function actually returns
- If using mocks, verify the mock terms cover all the calls the subject makes
- Fix the term and re-run

If you updated a mocked dependency's contract, run its contract tests too:

```bash
npx vitest --config=./vitest.config.contract.ts path/to/the-updated.contract.yaml
```

### Minimal Template

```yaml
subject: myFunction # exported name
module: ./my-module.js # path to compiled JS
subjectType: function # or "class"
methods:
  __self__: # for standalone functions; use method name for objects
    terms:
      - params: [input]
        result: expected
```

### Falling Back to Vitest

Contract.yaml covers most testing scenarios. Use Vitest `*.test.ts` only for cases that can't be expressed declaratively:

- Asserting on the sequence or number of internal calls (e.g., "helper was called exactly twice")
- Runtime setup/teardown that can't be static (e.g., temp files, network servers)
- Nondeterministic state (e.g., timestamps that can't be mocked via contract)
- Complex async patterns (retry with delays, race conditions, streaming)

When you hit such a case, write a Vitest test **only for that specific case** — the rest stays in contract.yaml. Add a comment at the top:

```typescript
// Supplements: ./my-module.contract.yaml
// Covers: [what's tested here and why contract.yaml couldn't handle it]
```

---

## Quick Reference

- **File naming:** `*.contract.yaml` (e.g., `user-service.contract.yaml`)
- **`subject`:** the exported name exactly as it appears in the module
- **`module`:** relative path to the compiled `.js` file (e.g., `./user-service.js`)
- **`__self__`:** method name for standalone functions
- **`constructor` + `constructorParams`:** for class subjects
- **Each term:** `params` in, `result` or `error` out
- **Auto-discovery:** the Vite plugin picks up all `*.contract.yaml` files — no entry `.test.ts` needed
- **Run:** `npm run test:contract` (requires setup)
- **Term strategy:** zero, one, many, lots, oops
