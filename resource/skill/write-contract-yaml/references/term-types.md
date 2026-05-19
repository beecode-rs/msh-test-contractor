# Term Types — Params and Results

## Primitives

All YAML native types work directly in `params` and `result`:

| Type | YAML Example |
|---|---|
| string | `'hello'` or `"hello"` |
| number | `42`, `3.14`, `-1` |
| boolean | `true` or `false` |
| null | `null` or `~` |

```yaml
terms:
  - params: ['hello']
    result: 'HELLO'
  - params: [42]
    result: 42
  - params: [true]
    result: false
  - params: [null]
    result: null
```

## Objects

Use native YAML mapping syntax. No need to quote keys or wrap in JSON.

```yaml
terms:
  - params:
      - name: John
        email: john@example.com
        roles:
          - admin
          - user
    result:
      id: 1
      name: John
      created: true
```

## Nested Objects

YAML nesting works naturally — indent with spaces (2 spaces is the project convention):

```yaml
terms:
  - params:
      - user:
          name: Jane
          address:
            city: NYC
            zip: '10001'
    result:
      success: true
```

Note: zip codes and other numeric-looking strings must be quoted (`'10001'`) to prevent YAML from interpreting them as integers.

## Arrays

Inline flow style or block style both work:

```yaml
terms:
  # inline
  - params:
      - [1, 2, 3]
    result: [1, 2, 3]
  # block
  - params:
      - tags:
          - read
          - write
          - delete
    result:
      tagCount: 3
```

## Multiple Params

Each element in `params` is one argument to the function:

```yaml
terms:
  - params:
      - 123                        # first arg: number
      - name: test                 # second arg: object
      - ['a', 'b']                 # third arg: array
    result:
      userId: 123
      items: 2
```

## Error Terms

Use `error` (not `result`) to assert the function throws. The value is matched against the thrown error's message:

```yaml
terms:
  - params: [10, 0]
    error: Division by zero
```

The error value can be a bare string or quoted — it matches the `Error.message` string.

## Mixing Types

Combine any of the above in a single `params` array:

```yaml
terms:
  - params:
      - "admin@example.com"         # string
      - action: create              # object
        scope: user
        permissions:
          - read
          - write
      - ["log", "audit"]            # array
    result:
      authorized: true
```
