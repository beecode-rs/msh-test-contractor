[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [subject/subject-class-function-strategy](../README.md) / SubjectClassFunctionStrategy

# Class: SubjectClassFunctionStrategy

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L4)

## Implements

- [`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md)

## Constructors

### Constructor

> **new SubjectClassFunctionStrategy**(`params`): `SubjectClassFunctionStrategy`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L13)

#### Parameters

##### params

###### constructorParams

`any`[]

###### fnName

`string`

###### subjectFromContract

[`SubjectFromContract`](../../subject-strategy/type-aliases/SubjectFromContract.md)

#### Returns

`SubjectClassFunctionStrategy`

## Properties

### \_constructorParams

> `protected` `readonly` **\_constructorParams**: `any`[]

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L9)

***

### \_fnName

> `protected` `readonly` **\_fnName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L10)

***

### \_module

> `protected` `readonly` **\_module**: `any`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L6)

***

### \_subjectName

> `protected` `readonly` **\_subjectName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L7)

## Methods

### \_isGetter()

> `protected` **\_isGetter**(): `boolean`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:43](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L43)

#### Returns

`boolean`

***

### exec()

> **exec**(`term`): `any`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:29](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L29)

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

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:39](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/subject/subject-class-function-strategy.ts#L39)

#### Returns

`any`

#### Implementation of

[`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md).[`fn`](../../subject-strategy/interfaces/SubjectStrategy.md#fn)
