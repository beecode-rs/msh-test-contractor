[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [contract/contractor-factory](../README.md) / contractFactory

# Function: contractFactory()

> **contractFactory**\<`M`, `SN`, `S`, `CFNS`\>(`options`, `fns`): [`Contract`](../../../types/type-aliases/Contract.md)\<`M`, `SN`, `S`\>

Defined in: [packages/test-contractor/src/contract/contractor-factory.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/contract/contractor-factory.ts#L3)

## Type Parameters

### M

`M`

### SN

`SN` *extends* `string`

### S

`S`

### CFNS

`CFNS` *extends* `Partial`\<`Partial`\<`Record`\<`Extract`\<keyof `S`, `string`\>, [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\> & `Record`\<[`SpecialFnName`](../../../enum/special-fn-name/enumerations/SpecialFnName.md), [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\> & `Record`\<`string`, [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\>\>\>

## Parameters

### options

#### mock?

[`ContractMock`](../../../types/type-aliases/ContractMock.md)

#### module

`M`

#### subjectName

`SN`

### fns

`CFNS`

## Returns

[`Contract`](../../../types/type-aliases/Contract.md)\<`M`, `SN`, `S`\>
