<table>
  <tr>
    <td><img src="resource/image/logo-test-contractor.png" alt="msh-test-contractor logo" width="200" /></td>
    <td valign="top">

[![NPM](https://nodei.co/npm/@beecode/msh-test-contractor.png)](https://nodei.co/npm/@beecode/msh-test-contractor)
[![Build Status](https://beecode.semaphoreci.com/badges/msh-test-contractor/branches/main.svg?style=shields)](https://beecode.semaphoreci.com/projects/msh-test-contractor)
[![codecov](https://codecov.io/gh/beecode-rs/msh-test-contractor/branch/main/graph/badge.svg?token=wOOqEekQfv)](https://codecov.io/gh/beecode-rs/msh-test-contractor)
[![GitHub license](https://img.shields.io/github/license/beecode-rs/msh-test-contractor)](https://github.com/beecode-rs/msh-test-contractor/blob/main/LICENSE)
</td>
  </tr>
</table>

<!-- toc -->

- [msh-test-contractor](#msh-test-contractor)
  * [Idea](#idea)
  * [Features](#features)
  * [Install](#install)
  * [Quick Start](#quick-start)
    + [1. Write a contract (YAML)](#1-write-a-contract-yaml)
    + [2. Run contracts](#2-run-contracts)
    + [3. Use mocks in your own tests](#3-use-mocks-in-your-own-tests)
  * [YAML Contract Reference](#yaml-contract-reference)
    + [Function Contract](#function-contract)
    + [Class Contract](#class-contract)
    + [Contract with Mocks](#contract-with-mocks)
    + [Field Reference](#field-reference)
  * [API](#api)
    + [mocker](#mocker)
    + [contractor](#contractor)
    + [contractorTestRunner](#contractortestrunner)
  * [License](#license)

<!-- tocstop -->

# msh-test-contractor

## Idea

Inspired by [J.B. Rainsberger — Integrated Tests Are A Scam](https://vimeo.com/80533536). This tool makes unit tests more reliable by creating **contracts** between units (provider/consumer).

When writing unit tests, your unit usually makes a call outside of its boundaries, and you need to mock that call. With test-contractor you create a contract between the two units. This contract defines the obligation of the function (provider) — if certain parameters are passed to it, it will return a certain result. The contract then serves two purposes:

1. **Generate reliable mocks** for consumer tests
2. **Validate the provider** actually fulfills the contract

## Features

- **Contract-driven mocking** — mocks stay in sync with real behavior
- **Dual purpose** — validates providers and generates mocks for consumers
- **YAML-first contracts** — readable, reviewable in PRs, no code required
- **Vitest integration** — generates `describe`/`it` blocks automatically
- **Supports** — plain functions, classes, constructors, method mocking, internal mocking

## Install

```bash
npm i @beecode/msh-test-contractor
```

## Quick Start

### 1. Write a contract (YAML)

Create a `.contract.yaml` file next to your module:

```yaml
# math.contract.yaml
subject: add
module: ./math.js
subjectType: function
methods:
  __self__:
    terms:
      - params: [1, 2]
        result: 3
      - params: [10, 5]
        result: 15
```

### 2. Run contracts

Create a test file that discovers and runs all contracts:

```typescript
// contract.test.ts
import { contractorTestRunner } from '@beecode/msh-test-contractor/contract/contractor-test-runner.js'

await contractorTestRunner.dir('./src')
```

This discovers all `**/*.contract.yaml` files and runs each term as a Vitest test case.

### 3. Use mocks in your own tests

Use the contract to generate a Vitest spy for a dependency:

```typescript
import { mocker } from '@beecode/msh-test-contractor'
import myContract from './my-module.contract.yaml'

const { spy, mockRestore } = mocker.contract(myContract)

// spy is a vi.spyOn — use it in your tests
const result = myFunctionThatDependsOnMyModule()
expect(result).toBe('expected')

mockRestore() // restore after tests
```

## YAML Contract Reference

### Function Contract

```yaml
subject: simpleFunction
module: ./simple-function.js
subjectType: function
methods:
  __self__: # __self__ references the function itself
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: number is greater than ten
```

### Class Contract

```yaml
subject: Calculator
module: ./calculator.js
subjectType: class
constructor:
  terms:
    - params: [1, 2]
      result: { a: 1, b: 2 }
methods:
  add:
    terms:
      - constructorParams: [1, 2]
        params: [3]
        result: 6
  sub:
    terms:
      - constructorParams: [5, 3]
        params: [1]
        result: 1
```

### Contract with Mocks

```yaml
subject: dummyFunction
module: ./dummy-function.js
subjectType: function
mock:
  - ./logger.contract.yaml # mock external dependency
  - ./calculator.contract.yaml
methods:
  add:
    terms:
      - params: [1, 2]
        result: 3
  errorIfMoreThanTen:
    terms:
      - params: [1]
        result: 1
      - params: [11]
        error: 'More then 10'
```

Mock internal methods within the same subject using `mockFunction`:

```yaml
subject: logger
module: ./logger.js
subjectType: function
methods:
  _message:
    mock:
      - ./date-mock.yaml
    terms:
      - params: ['type', 'test-message']
        result: '2020-01-01T00:00:00.000Z:TYPE:test-message'
  debug:
    mockFunction: [_message] # mock _message within same subject
    terms:
      - params: ['test-message']
        result: '2020-01-01T00:00:00.000Z:DEBUG:test-message'
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `subject` | yes | Name of the exported function/class |
| `module` | yes | Relative path to the JS module |
| `subjectType` | yes | `function` or `class` |
| `constructor` | class only | Constructor term definitions |
| `methods` | yes | Map of method names to term definitions |
| `methods.__self__` | — | For function subjects, references the function itself |
| `mock` | no | List of contract YAML paths to use as mocks |
| `mockFunction` | no | List of internal method names to mock within same subject |
| Term: `params` | yes | Input parameters array |
| Term: `result` | one of | Expected return value |
| Term: `error` | one of | Expected thrown error (string or object) |
| Term: `constructorParams` | class | Constructor args for class method calls |

## API

### mocker

```typescript
import { mocker } from '@beecode/msh-test-contractor'
```

**`mocker.contract(contract)`** — Spy on an entire subject (function, class, or object). Returns `{ spy, mockRestore }`.

**`mocker.function(contract, fnName)`** — Spy on a single method. Returns `{ spy, mockRestore }`.

### contractor

```typescript
import { contractor } from '@beecode/msh-test-contractor'
```

**`contractor(contract, fnName)`** — Generate a Vitest `describe`/`it` block for one function's contract terms.

### contractorTestRunner

```typescript
import { contractorTestRunner } from '@beecode/msh-test-contractor/contract/contractor-test-runner.js'
```

**`contractorTestRunner.dir(dirPath)`** — Discover and run all `**/*.contract.yaml` files in a directory.

**`contractorTestRunner.file(filePath)`** — Run a single YAML contract file.

**`contractorTestRunner.contract(contract)`** — Run a programmatically-built contract.

## License

[MIT](https://github.com/beecode-rs/msh-test-contractor/blob/main/LICENSE)
