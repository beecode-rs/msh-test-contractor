[**@beecode/msh-test-contractor**](../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../README.md) / [contract/expect/contract-expect-function-result-equal-strategy](../README.md) / ContractExpectFunctionResultEqualStrategy

# Class: ContractExpectFunctionResultEqualStrategy

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-function-result-equal-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L6)

## Implements

- [`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md)

## Constructors

### Constructor

> **new ContractExpectFunctionResultEqualStrategy**(`params`): `ContractExpectFunctionResultEqualStrategy`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-function-result-equal-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L12)

#### Parameters

##### params

###### term

[`ContractTerm`](../../../../types/type-aliases/ContractTerm.md)

#### Returns

`ContractExpectFunctionResultEqualStrategy`

## Properties

### \_termResult

> `protected` `readonly` **\_termResult**: `any`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-function-result-equal-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L8)

***

### \_termReturnFnParams

> `protected` `readonly` **\_termReturnFnParams**: `any`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-function-result-equal-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L10)

## Methods

### test()

> **test**(`fn`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-function-result-equal-strategy.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L19)

#### Parameters

##### fn

() => `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md).[`test`](../../contract-expect-service/interfaces/ContractExpectStrategy.md#test)
