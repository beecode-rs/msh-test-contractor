[@beecode/msh-test-contractor](../README.md) / contract/contractor-factory

# Module: contract/contractor-factory

## Table of contents

### Functions

- [contractFactory](contract_contractor_factory.md#contractfactory)

## Functions

### contractFactory

▸ **contractFactory**\<`M`, `SN`, `S`, `CFNS`\>(`options`, `fns`): [`Contract`](types.md#contract)\<`M`, `SN`, `S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | `M` |
| `SN` | extends `string` |
| `S` | `S` |
| `CFNS` | extends `Partial`\<`Partial`\<\{ [key in string]: ContractFunction } & \{ `CONSTRUCTOR`: [`ContractFunction`](types.md#contractfunction) ; `SELF`: [`ContractFunction`](types.md#contractfunction)  } & \{ `[k: string]`: [`ContractFunction`](types.md#contractfunction);  }\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.mock?` | [`ContractMock`](types.md#contractmock) |
| `options.module` | `M` |
| `options.subjectName` | `SN` |
| `fns` | `CFNS` |

#### Returns

[`Contract`](types.md#contract)\<`M`, `SN`, `S`\>

#### Defined in

[contract/contractor-factory.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/contract/contractor-factory.ts#L3)
