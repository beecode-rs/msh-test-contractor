[@beecode/msh-test-contractor](../README.md) / [mocker/mocker-jest-function-strategy](../modules/mocker_mocker_jest_function_strategy.md) / MockerJestFunctionStrategy

# Class: MockerJestFunctionStrategy

[mocker/mocker-jest-function-strategy](../modules/mocker_mocker_jest_function_strategy.md).MockerJestFunctionStrategy

## Implements

- [`MockerStrategy`](../interfaces/mocker_mocker_strategy.MockerStrategy.md)\<`jest.SpiedFunction`\<`any`\>\>

## Table of contents

### Constructors

- [constructor](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md#constructor)

### Properties

- [\_contract](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md#_contract)
- [\_spy](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md#_spy)

### Methods

- [contractSpy](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md#contractspy)
- [mockRestore](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md#mockrestore)

## Constructors

### constructor

• **new MockerJestFunctionStrategy**(`_contract`): [`MockerJestFunctionStrategy`](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_contract` | [`AnyContract`](../modules/types.md#anycontract) |

#### Returns

[`MockerJestFunctionStrategy`](mocker_mocker_jest_function_strategy.MockerJestFunctionStrategy.md)

#### Defined in

[mocker/mocker-jest-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-function-strategy.ts#L9)

## Properties

### \_contract

• `Protected` **\_contract**: [`AnyContract`](../modules/types.md#anycontract)

#### Defined in

[mocker/mocker-jest-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-function-strategy.ts#L9)

___

### \_spy

• `Protected` `Optional` **\_spy**: `SpiedFunction`\<`any`\>

#### Defined in

[mocker/mocker-jest-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-function-strategy.ts#L7)

## Methods

### contractSpy

▸ **contractSpy**(): `SpiedFunction`\<`any`\>

#### Returns

`SpiedFunction`\<`any`\>

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[contractSpy](../interfaces/mocker_mocker_strategy.MockerStrategy.md#contractspy)

#### Defined in

[mocker/mocker-jest-function-strategy.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-function-strategy.ts#L17)

___

### mockRestore

▸ **mockRestore**(): `void`

#### Returns

`void`

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[mockRestore](../interfaces/mocker_mocker_strategy.MockerStrategy.md#mockrestore)

#### Defined in

[mocker/mocker-jest-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-function-strategy.ts#L11)
