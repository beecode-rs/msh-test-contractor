[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [vitest-spy/vitest-spy-class-function-strategy](../README.md) / VitestSpyClassFunctionStrategy

# Class: VitestSpyClassFunctionStrategy

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L7)

## Implements

- [`VitestSpyStrategy`](../../vitest-spy-strategy/interfaces/VitestSpyStrategy.md)

## Constructors

### Constructor

> **new VitestSpyClassFunctionStrategy**(`params`): `VitestSpyClassFunctionStrategy`

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L13)

#### Parameters

##### params

###### mockClassParams

`any`[]

###### name

`string`

###### terms

[`ContractTerm`](../../../types/type-aliases/ContractTerm.md)[]

#### Returns

`VitestSpyClassFunctionStrategy`

## Properties

### \_mockClassParams

> `protected` `readonly` **\_mockClassParams**: `any`[]

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L9)

***

### \_name

> `protected` `readonly` **\_name**: `string`

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L10)

***

### \_terms

> `protected` `readonly` **\_terms**: [`ContractTerm`](../../../types/type-aliases/ContractTerm.md)[]

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L8)

## Methods

### mockImplementationFactory()

> **mockImplementationFactory**(): (...`args`) => `any`

Defined in: [packages/test-contractor/src/vitest-spy/vitest-spy-class-function-strategy.ts:21](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/vitest-spy/vitest-spy-class-function-strategy.ts#L21)

#### Returns

> (...`args`): `any`

##### Parameters

###### args

...`any`[]

##### Returns

`any`

#### Implementation of

[`VitestSpyStrategy`](../../vitest-spy-strategy/interfaces/VitestSpyStrategy.md).[`mockImplementationFactory`](../../vitest-spy-strategy/interfaces/VitestSpyStrategy.md#mockimplementationfactory)
