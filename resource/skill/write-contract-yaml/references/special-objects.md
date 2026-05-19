# Special Object Syntax

When `params` or `result` contain values that can't be expressed as plain YAML (Error instances, Date objects, Promises, etc.), use the special syntax patterns below. These are parsed at load time and converted to real JavaScript objects.

## Error — `new Error(...)`

Creates a real `Error` instance. Supports an optional `{ name: "..." }` second argument for custom error names.

```yaml
result: new Error("Invalid input")
result: new Error("Value required", { name: "ValidationError" })
```

Can appear in `params` too:

```yaml
params:
  - new Error("Input validation failed")
```

## Date — `new Date(...)`

Creates a real `Date` instance from an ISO date string.

```yaml
result: new Date("2024-01-15")
result: new Date("2024-06-20T10:30:00Z")
```

## RegExp — `new RegExp(...)`

Creates a real `RegExp` instance. Flags are optional.

```yaml
result: new RegExp("^[a-z]+$", "gi")
result: new RegExp("\\d+")
```

## Promise.resolve(...)

The test runner awaits the promise and compares the resolved value. Inner value types: numbers, strings, booleans, null, undefined, objects, arrays, and `new Error(...)`.

```yaml
result: Promise.resolve({ id: 1, name: "John" })
result: Promise.resolve("ok")
result: Promise.resolve(null)
result: Promise.resolve(true)
result: Promise.resolve(new Error("wrapped"))
```

## Promise.reject(...)

The test runner catches the rejection and compares the error. Non-Error values are wrapped with `new Error(String(value))`.

```yaml
result: Promise.reject(new Error("User not found"))
result: Promise.reject("error reason")
```

## Function Stubs

| Syntax | Behavior |
|---|---|
| `__fn__` | No-op: `() => undefined` |
| `__fn_identity__` | Identity: `(a) => a` |

```yaml
params: [__fn__]            # passes a function that returns undefined
params: [__fn_identity__]   # passes a function that returns its first arg
```

## Class Reference — `__class_ref:Name__`

Resolves a class constructor from `globalThis`. Useful when a param must be a class (not an instance).

```yaml
params: [__class_ref:Date__]    # the Date class itself
params: [__class_ref:Error__]   # the Error class itself
```

## Import Reference — `__import__:path:property`

Dynamically imports a module and accesses a property. Supports dot-notation for nested access. Returns a placeholder resolved at load time.

```yaml
result: __import__:./test-data.js:MyClass
result: __import__:./module.js:obj.nested.prop
params:
  - __import__:./test-data.js:DummyClass
```

Can also be used in `mock` entries to load a mock module:

```yaml
mock:
  - __import__:./date-mock.js
```

## Special Function Names for mockFunction

| Value | What it mocks |
|---|---|
| `CONSTRUCTOR` | The class constructor itself (used for global class mocking like `Date`) |
| Any method name | That method on the same subject |
