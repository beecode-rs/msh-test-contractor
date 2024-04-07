[@beecode/msh-test-contractor](../README.md) / [mocker/mocker-jest-object-strategy](../modules/mocker_mocker_jest_object_strategy.md) / MockerJestObjectStrategy

# Class: MockerJestObjectStrategy

[mocker/mocker-jest-object-strategy](../modules/mocker_mocker_jest_object_strategy.md).MockerJestObjectStrategy

## Implements

- [`MockerStrategy`](../interfaces/mocker_mocker_strategy.MockerStrategy.md)\<[`MockerJestObjectResult`](../modules/mocker_mocker_jest_object_strategy.md#mockerjestobjectresult)\>

## Table of contents

### Constructors

- [constructor](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#constructor)

### Properties

- [\_contract](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#_contract)
- [\_spies](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#_spies)

### Methods

- [\_mockObject](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#_mockobject)
- [contractSpy](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#contractspy)
- [mockRestore](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md#mockrestore)

## Constructors

### constructor

• **new MockerJestObjectStrategy**(`_contract`): [`MockerJestObjectStrategy`](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_contract` | [`AnyContract`](../modules/types.md#anycontract) |

#### Returns

[`MockerJestObjectStrategy`](mocker_mocker_jest_object_strategy.MockerJestObjectStrategy.md)

#### Defined in

[mocker/mocker-jest-object-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L12)

## Properties

### \_contract

• `Protected` **\_contract**: [`AnyContract`](../modules/types.md#anycontract)

#### Defined in

[mocker/mocker-jest-object-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L12)

___

### \_spies

• `Protected` **\_spies**: (`SpiedClass`\<`any`\> \| `SpiedFunction`\<`any`\>)[] = `[]`

#### Defined in

[mocker/mocker-jest-object-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L10)

## Methods

### \_mockObject

▸ **_mockObject**(): [`MockerJestObjectResult`](../modules/mocker_mocker_jest_object_strategy.md#mockerjestobjectresult)

#### Returns

[`MockerJestObjectResult`](../modules/mocker_mocker_jest_object_strategy.md#mockerjestobjectresult)

#### Defined in

[mocker/mocker-jest-object-strategy.ts:22](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L22)

___

### contractSpy

▸ **contractSpy**(): [`MockerJestObjectResult`](../modules/mocker_mocker_jest_object_strategy.md#mockerjestobjectresult)

#### Returns

[`MockerJestObjectResult`](../modules/mocker_mocker_jest_object_strategy.md#mockerjestobjectresult)

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[contractSpy](../interfaces/mocker_mocker_strategy.MockerStrategy.md#contractspy)

#### Defined in

[mocker/mocker-jest-object-strategy.ts:18](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L18)

___

### mockRestore

▸ **mockRestore**(): `void`

#### Returns

`void`

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[mockRestore](../interfaces/mocker_mocker_strategy.MockerStrategy.md#mockrestore)

#### Defined in

[mocker/mocker-jest-object-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-object-strategy.ts#L14)
