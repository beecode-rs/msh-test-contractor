[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [contract/contractor-factory](../README.md) / contractFactory

# Function: contractFactory()

> **contractFactory**\<`TModule`, `TSubjectName`, `TSubject`, `TContractFns`\>(`options`, `fns`): [`Contract`](../../../types/type-aliases/Contract.md)\<`TModule`, `TSubjectName`, `TSubject`\>

Defined in: [packages/test-contractor/src/contract/contractor-factory.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/contract/contractor-factory.ts#L3)

## Type Parameters

### TModule

`TModule`

### TSubjectName

`TSubjectName` *extends* `string`

### TSubject

`TSubject`

### TContractFns

`TContractFns` *extends* `Partial`\<`Partial`\<`Record`\<`Extract`\<keyof `TSubject`, `string`\>, [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\> & `Record`\<[`SpecialFnName`](../../../enum/special-fn-name/enumerations/SpecialFnName.md), [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\> & `Record`\<`string`, [`ContractFunction`](../../../types/type-aliases/ContractFunction.md)\>\>\>

## Parameters

### options

#### mock?

[`ContractMock`](../../../types/type-aliases/ContractMock.md)

#### module

`TModule`

#### subjectName

`TSubjectName`

### fns

`TContractFns`

## Returns

[`Contract`](../../../types/type-aliases/Contract.md)\<`TModule`, `TSubjectName`, `TSubject`\>
