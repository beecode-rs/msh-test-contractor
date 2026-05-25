[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-function-strategy](../README.md) / MockerVitestFunctionStrategy

# Class: MockerVitestFunctionStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L7)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<`MockInstance`\<`any`\>\>

## Constructors

### Constructor

> **new MockerVitestFunctionStrategy**(`_contract`): `MockerVitestFunctionStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L10)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestFunctionStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L10)

***

### \_spy?

> `protected` `optional` **\_spy**: `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L8)

## Methods

### contractSpy()

> **contractSpy**(): `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L19)

#### Returns

`MockInstance`\<`any`\>

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-function-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-function-strategy.ts#L12)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
