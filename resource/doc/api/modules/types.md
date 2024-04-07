[@beecode/msh-test-contractor](../README.md) / types

# Module: types

## Table of contents

### Type Aliases

- [AnyContract](types.md#anycontract)
- [Contract](types.md#contract)
- [ContractFns](types.md#contractfns)
- [ContractFunction](types.md#contractfunction)
- [ContractMock](types.md#contractmock)
- [ContractMockRevertFn](types.md#contractmockrevertfn)
- [ContractMockRevertFns](types.md#contractmockrevertfns)
- [ContractTerm](types.md#contractterm)
- [PropType](types.md#proptype)

## Type Aliases

### AnyContract

Ƭ **AnyContract**: [`Contract`](types.md#contract)\<`any`, `any`, `any`\>

#### Defined in

[types/index.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L17)

___

### Contract

Ƭ **Contract**\<`MODULE`, `SUBJECT_NAME`, `SUBJECT`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MODULE` | `MODULE` |
| `SUBJECT_NAME` | extends `Extract`\<keyof `MODULE`, `string`\> |
| `SUBJECT` | extends [`PropType`](types.md#proptype)\<`MODULE`, `SUBJECT_NAME`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fns` | [`ContractFns`](types.md#contractfns)\<`SUBJECT`\> |
| `mock?` | [`ContractMock`](types.md#contractmock) |
| `module` | `MODULE` |
| `subjectName` | `SUBJECT_NAME` |

#### Defined in

[types/index.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L6)

___

### ContractFns

Ƭ **ContractFns**\<`SUBJECT`\>: `Partial`\<\{ [key in Extract\<keyof SUBJECT, string\>]: ContractFunction } & \{ [key in SpecialFnName]: ContractFunction } & \{ `[k: string]`: [`ContractFunction`](types.md#contractfunction);  }\>

#### Type parameters

| Name |
| :------ |
| `SUBJECT` |

#### Defined in

[types/index.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L19)

___

### ContractFunction

Ƭ **ContractFunction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mock?` | [`ContractMock`](types.md#contractmock) |
| `terms` | [`ContractTerm`](types.md#contractterm)[] |

#### Defined in

[types/index.ts:25](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L25)

___

### ContractMock

Ƭ **ContractMock**: (`options?`: \{ `params?`: `any`[]  }) => [`ContractMockRevertFns`](types.md#contractmockrevertfns)

#### Type declaration

▸ (`options?`): [`ContractMockRevertFns`](types.md#contractmockrevertfns)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.params?` | `any`[] |

##### Returns

[`ContractMockRevertFns`](types.md#contractmockrevertfns)

#### Defined in

[types/index.ts:38](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L38)

___

### ContractMockRevertFn

Ƭ **ContractMockRevertFn**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[types/index.ts:40](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L40)

___

### ContractMockRevertFns

Ƭ **ContractMockRevertFns**: [`ContractMockRevertFn`](types.md#contractmockrevertfn)[]

#### Defined in

[types/index.ts:42](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L42)

___

### ContractTerm

Ƭ **ContractTerm**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `constructorParams?` | `any`[] |
| `params` | `any`[] |
| `result` | `any` |
| `returnFnParams?` | `any`[] |

#### Defined in

[types/index.ts:30](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L30)

___

### PropType

Ƭ **PropType**\<`T`, `P`\>: `T`[`P`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `P` | extends keyof `T` |

#### Defined in

[types/index.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/types/index.ts#L4)
