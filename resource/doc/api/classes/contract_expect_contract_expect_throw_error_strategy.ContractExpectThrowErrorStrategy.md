[@beecode/msh-test-contractor](../README.md) / [contract/expect/contract-expect-throw-error-strategy](../modules/contract_expect_contract_expect_throw_error_strategy.md) / ContractExpectThrowErrorStrategy

# Class: ContractExpectThrowErrorStrategy

[contract/expect/contract-expect-throw-error-strategy](../modules/contract_expect_contract_expect_throw_error_strategy.md).ContractExpectThrowErrorStrategy

## Implements

- [`ContractExpectStrategy`](../interfaces/contract_expect_contract_expect_service.ContractExpectStrategy.md)

## Table of contents

### Constructors

- [constructor](contract_expect_contract_expect_throw_error_strategy.ContractExpectThrowErrorStrategy.md#constructor)

### Properties

- [\_termResult](contract_expect_contract_expect_throw_error_strategy.ContractExpectThrowErrorStrategy.md#_termresult)

### Methods

- [test](contract_expect_contract_expect_throw_error_strategy.ContractExpectThrowErrorStrategy.md#test)

## Constructors

### constructor

• **new ContractExpectThrowErrorStrategy**(`params`): [`ContractExpectThrowErrorStrategy`](contract_expect_contract_expect_throw_error_strategy.ContractExpectThrowErrorStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.term` | [`ContractTerm`](../modules/types.md#contractterm) |

#### Returns

[`ContractExpectThrowErrorStrategy`](contract_expect_contract_expect_throw_error_strategy.ContractExpectThrowErrorStrategy.md)

#### Defined in

[contract/expect/contract-expect-throw-error-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-throw-error-strategy.ts#L9)

## Properties

### \_termResult

• `Protected` `Readonly` **\_termResult**: `any`

#### Defined in

[contract/expect/contract-expect-throw-error-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-throw-error-strategy.ts#L7)

## Methods

### test

▸ **test**(`fn`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `any` |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ContractExpectStrategy](../interfaces/contract_expect_contract_expect_service.ContractExpectStrategy.md).[test](../interfaces/contract_expect_contract_expect_service.ContractExpectStrategy.md#test)

#### Defined in

[contract/expect/contract-expect-throw-error-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-throw-error-strategy.ts#L14)
