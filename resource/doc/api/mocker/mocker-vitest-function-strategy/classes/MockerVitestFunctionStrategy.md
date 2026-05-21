[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-function-strategy](../README.md) / MockerVitestFunctionStrategy

# Class: MockerVitestFunctionStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L7)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<`MockInstance`\<`any`\>\>

## Constructors

### Constructor

> **new MockerVitestFunctionStrategy**(`_contract`): `MockerVitestFunctionStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L11)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestFunctionStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L11)

***

### \_spy?

> `protected` `optional` **\_spy**: `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L9)

## Methods

### contractSpy()

> **contractSpy**(): `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L20)

#### Returns

`MockInstance`\<`any`\>

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-function-strategy.ts#L13)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
