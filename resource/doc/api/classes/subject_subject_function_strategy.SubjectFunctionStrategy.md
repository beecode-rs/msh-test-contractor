[@beecode/msh-test-contractor](../README.md) / [subject/subject-function-strategy](../modules/subject_subject_function_strategy.md) / SubjectFunctionStrategy

# Class: SubjectFunctionStrategy

[subject/subject-function-strategy](../modules/subject_subject_function_strategy.md).SubjectFunctionStrategy

## Implements

- [`SubjectStrategy`](../interfaces/subject_subject_strategy.SubjectStrategy.md)

## Table of contents

### Constructors

- [constructor](subject_subject_function_strategy.SubjectFunctionStrategy.md#constructor)

### Properties

- [\_fnName](subject_subject_function_strategy.SubjectFunctionStrategy.md#_fnname)
- [\_module](subject_subject_function_strategy.SubjectFunctionStrategy.md#_module)
- [\_subjectName](subject_subject_function_strategy.SubjectFunctionStrategy.md#_subjectname)

### Methods

- [exec](subject_subject_function_strategy.SubjectFunctionStrategy.md#exec)
- [fn](subject_subject_function_strategy.SubjectFunctionStrategy.md#fn)

## Constructors

### constructor

• **new SubjectFunctionStrategy**(`params`): [`SubjectFunctionStrategy`](subject_subject_function_strategy.SubjectFunctionStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.fnName` | `string` |
| `params.subjectFromContract` | [`SubjectFromContract`](../modules/subject_subject_strategy.md#subjectfromcontract) |

#### Returns

[`SubjectFunctionStrategy`](subject_subject_function_strategy.SubjectFunctionStrategy.md)

#### Defined in

[subject/subject-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L10)

## Properties

### \_fnName

• `Protected` `Readonly` **\_fnName**: `string`

#### Defined in

[subject/subject-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L8)

___

### \_module

• `Protected` `Readonly` **\_module**: `any`

#### Defined in

[subject/subject-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L7)

___

### \_subjectName

• `Protected` `Readonly` **\_subjectName**: `string`

#### Defined in

[subject/subject-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L6)

## Methods

### exec

▸ **exec**(`term`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `term` | [`ContractTerm`](../modules/types.md#contractterm) |

#### Returns

`any`

#### Implementation of

[SubjectStrategy](../interfaces/subject_subject_strategy.SubjectStrategy.md).[exec](../interfaces/subject_subject_strategy.SubjectStrategy.md#exec)

#### Defined in

[subject/subject-function-strategy.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L20)

___

### fn

▸ **fn**(): `any`

#### Returns

`any`

#### Implementation of

[SubjectStrategy](../interfaces/subject_subject_strategy.SubjectStrategy.md).[fn](../interfaces/subject_subject_strategy.SubjectStrategy.md#fn)

#### Defined in

[subject/subject-function-strategy.ts:26](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-function-strategy.ts#L26)
