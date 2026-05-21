[**@beecode/msh-test-contractor**](../../README.md)

***

[@beecode/msh-test-contractor](../../README.md) / [types](../README.md) / Contract

# Type Alias: Contract\<MODULE, SUBJECT_NAME, SUBJECT\>

> **Contract**\<`MODULE`, `SUBJECT_NAME`, `SUBJECT`\> = `object`

Defined in: [packages/test-contractor/src/types/index.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/types/index.ts#L6)

## Type Parameters

### MODULE

`MODULE`

### SUBJECT_NAME

`SUBJECT_NAME` *extends* `Extract`\<keyof `MODULE`, `string`\>

### SUBJECT

`SUBJECT` *extends* [`PropType`](PropType.md)\<`MODULE`, `SUBJECT_NAME`\>

## Properties

### fns

> **fns**: [`ContractFns`](ContractFns.md)\<`SUBJECT`\>

Defined in: [packages/test-contractor/src/types/index.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/types/index.ts#L14)

***

### mock?

> `optional` **mock**: [`ContractMock`](ContractMock.md)

Defined in: [packages/test-contractor/src/types/index.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/types/index.ts#L13)

***

### module

> **module**: `MODULE`

Defined in: [packages/test-contractor/src/types/index.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/types/index.ts#L11)

***

### subjectName

> **subjectName**: `SUBJECT_NAME`

Defined in: [packages/test-contractor/src/types/index.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/types/index.ts#L12)
