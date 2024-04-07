[@beecode/msh-test-contractor](../README.md) / [contract-mock/mock-jest-strategy](../modules/contract_mock_mock_jest_strategy.md) / MockJestStrategy

# Class: MockJestStrategy

[contract-mock/mock-jest-strategy](../modules/contract_mock_mock_jest_strategy.md).MockJestStrategy

## Implements

- [`MockStrategy`](../interfaces/contract_mock_mock_strategy.MockStrategy.md)

## Table of contents

### Constructors

- [constructor](contract_mock_mock_jest_strategy.MockJestStrategy.md#constructor)

### Properties

- [\_mock](contract_mock_mock_jest_strategy.MockJestStrategy.md#_mock)
- [\_restoreMockFn](contract_mock_mock_jest_strategy.MockJestStrategy.md#_restoremockfn)

### Methods

- [mock](contract_mock_mock_jest_strategy.MockJestStrategy.md#mock)
- [restore](contract_mock_mock_jest_strategy.MockJestStrategy.md#restore)

## Constructors

### constructor

• **new MockJestStrategy**(`_mock?`): [`MockJestStrategy`](contract_mock_mock_jest_strategy.MockJestStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mock?` | [`ContractMock`](../modules/types.md#contractmock) |

#### Returns

[`MockJestStrategy`](contract_mock_mock_jest_strategy.MockJestStrategy.md)

#### Defined in

[contract-mock/mock-jest-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract-mock/mock-jest-strategy.ts#L7)

## Properties

### \_mock

• `Protected` `Optional` `Readonly` **\_mock**: [`ContractMock`](../modules/types.md#contractmock)

#### Defined in

[contract-mock/mock-jest-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract-mock/mock-jest-strategy.ts#L7)

___

### \_restoreMockFn

• `Protected` `Optional` **\_restoreMockFn**: [`ContractMockRevertFns`](../modules/types.md#contractmockrevertfns)

#### Defined in

[contract-mock/mock-jest-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract-mock/mock-jest-strategy.ts#L5)

## Methods

### mock

▸ **mock**(`mockParams?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mockParams` | `Object` |
| `mockParams.params?` | `any`[] |

#### Returns

`void`

#### Implementation of

[MockStrategy](../interfaces/contract_mock_mock_strategy.MockStrategy.md).[mock](../interfaces/contract_mock_mock_strategy.MockStrategy.md#mock)

#### Defined in

[contract-mock/mock-jest-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract-mock/mock-jest-strategy.ts#L9)

___

### restore

▸ **restore**(): `void`

#### Returns

`void`

#### Implementation of

[MockStrategy](../interfaces/contract_mock_mock_strategy.MockStrategy.md).[restore](../interfaces/contract_mock_mock_strategy.MockStrategy.md#restore)

#### Defined in

[contract-mock/mock-jest-strategy.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract-mock/mock-jest-strategy.ts#L14)
