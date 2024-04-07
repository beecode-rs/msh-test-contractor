[@beecode/msh-test-contractor](../README.md) / [contract/expect/contract-expect-any-equal-strategy](../modules/contract_expect_contract_expect_any_equal_strategy.md) / ContractExpectAnyEqualStrategy

# Class: ContractExpectAnyEqualStrategy

[contract/expect/contract-expect-any-equal-strategy](../modules/contract_expect_contract_expect_any_equal_strategy.md).ContractExpectAnyEqualStrategy

## Implements

- [`ContractExpectStrategy`](../interfaces/contract_expect_contract_expect_service.ContractExpectStrategy.md)

## Table of contents

### Constructors

- [constructor](contract_expect_contract_expect_any_equal_strategy.ContractExpectAnyEqualStrategy.md#constructor)

### Properties

- [\_termResult](contract_expect_contract_expect_any_equal_strategy.ContractExpectAnyEqualStrategy.md#_termresult)

### Methods

- [test](contract_expect_contract_expect_any_equal_strategy.ContractExpectAnyEqualStrategy.md#test)

## Constructors

### constructor

• **new ContractExpectAnyEqualStrategy**(`params`): [`ContractExpectAnyEqualStrategy`](contract_expect_contract_expect_any_equal_strategy.ContractExpectAnyEqualStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.term` | [`ContractTerm`](../modules/types.md#contractterm) |

#### Returns

[`ContractExpectAnyEqualStrategy`](contract_expect_contract_expect_any_equal_strategy.ContractExpectAnyEqualStrategy.md)

#### Defined in

[contract/expect/contract-expect-any-equal-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-any-equal-strategy.ts#L10)

## Properties

### \_termResult

• `Protected` `Readonly` **\_termResult**: `any`

#### Defined in

[contract/expect/contract-expect-any-equal-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-any-equal-strategy.ts#L8)

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

[contract/expect/contract-expect-any-equal-strategy.ts:15](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-any-equal-strategy.ts#L15)
