[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-class-strategy](../README.md) / MockerVitestClassStrategy

# Class: MockerVitestClassStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L10)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<`MockInstance`\<`any`\>\>

## Constructors

### Constructor

> **new MockerVitestClassStrategy**(`_contract`): `MockerVitestClassStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L14)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestClassStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L14)

***

### \_spy?

> `protected` `optional` **\_spy**: `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L12)

## Methods

### \_functionNames()

> `protected` **\_functionNames**(`classObject`): `string`[]

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:33](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L33)

#### Parameters

##### classObject

`any`

#### Returns

`string`[]

***

### \_mockClass()

> `protected` **\_mockClass**(`functionNames`): (...`args`) => `any`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:38](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L38)

#### Parameters

##### functionNames

`string`[]

#### Returns

> (...`args`): `any`

##### Parameters

###### args

...`any`[]

##### Returns

`any`

***

### \_mockFunction()

> `protected` **\_mockFunction**(`params`): (...`args`) => `any`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:73](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L73)

#### Parameters

##### params

###### mockClassParams

`any`[]

###### name

`string`

###### terms

[`ContractTerm`](../../../types/type-aliases/ContractTerm.md)[]

#### Returns

> (...`args`): `any`

##### Parameters

###### args

...`any`[]

##### Returns

`any`

***

### contractSpy()

> **contractSpy**(): `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:23](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L23)

#### Returns

`MockInstance`\<`any`\>

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker-vitest-class-strategy.ts#L16)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
