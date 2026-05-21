[**@beecode/msh-test-contractor**](../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../README.md) / [contract/expect/contract-expect-any-equal-strategy](../README.md) / ContractExpectAnyEqualStrategy

# Class: ContractExpectAnyEqualStrategy

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-any-equal-strategy.ts#L7)

## Implements

- [`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md)

## Constructors

### Constructor

> **new ContractExpectAnyEqualStrategy**(`params`): `ContractExpectAnyEqualStrategy`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-any-equal-strategy.ts#L11)

#### Parameters

##### params

###### term

[`ContractTerm`](../../../../types/type-aliases/ContractTerm.md)

#### Returns

`ContractExpectAnyEqualStrategy`

## Properties

### \_termResult

> `protected` `readonly` **\_termResult**: `any`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-any-equal-strategy.ts#L9)

## Methods

### test()

> **test**(`fn`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-any-equal-strategy.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-any-equal-strategy.ts#L17)

#### Parameters

##### fn

() => `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md).[`test`](../../contract-expect-service/interfaces/ContractExpectStrategy.md#test)
