[@beecode/msh-test-contractor](../README.md) / [subject/subject-constructor-strategy](../modules/subject_subject_constructor_strategy.md) / SubjectConstructorStrategy

# Class: SubjectConstructorStrategy

[subject/subject-constructor-strategy](../modules/subject_subject_constructor_strategy.md).SubjectConstructorStrategy

## Implements

- [`SubjectStrategy`](../interfaces/subject_subject_strategy.SubjectStrategy.md)

## Table of contents

### Constructors

- [constructor](subject_subject_constructor_strategy.SubjectConstructorStrategy.md#constructor)

### Properties

- [\_module](subject_subject_constructor_strategy.SubjectConstructorStrategy.md#_module)
- [\_subjectName](subject_subject_constructor_strategy.SubjectConstructorStrategy.md#_subjectname)

### Methods

- [exec](subject_subject_constructor_strategy.SubjectConstructorStrategy.md#exec)
- [fn](subject_subject_constructor_strategy.SubjectConstructorStrategy.md#fn)

## Constructors

### constructor

• **new SubjectConstructorStrategy**(`params`): [`SubjectConstructorStrategy`](subject_subject_constructor_strategy.SubjectConstructorStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.subjectFromContract` | [`SubjectFromContract`](../modules/subject_subject_strategy.md#subjectfromcontract) |

#### Returns

[`SubjectConstructorStrategy`](subject_subject_constructor_strategy.SubjectConstructorStrategy.md)

#### Defined in

[subject/subject-constructor-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-constructor-strategy.ts#L8)

## Properties

### \_module

• `Protected` `Readonly` **\_module**: `any`

#### Defined in

[subject/subject-constructor-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-constructor-strategy.ts#L5)

___

### \_subjectName

• `Protected` `Readonly` **\_subjectName**: `string`

#### Defined in

[subject/subject-constructor-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-constructor-strategy.ts#L6)

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

[subject/subject-constructor-strategy.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-constructor-strategy.ts#L19)

___

### fn

▸ **fn**(): `any`

#### Returns

`any`

#### Implementation of

[SubjectStrategy](../interfaces/subject_subject_strategy.SubjectStrategy.md).[fn](../interfaces/subject_subject_strategy.SubjectStrategy.md#fn)

#### Defined in

[subject/subject-constructor-strategy.ts:23](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-constructor-strategy.ts#L23)
