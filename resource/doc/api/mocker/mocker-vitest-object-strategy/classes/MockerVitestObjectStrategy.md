[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-object-strategy](../README.md) / MockerVitestObjectStrategy

# Class: MockerVitestObjectStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L10)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)\>

## Constructors

### Constructor

> **new MockerVitestObjectStrategy**(`_contract`): `MockerVitestObjectStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L14)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestObjectStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L14)

***

### \_spies

> `protected` **\_spies**: `MockInstance`\<`any`\>[] = `[]`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L12)

## Methods

### \_mockObject()

> `protected` **\_mockObject**(): [`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:26](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L26)

#### Returns

[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

***

### contractSpy()

> **contractSpy**(): [`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:22](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L22)

#### Returns

[`MockerVitestObjectResult`](../type-aliases/MockerVitestObjectResult.md)

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-object-strategy.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-object-strategy.ts#L16)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
