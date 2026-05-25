[**@beecode/msh-test-contractor**](../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../README.md) / [contract/expect/contract-expect-any-equal-strategy](../README.md) / ContractExpectAnyEqualStrategy

# Class: ContractExpectAnyEqualStrategy

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/contract/expect/contract-expect-any-equal-strategy.ts#L7)

## Implements

- [`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md)

## Constructors

### Constructor

> **new ContractExpectAnyEqualStrategy**(`params`): `ContractExpectAnyEqualStrategy`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/contract/expect/contract-expect-any-equal-strategy.ts#L10)

#### Parameters

##### params

###### term

[`ContractTerm`](../../../../types/type-aliases/ContractTerm.md)

#### Returns

`ContractExpectAnyEqualStrategy`

## Properties

### \_termResult

> `protected` `readonly` **\_termResult**: `any`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/contract/expect/contract-expect-any-equal-strategy.ts#L8)

## Methods

### test()

> **test**(`fn`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/contract/expect/contract-expect-any-equal-strategy.ts#L16)

#### Parameters

##### fn

() => `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md).[`test`](../../contract-expect-service/interfaces/ContractExpectStrategy.md#test)
