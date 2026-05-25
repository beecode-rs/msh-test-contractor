[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/contract-parser](../README.md) / YamlParserContract

# Class: YamlParserContract

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:36](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L36)

## Constructors

### Constructor

> **new YamlParserContract**(): `YamlParserContract`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:39](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L39)

#### Returns

`YamlParserContract`

## Properties

### \_specialObjectParser

> `protected` `readonly` **\_specialObjectParser**: [`YamlParserSpecialObject`](../../special-object/classes/YamlParserSpecialObject.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:37](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L37)

## Methods

### \_buildContractTermFromParsedShorthand()

> `protected` **\_buildContractTermFromParsedShorthand**(`parsed`): [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:223](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L223)

#### Parameters

##### parsed

###### constructorParams?

`unknown`[]

###### params?

`unknown`[]

###### result?

`unknown`

#### Returns

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

***

### \_buildContractTermFromRaw()

> `protected` **\_buildContractTermFromRaw**(`term`): [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:245](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L245)

#### Parameters

##### term

`RawYamlTerm`

#### Returns

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

***

### \_createFileReadError()

> `protected` **\_createFileReadError**(`params`): `Error`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:96](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L96)

#### Parameters

##### params

###### error

`unknown`

###### path

`string`

#### Returns

`Error`

***

### \_isArrowSyntaxString()

> `protected` **\_isArrowSyntaxString**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:197](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L197)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isShorthandTermFormat()

> `protected` **\_isShorthandTermFormat**(`term`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:181](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L181)

#### Parameters

##### term

`RawYamlTerm`

#### Returns

`boolean`

***

### \_methodsToContractFunctions()

> `protected` **\_methodsToContractFunctions**(`methods`): `Record`\<`string`, [`YamlContractFunction`](../../../../model/yaml-contract-model/type-aliases/YamlContractFunction.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:126](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L126)

#### Parameters

##### methods

`Record`\<`string`, `RawYamlMethod`\> | `undefined`

#### Returns

`Record`\<`string`, [`YamlContractFunction`](../../../../model/yaml-contract-model/type-aliases/YamlContractFunction.md)\>

***

### \_methodToContractFunction()

> `protected` **\_methodToContractFunction**(`method`): [`YamlContractFunction`](../../../../model/yaml-contract-model/type-aliases/YamlContractFunction.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:149](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L149)

#### Parameters

##### method

`RawYamlMethod`

#### Returns

[`YamlContractFunction`](../../../../model/yaml-contract-model/type-aliases/YamlContractFunction.md)

***

### \_parseShorthandTermToContractTerm()

> `protected` **\_parseShorthandTermToContractTerm**(`term`): [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:203](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L203)

#### Parameters

##### term

`RawYamlTerm`

#### Returns

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

***

### \_parseSpecialObjectsRecursively()

> `protected` **\_parseSpecialObjectsRecursively**(`value`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:271](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L271)

#### Parameters

##### value

`unknown`

#### Returns

`unknown`

***

### \_rawTermsToContractTerms()

> `protected` **\_rawTermsToContractTerms**(`terms`): [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:165](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L165)

#### Parameters

##### terms

`RawYamlTerm`[] | `undefined`

#### Returns

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]

***

### \_rawTermToContractTerm()

> `protected` **\_rawTermToContractTerm**(`term`): [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:173](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L173)

#### Parameters

##### term

`RawYamlTerm`

#### Returns

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

***

### \_readFileContent()

> `protected` **\_readFileContent**(`params`): `Promise`\<`string`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:86](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L86)

#### Parameters

##### params

###### path

`string`

#### Returns

`Promise`\<`string`\>

***

### \_resolveFnKey()

> `protected` **\_resolveFnKey**(`key`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:141](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L141)

#### Parameters

##### key

`string`

#### Returns

`string`

***

### \_resolveSubjectType()

> `protected` **\_resolveSubjectType**(`contract`, `rawObject`): `"function"` \| `"class"`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:114](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L114)

#### Parameters

##### contract

`RawYamlContract`

##### rawObject

`object`

#### Returns

`"function"` \| `"class"`

***

### parseFile()

> **parseFile**(`params`): `Promise`\<[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:47](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L47)

#### Parameters

##### params

###### path

`string`

#### Returns

`Promise`\<[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)\>

***

### parseString()

> **parseString**(`params`): [`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-parser.ts:55](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-parser.ts#L55)

#### Parameters

##### params

###### yaml

`string`

#### Returns

[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)
