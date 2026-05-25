[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [subject/subject-function-strategy](../README.md) / SubjectFunctionStrategy

# Class: SubjectFunctionStrategy

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L5)

## Implements

- [`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md)

## Constructors

### Constructor

> **new SubjectFunctionStrategy**(`params`): `SubjectFunctionStrategy`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L10)

#### Parameters

##### params

###### fnName

`string`

###### subjectFromContract

[`SubjectFromContract`](../../subject-strategy/type-aliases/SubjectFromContract.md)

#### Returns

`SubjectFunctionStrategy`

## Properties

### \_fnName

> `protected` `readonly` **\_fnName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L8)

***

### \_module

> `protected` `readonly` **\_module**: `any`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L7)

***

### \_subjectName

> `protected` `readonly` **\_subjectName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L6)

## Methods

### exec()

> **exec**(`term`): `any`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:21](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L21)

#### Parameters

##### term

[`ContractTerm`](../../../types/type-aliases/ContractTerm.md)

#### Returns

`any`

#### Implementation of

[`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md).[`exec`](../../subject-strategy/interfaces/SubjectStrategy.md#exec)

***

### fn()

> **fn**(): `any`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:28](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/subject/subject-function-strategy.ts#L28)

#### Returns

`any`

#### Implementation of

[`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md).[`fn`](../../subject-strategy/interfaces/SubjectStrategy.md#fn)
