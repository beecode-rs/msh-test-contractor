---
name: write-contract-yaml
description: Write contract.yaml test files for the test-contractor library. Use this skill whenever the user wants to write contract tests, create a contract.yaml file, define test terms for a function or class, mock dependencies in contracts, or mentions contract-based testing — even if they don't explicitly say "contract yaml" or "test-contractor".
---

# Write Contract YAML Tests

You are helping write contract YAML test files for the test-contractor library. These files define test cases for functions and classes in a declarative YAML format.

## Workflow

1. Read the TypeScript/JavaScript source file the user wants to test
2. Identify exports (functions, classes, objects) and their signatures
3. Write a `*.contract.yaml` file alongside the source file
4. The `module` field must point to the compiled `.js` file, not the `.ts` source

## When to Read Reference Files

Read these files on-demand based on what you need:

| File | When to read |
|---|---|
| `references/contract-structure.md` | Always — core structure, required fields, subject types |
| `references/term-types.md` | When writing params/results with primitives, objects, arrays, or errors |
| `references/special-objects.md` | When using `new Error(...)`, `new Date(...)`, `Promise.resolve(...)`, `__fn__`, `__class_ref:`, `__import:` |
| `references/mocking.md` | When the subject has dependencies that need mocking |
| `references/examples.md` | When you want full end-to-end examples showing source + contract pairs |

## Quick Rules

- File naming: `*.contract.yaml` (e.g., `user-service.contract.yaml`)
- `subject`: the exported name exactly as it appears in the module
- `module`: relative path to the compiled `.js` file (e.g., `./user-service.js`)
- For plain functions: use `__self__` as the method name under `methods`
- For classes: add a `constructor` block and use `constructorParams` in method terms
- Each term is one test case — `params` in, `result` or `error` out
- The test runner auto-discovers all `*.contract.yaml` files via glob

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
