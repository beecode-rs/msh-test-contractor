[@beecode/msh-test-contractor](../README.md) / [mocker/mocker-jest-class-strategy](../modules/mocker_mocker_jest_class_strategy.md) / MockerJestClassStrategy

# Class: MockerJestClassStrategy

[mocker/mocker-jest-class-strategy](../modules/mocker_mocker_jest_class_strategy.md).MockerJestClassStrategy

## Implements

- [`MockerStrategy`](../interfaces/mocker_mocker_strategy.MockerStrategy.md)\<`jest.Spied`\<`any`\>\>

## Table of contents

### Constructors

- [constructor](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#constructor)

### Properties

- [\_contract](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#_contract)
- [\_spy](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#_spy)

### Methods

- [\_functionNames](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#_functionnames)
- [\_mockClass](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#_mockclass)
- [\_mockFunction](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#_mockfunction)
- [contractSpy](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#contractspy)
- [mockRestore](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md#mockrestore)

## Constructors

### constructor

• **new MockerJestClassStrategy**(`_contract`): [`MockerJestClassStrategy`](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_contract` | [`AnyContract`](../modules/types.md#anycontract) |

#### Returns

[`MockerJestClassStrategy`](mocker_mocker_jest_class_strategy.MockerJestClassStrategy.md)

#### Defined in

[mocker/mocker-jest-class-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L12)

## Properties

### \_contract

• `Protected` **\_contract**: [`AnyContract`](../modules/types.md#anycontract)

#### Defined in

[mocker/mocker-jest-class-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L12)

___

### \_spy

• `Protected` `Optional` **\_spy**: `SpiedClass`\<`any`\> \| `SpiedFunction`\<`any`\>

#### Defined in

[mocker/mocker-jest-class-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L10)

## Methods

### \_functionNames

▸ **_functionNames**(`classObject`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `classObject` | `any` |

#### Returns

`string`[]

#### Defined in

[mocker/mocker-jest-class-strategy.ts:29](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L29)

___

### \_mockClass

▸ **_mockClass**(`functionNames`): (...`args`: `any`[]) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionNames` | `string`[] |

#### Returns

`fn`

▸ (`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[mocker/mocker-jest-class-strategy.ts:33](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L33)

___

### \_mockFunction

▸ **_mockFunction**(`params`): (...`args`: `any`[]) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.mockClassParams` | `any`[] |
| `params.name` | `string` |
| `params.terms` | [`ContractTerm`](../modules/types.md#contractterm)[] |

#### Returns

`fn`

▸ (`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[mocker/mocker-jest-class-strategy.ts:64](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L64)

___

### contractSpy

▸ **contractSpy**(): `SpiedClass`\<`any`\> \| `SpiedFunction`\<`any`\>

#### Returns

`SpiedClass`\<`any`\> \| `SpiedFunction`\<`any`\>

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[contractSpy](../interfaces/mocker_mocker_strategy.MockerStrategy.md#contractspy)

#### Defined in

[mocker/mocker-jest-class-strategy.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L20)

___

### mockRestore

▸ **mockRestore**(): `void`

#### Returns

`void`

#### Implementation of

[MockerStrategy](../interfaces/mocker_mocker_strategy.MockerStrategy.md).[mockRestore](../interfaces/mocker_mocker_strategy.MockerStrategy.md#mockrestore)

#### Defined in

[mocker/mocker-jest-class-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker-jest-class-strategy.ts#L14)
