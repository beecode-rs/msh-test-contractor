[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker-vitest-class-strategy](../README.md) / MockerVitestClassStrategy

# Class: MockerVitestClassStrategy

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L10)

## Implements

- [`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md)\<`MockInstance`\<`any`\>\>

## Constructors

### Constructor

> **new MockerVitestClassStrategy**(`_contract`): `MockerVitestClassStrategy`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L13)

#### Parameters

##### \_contract

[`AnyContract`](../../../types/type-aliases/AnyContract.md)

#### Returns

`MockerVitestClassStrategy`

## Properties

### \_contract

> `protected` **\_contract**: [`AnyContract`](../../../types/type-aliases/AnyContract.md)

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L13)

***

### \_spy?

> `protected` `optional` **\_spy**: `MockInstance`\<`any`\>

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L11)

## Methods

### \_functionNames()

> `protected` **\_functionNames**(`classObject`): `string`[]

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:32](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L32)

#### Parameters

##### classObject

`any`

#### Returns

`string`[]

***

### \_mockClass()

> `protected` **\_mockClass**(`functionNames`): (...`args`) => `any`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:37](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L37)

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

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:71](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L71)

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

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:22](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L22)

#### Returns

`MockInstance`\<`any`\>

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`contractSpy`](../../mocker-strategy/interfaces/MockerStrategy.md#contractspy)

***

### mockRestore()

> **mockRestore**(): `void`

Defined in: [packages/test-contractor/src/mocker/mocker-vitest-class-strategy.ts:15](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker-vitest-class-strategy.ts#L15)

#### Returns

`void`

#### Implementation of

[`MockerStrategy`](../../mocker-strategy/interfaces/MockerStrategy.md).[`mockRestore`](../../mocker-strategy/interfaces/MockerStrategy.md#mockrestore)
