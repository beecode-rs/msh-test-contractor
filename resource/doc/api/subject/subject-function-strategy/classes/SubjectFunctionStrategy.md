[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [subject/subject-function-strategy](../README.md) / SubjectFunctionStrategy

# Class: SubjectFunctionStrategy

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L5)

## Implements

- [`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md)

## Constructors

### Constructor

> **new SubjectFunctionStrategy**(`params`): `SubjectFunctionStrategy`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L11)

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

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L9)

***

### \_module

> `protected` `readonly` **\_module**: `any`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L8)

***

### \_subjectName

> `protected` `readonly` **\_subjectName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L6)

## Methods

### exec()

> **exec**(`term`): `any`

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:22](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L22)

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

Defined in: [packages/test-contractor/src/subject/subject-function-strategy.ts:29](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-function-strategy.ts#L29)

#### Returns

`any`

#### Implementation of

[`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md).[`fn`](../../subject-strategy/interfaces/SubjectStrategy.md#fn)
