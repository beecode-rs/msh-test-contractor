[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/contract-loader](../README.md) / YamlParserContractLoader

# Class: YamlParserContractLoader

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L8)

## Constructors

### Constructor

> **new YamlParserContractLoader**(): `YamlParserContractLoader`

#### Returns

`YamlParserContractLoader`

## Properties

### \_yamlParserContract

> `protected` `readonly` **\_yamlParserContract**: [`YamlParserContract`](../../contract-parser/classes/YamlParserContract.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L9)

## Methods

### \_attachMockFunctionMocks()

> `protected` **\_attachMockFunctionMocks**(`params`): `void`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:127](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L127)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:75](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L75)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:384](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L384)

#### Parameters

##### params

###### error

`unknown`

#### Returns

`Error`

***

### \_getErrorMessage()

> `protected` **\_getErrorMessage**(`params`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:249](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L249)

#### Parameters

##### params

###### error

`unknown`

#### Returns

`string`

***

### \_isImportPlaceholder()

> `protected` **\_isImportPlaceholder**(`value`): `value is { __yaml_import__: { path: string; property: string } }`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:319](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L319)

#### Parameters

##### value

`unknown`

#### Returns

`value is { __yaml_import__: { path: string; property: string } }`

***

### \_isPlainObject()

> `protected` **\_isPlainObject**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:313](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L313)

#### Parameters

##### value

`object`

#### Returns

`boolean`

***

### \_loadImportMocks()

> `protected` **\_loadImportMocks**(`params`): `Promise`\<[`ContractMock`](../../../../../types/type-aliases/ContractMock.md)[]\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:207](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L207)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:159](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L159)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:328](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L328)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:257](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L257)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:230](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L230)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:374](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L374)

#### Parameters

##### params

###### term

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

#### Returns

`unknown`

***

### \_resolveValueDeep()

> `protected` **\_resolveValueDeep**(`params`): `Promise`\<`unknown`\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:288](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L288)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:346](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L346)

#### Parameters

##### params

###### fns

`Record`\<`string`, \{ `terms`: [`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]; \}\>

#### Returns

`Record`\<`string`, [`ContractFunction`](../../../../../types/type-aliases/ContractFunction.md)\>

***

### \_transformTerm()

> `protected` **\_transformTerm**(`params`): [`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:356](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L356)

#### Parameters

##### params

###### term

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)

#### Returns

[`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)

***

### \_transformTerms()

> `protected` **\_transformTerms**(`params`): [`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)[]

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:352](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L352)

#### Parameters

##### params

###### terms

[`YamlContractTerm`](../../../../model/yaml-contract-model/type-aliases/YamlContractTerm.md)[]

#### Returns

[`ContractTerm`](../../../../../types/type-aliases/ContractTerm.md)[]

***

### createFromDefinition()

> **createFromDefinition**(`params`): `Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L19)

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

Defined in: [packages/test-contractor/src/business/component/yaml-parser/contract-loader.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/contract-loader.ts#L11)

#### Parameters

##### params

###### path

`string`

#### Returns

`Promise`\<[`AnyContract`](../../../../../types/type-aliases/AnyContract.md)\>
