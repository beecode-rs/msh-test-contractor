[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-object-strategy](../README.md) / MockerVitestObjectStrategy

# Class: MockerVitestObjectStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L9)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)\>

## Constructors

### Constructor

> **new MockerVitestObjectStrategy**(`_contract`): `MockerVitestObjectStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L12)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestObjectStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L12)

***

### \_spies

> `protected` **\_spies**: `MockInstance`\<`any`\>[] = `[]`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L10)

## Methods

### \_mockObject()

> `protected` **\_mockObject**(): [`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:24](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L24)

#### Returns

[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

***

### contractSpy()

> **contractSpy**(): [`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L20)

#### Returns

[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/mocker/mocker-vitest-object-strategy.ts#L14)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
