[**@beecode/msh-test-contractor**](../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../README.md) / [contract/expect/contract-expect-throw-error-strategy](../README.md) / ContractExpectThrowErrorStrategy

# Class: ContractExpectThrowErrorStrategy

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-throw-error-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract/expect/contract-expect-throw-error-strategy.ts#L12)

## Implements

- [`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md)

## Constructors

### Constructor

> **new ContractExpectThrowErrorStrategy**(`params`): `ContractExpectThrowErrorStrategy`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-throw-error-strategy.ts:15](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract/expect/contract-expect-throw-error-strategy.ts#L15)

#### Parameters

##### params

###### term

[`ContractTerm`](../../../../types/type-aliases/ContractTerm.md)

#### Returns

`ContractExpectThrowErrorStrategy`

## Properties

### \_termResult

> `protected` `readonly` **\_termResult**: `any`

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-throw-error-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract/expect/contract-expect-throw-error-strategy.ts#L13)

## Methods

### test()

> **test**(`fn`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/contract/expect/contract-expect-throw-error-strategy.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract/expect/contract-expect-throw-error-strategy.ts#L20)

#### Parameters

##### fn

() => `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ContractExpectStrategy`](../../contract-expect-service/interfaces/ContractExpectStrategy.md).[`test`](../../contract-expect-service/interfaces/ContractExpectStrategy.md#test)
