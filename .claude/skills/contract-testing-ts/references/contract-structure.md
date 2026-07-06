# Contract Structure

## Top-Level Fields

| Field | Required | Description |
|---|---|---|
| `subject` | yes | The exported function, class, or object name from the module |
| `module` | yes | Import path: `./file.js` (relative), `node:path` (built-in), or `global` |
| `subjectType` | yes | `function` or `class` |
| `mock` | no | Array of contract YAML paths to mock for all methods |
| `constructor` | class only | Term definitions for the class constructor |
| `methods` | yes | Map of method names to term definitions |

## subjectType

- **`function`** — plain function or object with function properties. Use `__self__` as the method name for a standalone function. Use the property name for object exports.
- **`class`** — a class with a constructor and prototype methods. Requires a `constructor` block and `constructorParams` in each method term.

## method name conventions

| Name | When to use |
|---|---|
| `__self__` | When the subject is a single exported function |
| `methodName` | Any named property on the subject object or class prototype |
| `default` | For default exports from Node built-ins (e.g., `node:path`) |

## Method-Level Fields

| Field | Required | Description |
|---|---|---|
| `terms` | yes | Array of test cases (each is one `it()` block) |
| `mock` | no | Contract paths to mock for this method only |
| `mockFunction` | no | Array of internal method names to mock within same subject |

## Term Fields

| Field | Required | Description |
|---|---|---|
| `params` | yes | Array of arguments passed to the function/method |
| `result` | one of | Expected return value |
| `error` | one of | Expected thrown error message (string) |
| `constructorParams` | class | Array of arguments to construct the class instance |
| `returnFnParams` | no | Expected params for a returned function |

Each term must have exactly one of `result` or `error`.

## Shorthand Syntax

For quick one-liner terms, use arrow notation as a string:

```yaml
terms:
  - "[1, 2] => 3"
  - "[0, 0] => 0"
  # with constructor params
  - "([10]); [5] => 15"
```

Format: `[params] => result` or `([constructorParams]); [params] => result`. Values are parsed as JSON.

## Module Path Variants

| Value | Resolves to |
|---|---|
| `./my-module.js` | Relative file import from the contract file location |
| `node:path` | Node.js built-in module |
| `global` | Global scope (`globalThis`) |
