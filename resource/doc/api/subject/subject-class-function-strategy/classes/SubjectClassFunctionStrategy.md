[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [subject/subject-class-function-strategy](../README.md) / SubjectClassFunctionStrategy

# Class: SubjectClassFunctionStrategy

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L4)

## Implements

- [`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md)

## Constructors

### Constructor

> **new SubjectClassFunctionStrategy**(`params`): `SubjectClassFunctionStrategy`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L11)

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

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L7)

***

### \_fnName

> `protected` `readonly` **\_fnName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L8)

***

### \_module

> `protected` `readonly` **\_module**: `any`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L5)

***

### \_subjectName

> `protected` `readonly` **\_subjectName**: `string`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L6)

## Methods

### \_isGetter()

> `protected` **\_isGetter**(): `boolean`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:41](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L41)

#### Returns

`boolean`

***

### exec()

> **exec**(`term`): `any`

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:27](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L27)

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

Defined in: [packages/test-contractor/src/subject/subject-class-function-strategy.ts:37](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/subject/subject-class-function-strategy.ts#L37)

#### Returns

`any`

#### Implementation of

[`SubjectStrategy`](../../subject-strategy/interfaces/SubjectStrategy.md).[`fn`](../../subject-strategy/interfaces/SubjectStrategy.md#fn)
