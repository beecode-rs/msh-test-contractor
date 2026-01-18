# Contract DSL Syntax Ideas

## Problem

Current contract definitions use nested JavaScript objects which become hard to read:

```typescript
const selfContract = contractFactory(
  { module: require('./src/util/type-util'), subjectName: 'typeUtil' },
  {
    isClass: {
      mock: (): ContractMockRevertFns => {
        return [mocker.function(selfContract, 'isObject').mockRestore, mocker.function(selfContract, 'isFunction').mockRestore]
      },
      terms: [
        { params: [Date], result: true },
        { params: [{}], result: false },
      ],
    },
    isFunction: {
      terms: [
        { params: [Date], result: true },
        { params: [{}], result: false },
        { params: [(): void => { return }], result: true },
      ],
    },
  }
)
```

**Pain points:**
- Deep nesting makes structure hard to follow
- Lots of visual noise (braces, commas, colons)
- `params` and `result` keywords are repetitive
- Hard to scan quickly

---

## Option 1: TSX with Custom JSX Pragma (Recommended)

Use `.contract.tsx` files with a custom JSX factory. No parser needed - TypeScript handles it.

### Setup

```typescript
// contract-jsx.ts
export const Fragment = Symbol('Fragment')

export function jsx(
  tag: string | Function,
  props: Record<string, any>,
  ...children: any[]
) {
  return { tag, props, children }
}

// tsconfig.contract.json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

### Contract Definition

```tsx
// type-util.contract.tsx
import { jsx, Fragment } from '#src/contract/contract-jsx'
import { Contract, Fn, Term, Param, Result, Mock } from '#src/contract/contract-elements'

export default (
  <Contract module="./src/util/type-util" subject="typeUtil">

    <Fn name="isClass">
      <Mock deps={['isObject', 'isFunction']} />
      <Term>
        <Param>{Date}</Param>
        <Result>{true}</Result>
      </Term>
      <Term>
        <Param>{{}}</Param>
        <Result>{false}</Result>
      </Term>
    </Fn>

    <Fn name="isFunction">
      <Term>
        <Param>{Date}</Param>
        <Result>{true}</Result>
      </Term>
      <Term>
        <Param>{{}}</Param>
        <Result>{false}</Result>
      </Term>
      <Term>
        <Param>{() => {}}</Param>
        <Result>{true}</Result>
      </Term>
    </Fn>

    <Fn name="isObject">
      <Term>
        <Param>{Date}</Param>
        <Result>{true}</Result>
      </Term>
      <Term>
        <Param>{{}}</Param>
        <Result>{true}</Result>
      </Term>
      <Term>
        <Param>{1}</Param>
        <Result>{false}</Result>
      </Term>
    </Fn>

  </Contract>
)
```

### Pros
- Full TypeScript support (types, autocomplete, error checking)
- No custom parser needed
- Familiar syntax for React developers
- Can embed any JS expression in `{}`
- IDE support works out of the box

### Cons
- Requires separate tsconfig or pragma comments
- JSX transforms add slight build complexity
- Some may find XML-like syntax verbose

---

## Option 2: Tagged Template Literals

Use template literals with a custom tag function. Pure JavaScript, no compilation step.

```typescript
// type-util.contract.ts
import { contract, fn, term } from '#src/contract/contract-dsl'

export default contract`
  module: ./src/util/type-util
  subject: typeUtil
`(
  fn('isClass')`
    mock: isObject, isFunction
  `(
    term`${Date} -> ${true}`,
    term`${{}} -> ${false}`,
  ),

  fn('isFunction')(
    term`${Date} -> ${true}`,
    term`${{}} -> ${false}`,
    term`${() => {}} -> ${true}`,
  ),

  fn('isObject')(
    term`${Date} -> ${true}`,
    term`${{}} -> ${true}`,
    term`${1} -> ${false}`,
  ),
)
```

### Alternative: Arrow Syntax

```typescript
export default contract('./src/util/type-util', 'typeUtil')(
  fn('isClass').mocks('isObject', 'isFunction')(
    term(Date, '→', true),
    term({}, '→', false),
  ),
  fn('isFunction')(
    term(Date, '→', true),
    term({}, '→', false),
    term(() => {}, '→', true),
  ),
)
```

### Pros
- No build step, pure JavaScript
- Very concise
- Can embed any JS value

### Cons
- Harder to type correctly in TypeScript
- Less IDE support for the DSL parts
- Template parsing can get tricky

---

## Option 3: Fluent Builder API

Use method chaining for a fluent, readable API.

```typescript
// type-util.contract.ts
import { contract } from '#src/contract/contract-builder'

export default contract('./src/util/type-util', 'typeUtil')
  .fn('isClass')
    .mocks('isObject', 'isFunction')
    .when(Date).returns(true)
    .when({}).returns(false)
  .fn('isFunction')
    .when(Date).returns(true)
    .when({}).returns(false)
    .when(() => {}).returns(true)
  .fn('isObject')
    .when(Date).returns(true)
    .when({}).returns(true)
    .when(1).returns(false)
  .build()
```

### Pros
- Excellent TypeScript support
- Very readable, almost like prose
- Great IDE autocomplete
- No special syntax/parsing

### Cons
- Method chaining can be fragile (easy to forget `.fn()` or `.build()`)
- Implementing the builder requires careful typing
- Indentation is manual/convention-based

---

## Option 4: Array-Based DSL

Use arrays with positional semantics for ultra-compact definitions.

```typescript
// type-util.contract.ts
import { contract, fn, t } from '#src/contract/contract-array'

export default contract('./src/util/type-util', 'typeUtil', [
  fn('isClass', { mocks: ['isObject', 'isFunction'] }, [
    t(Date, true),
    t({}, false),
  ]),
  fn('isFunction', [
    t(Date, true),
    t({}, false),
    t(() => {}, true),
  ]),
  fn('isObject', [
    t(Date, true),
    t({}, true),
    t(1, false),
  ]),
])
```

### Table Format Alternative

```typescript
export default contract('./src/util/type-util', 'typeUtil', {
  isClass: {
    mocks: ['isObject', 'isFunction'],
    terms: [
      //  input   output
      [   Date,   true   ],
      [   {},     false  ],
    ],
  },
  isFunction: [
    [Date,      true ],
    [{},        false],
    [() => {},  true ],
  ],
  isObject: [
    [Date, true ],
    [{},   true ],
    [1,    false],
  ],
})
```

### Pros
- Extremely compact
- Table format is scannable
- Minimal syntax overhead

### Cons
- Positional args are error-prone
- Less self-documenting
- Multiple params need nested arrays

---

## Option 5: YAML/JSON with JS Loader

Define structure in YAML, reference JS values separately.

```yaml
# type-util.contract.yaml
module: ./src/util/type-util
subject: typeUtil

functions:
  isClass:
    mocks: [isObject, isFunction]
    terms:
      - params: [ref:Date]
        result: true
      - params: [ref:emptyObject]
        result: false

  isFunction:
    terms:
      - params: [ref:Date]
        result: true
      - params: [ref:emptyObject]
        result: false
      - params: [ref:noopFn]
        result: true
```

```typescript
// type-util.contract.ts
import contract from './type-util.contract.yaml'
import { resolveRefs } from '#src/contract/yaml-loader'

export default resolveRefs(contract, {
  Date: Date,
  emptyObject: {},
  noopFn: () => {},
})
```

### Pros
- Very clean structure
- Easy to validate schema
- Non-programmers could edit

### Cons
- Two files per contract
- Can't inline JS expressions
- Requires YAML loader

---

## Option 6: Decorator-Based (Class Style)

Use decorators on a class to define contracts.

```typescript
// type-util.contract.ts
import { Contract, Fn, Term, Mocks } from '#src/contract/decorators'

@Contract('./src/util/type-util', 'typeUtil')
class TypeUtilContract {

  @Fn('isClass')
  @Mocks('isObject', 'isFunction')
  isClass = [
    Term(Date, true),
    Term({}, false),
  ]

  @Fn('isFunction')
  isFunction = [
    Term(Date, true),
    Term({}, false),
    Term(() => {}, true),
  ]

  @Fn('isObject')
  isObject = [
    Term(Date, true),
    Term({}, true),
    Term(1, false),
  ]
}

export default TypeUtilContract
```

### Pros
- Familiar pattern for Angular/NestJS developers
- Good IDE support
- Clear structure

### Cons
- Decorators require experimental flag
- More boilerplate (class, export)
- Decorators can't modify return types easily

---

## Recommendation

**Primary: TSX (Option 1)**

TSX offers the best balance of:
- Readability (XML-like structure with visual nesting)
- Full JavaScript expressiveness (embed any value)
- TypeScript type safety
- Zero custom parsing (uses standard JSX transform)
- Great IDE support

**Secondary: Fluent Builder (Option 3)**

If you want to avoid JSX:
- More "pure JavaScript" feel
- Excellent TypeScript integration
- Very readable once you learn the API

---

## Implementation Notes for TSX Approach

### Step 1: Create JSX Runtime

```typescript
// src/contract/jsx-runtime.ts
export type ContractElement = {
  type: string | Function
  props: Record<string, any>
  children: ContractElement[]
}

export function jsx(
  type: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
): ContractElement {
  return {
    type,
    props: props || {},
    children: children.flat(),
  }
}

export const jsxs = jsx
export const Fragment = 'Fragment'
```

### Step 2: Define Elements

```typescript
// src/contract/elements.ts
export const Contract = 'Contract'
export const Fn = 'Fn'
export const Term = 'Term'
export const Param = 'Param'
export const Result = 'Result'
export const Mock = 'Mock'
export const Throws = 'Throws'
```

### Step 3: Transformer

```typescript
// src/contract/transform.ts
export function transformContract(element: ContractElement) {
  // Walk the JSX tree and convert to the internal contract format
  // that contractFactory expects
}
```

### Step 4: TSConfig

```json
// tsconfig.contract.json (or use pragma in files)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "#src/contract"
  },
  "include": ["src/**/*.contract.tsx"]
}
```

---

## Custom Tags Suggestion

Based on your use case, here are the tags I'd recommend:

| Tag | Purpose | Attributes |
|-----|---------|------------|
| `<Contract>` | Root element | `module`, `subject` |
| `<Fn>` | Function definition | `name` |
| `<Term>` | Single test case | - |
| `<Params>` | Input parameters | - |
| `<P>` | Single parameter (shorthand) | - |
| `<Result>` | Expected output | - |
| `<Throws>` | Expected error | `type?` |
| `<Mock>` | Dependencies to mock | `deps` |
| `<Setup>` | Before each term | - |
| `<Teardown>` | After each term | - |

### Example with Full Tags

```tsx
<Contract module="./user-service" subject="userService">
  <Fn name="getUser">
    <Mock deps={['db', 'cache']} />

    <Term>
      <Params>
        <P>{123}</P>
        <P>{{ includeDeleted: false }}</P>
      </Params>
      <Result>{{ id: 123, name: 'John' }}</Result>
    </Term>

    <Term>
      <P>{-1}</P>
      <Throws type={NotFoundError}>User not found</Throws>
    </Term>
  </Fn>
</Contract>
```

---

## Next Steps

1. Prototype the JSX runtime (few hours of work)
2. Create the transformer that converts JSX tree to current format
3. Update test runner to handle `.contract.tsx` files
4. Migrate one existing contract as proof of concept
5. Document the new syntax
