[@beecode/msh-test-contractor](../README.md) / [contract/expect/contract-expect-function-result-equal-strategy](../modules/contract_expect_contract_expect_function_result_equal_strategy.md) / ContractExpectFunctionResultEqualStrategy

# Class: ContractExpectFunctionResultEqualStrategy

[contract/expect/contract-expect-function-result-equal-strategy](../modules/contract_expect_contract_expect_function_result_equal_strategy.md).ContractExpectFunctionResultEqualStrategy

## Implements

- [`ContractExpectStrategy`](../interfaces/contract_expect_contract_expect_service.ContractExpectStrategy.md)

## Table of contents

### Constructors

- [constructor](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md#constructor)

### Properties

- [\_termResult](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md#_termresult)
- [\_termReturnFnParams](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md#_termreturnfnparams)

### Methods

- [test](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md#test)

## Constructors

### constructor

• **new ContractExpectFunctionResultEqualStrategy**(`params`): [`ContractExpectFunctionResultEqualStrategy`](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.term` | [`ContractTerm`](../modules/types.md#contractterm) |

#### Returns

[`ContractExpectFunctionResultEqualStrategy`](contract_expect_contract_expect_function_result_equal_strategy.ContractExpectFunctionResultEqualStrategy.md)

#### Defined in

[contract/expect/contract-expect-function-result-equal-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L10)

## Properties

### \_termResult

• `Protected` `Readonly` **\_termResult**: `any`

#### Defined in

[contract/expect/contract-expect-function-result-equal-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L7)

___

### \_termReturnFnParams

• `Protected` `Readonly` **\_termReturnFnParams**: `any`

#### Defined in

[contract/expect/contract-expect-function-result-equal-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L8)

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

[contract/expect/contract-expect-function-result-equal-strategy.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/expect/contract-expect-function-result-equal-strategy.ts#L16)
