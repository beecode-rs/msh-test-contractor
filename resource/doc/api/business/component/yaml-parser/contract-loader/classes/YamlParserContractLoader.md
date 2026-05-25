[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/contract-loader](../README.md) / YamlParserContractLoader

# Class: YamlParserContractLoader

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L8)

## Constructors

### Constructor

> **new YamlParserContractLoader**(): `YamlParserContractLoader`

#### Returns

`YamlParserContractLoader`

## Properties

### \_yamlParserContract

> `protected` `readonly` **\_yamlParserContract**: [`YamlParserContract`](../../contract-parser/classes/YamlParserContract.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L9)

## Methods

### \_attachMockFunctionMocks()

> `protected` **\_attachMockFunctionMocks**(`params`): `void`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:127](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L127)

#### Parameters

##### params

###### contract

[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)

###### definition

[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)

#### Returns

`void`

***

### \_attachPerFunctionMocks()

> `protected` **\_attachPerFunctionMocks**(`params`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:75](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L75)

#### Parameters

##### params

###### contract

[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)

###### definition

[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)

###### loadedPaths

`Set`\<`string`\>

###### modulePath

`string`

#### Returns

`Promise`\<`void`\>

***

### \_errorToResult()

> `protected` **\_errorToResult**(`params`): `Error`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:390](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L390)

#### Parameters

##### params

###### error

`unknown`

#### Returns

`Error`

***

### \_getErrorMessage()

> `protected` **\_getErrorMessage**(`params`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:258](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L258)

#### Parameters

##### params

###### error

`unknown`

#### Returns

`string`

***

### \_isImportPlaceholder()

> `protected` **\_isImportPlaceholder**(`value`): `value is { __yaml_import__: { path: string; property: string } }`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:328](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L328)

#### Parameters

##### value

`unknown`

#### Returns

`value is { __yaml_import__: { path: string; property: string } }`

***

### \_isPlainObject()

> `protected` **\_isPlainObject**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:322](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L322)

#### Parameters

##### value

`object`

#### Returns

`boolean`

***

### \_loadImportMocks()

> `protected` **\_loadImportMocks**(`params`): `Promise`\<[`ContractMock`](../../../../../types/type-aliases/ContractMock.md)[]\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:207](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L207)

#### Parameters

##### params

###### importPaths

`string`[]

###### modulePath

`string`

#### Returns

`Promise`\<[`ContractMock`](../../../../../types/type-aliases/ContractMock.md)[]\>

***

### \_loadMockContracts()

> `protected` **\_loadMockContracts**(`params`): `Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)[]\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:159](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L159)

#### Parameters

##### params

###### loadedPaths

`Set`\<`string`\>

###### mockPaths

`string`[]

###### modulePath

`string`

#### Returns

`Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)[]\>

***

### \_resolveImport()

> `protected` **\_resolveImport**(`params`): `Promise`\<`unknown`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:337](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L337)

#### Parameters

##### params

###### basePath

`string`

###### placeholder

\{ `__yaml_import__`: \{ `path`: `string`; `property`: `string`; \}; \}

###### placeholder.__yaml_import__

\{ `path`: `string`; `property`: `string`; \}

###### placeholder.__yaml_import__.path

`string`

###### placeholder.__yaml_import__.property

`string`

#### Returns

`Promise`\<`unknown`\>

***

### \_resolveImportPlaceholders()

> `protected` **\_resolveImportPlaceholders**(`params`): `Promise`\<`void`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:266](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L266)

#### Parameters

##### params

###### basePath

`string`

###### definition

[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)

#### Returns

`Promise`\<`void`\>

***

### \_resolveModule()

> `protected` **\_resolveModule**(`params`): `Promise`\<`unknown`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:238](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L238)

#### Parameters

##### params

###### modulePath?

`string`

###### moduleSpecifier

`string`

#### Returns

`Promise`\<`unknown`\>

***

### \_resolveResult()

> `protected` **\_resolveResult**(`params`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:380](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L380)

#### Parameters

##### params

###### term

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

#### Returns

`unknown`

***

### \_resolveValueDeep()

> `protected` **\_resolveValueDeep**(`params`): `Promise`\<`unknown`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:297](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L297)

#### Parameters

##### params

###### basePath

`string`

###### value

`unknown`

#### Returns

`Promise`\<`unknown`\>

***

### \_transformFns()

> `protected` **\_transformFns**(`params`): `Record`\<`string`, [`ContractFunction`](../../../../../types/type-aliases/ContractFunction.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:355](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L355)

#### Parameters

##### params

###### fns

`Record`\<`string`, \{ `terms`: [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]; \}\>

#### Returns

`Record`\<`string`, [`ContractFunction`](../../../../../types/type-aliases/ContractFunction.md)\>

***

### \_transformTerm()

> `protected` **\_transformTerm**(`params`): [`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:365](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L365)

#### Parameters

##### params

###### term

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

#### Returns

[`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)

***

### \_transformTerms()

> `protected` **\_transformTerms**(`params`): [`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)[]

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:361](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L361)

#### Parameters

##### params

###### terms

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]

#### Returns

[`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)[]

***

### createFromDefinition()

> **createFromDefinition**(`params`): `Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L19)

#### Parameters

##### params

###### definition

[`YamlContractModel`](../../../../model/yaml-contract-model/type-aliases/YamlContractModel.md)

###### loadedPaths?

`Set`\<`string`\>

###### modulePath

`string`

#### Returns

`Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>

***

### load()

> **load**(`params`): `Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/contract-loader.ts#L11)

#### Parameters

##### params

###### path

`string`

#### Returns

`Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>
