[@beecode/msh-test-contractor](../README.md) / [subject/subject-class-function-strategy](../modules/subject_subject_class_function_strategy.md) / SubjectClassFunctionStrategy

# Class: SubjectClassFunctionStrategy

[subject/subject-class-function-strategy](../modules/subject_subject_class_function_strategy.md).SubjectClassFunctionStrategy

## Implements

- [`SubjectStrategy`](../interfaces/subject_subject_strategy.SubjectStrategy.md)

## Table of contents

### Constructors

- [constructor](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#constructor)

### Properties

- [\_constructorParams](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#_constructorparams)
- [\_fnName](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#_fnname)
- [\_module](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#_module)
- [\_subjectName](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#_subjectname)

### Methods

- [\_isGetter](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#_isgetter)
- [exec](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#exec)
- [fn](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md#fn)

## Constructors

### constructor

• **new SubjectClassFunctionStrategy**(`params`): [`SubjectClassFunctionStrategy`](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.constructorParams` | `any`[] |
| `params.fnName` | `string` |
| `params.subjectFromContract` | [`SubjectFromContract`](../modules/subject_subject_strategy.md#subjectfromcontract) |

#### Returns

[`SubjectClassFunctionStrategy`](subject_subject_class_function_strategy.SubjectClassFunctionStrategy.md)

#### Defined in

[subject/subject-class-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L10)

## Properties

### \_constructorParams

• `Protected` `Readonly` **\_constructorParams**: `any`[]

#### Defined in

[subject/subject-class-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L7)

___

### \_fnName

• `Protected` `Readonly` **\_fnName**: `string`

#### Defined in

[subject/subject-class-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L8)

___

### \_module

• `Protected` `Readonly` **\_module**: `any`

#### Defined in

[subject/subject-class-function-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L5)

___

### \_subjectName

• `Protected` `Readonly` **\_subjectName**: `string`

#### Defined in

[subject/subject-class-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L6)

## Methods

### \_isGetter

▸ **_isGetter**(): `boolean`

#### Returns

`boolean`

#### Defined in

[subject/subject-class-function-strategy.ts:38](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L38)

___

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

[subject/subject-class-function-strategy.ts:25](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L25)

___

### fn

▸ **fn**(): `any`

#### Returns

`any`

#### Implementation of

[SubjectStrategy](../interfaces/subject_subject_strategy.SubjectStrategy.md).[fn](../interfaces/subject_subject_strategy.SubjectStrategy.md#fn)

#### Defined in

[subject/subject-class-function-strategy.ts:34](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/subject/subject-class-function-strategy.ts#L34)
