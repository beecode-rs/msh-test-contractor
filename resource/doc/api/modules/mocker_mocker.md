[@beecode/msh-test-contractor](../README.md) / mocker/mocker

# Module: mocker/mocker

## Table of contents

### Type Aliases

- [MockerContractResult](mocker_mocker.md#mockercontractresult)

### Variables

- [mocker](mocker_mocker.md#mocker)

## Type Aliases

### MockerContractResult

Ƭ **MockerContractResult**\<`SPY`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SPY` | `jest.Spied`\<`any`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mockRestore` | [`ContractMockRevertFn`](types.md#contractmockrevertfn) |
| `spy` | `SPY` |

#### Defined in

[mocker/mocker.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker.ts#L8)

## Variables

### mocker

• `Const` **mocker**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contract` | \<SPY, C\>(`contract`: `C`) => [`MockerContractResult`](mocker_mocker.md#mockercontractresult)\<`SPY`\> |
| `function` | \<C, CFNK\>(`contract`: `C`, `fnName`: `CFNK`) => [`MockerContractResult`](mocker_mocker.md#mockercontractresult)\<`SpiedClass`\<`any`\> \| `SpiedFunction`\<`any`\>\> |

#### Defined in

[mocker/mocker.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/mocker/mocker.ts#L13)
